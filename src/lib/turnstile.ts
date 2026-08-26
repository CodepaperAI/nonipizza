/**
 * Cloudflare Turnstile server-side verification.
 *
 * Tokens are single-use and short-lived: every submission must be verified once,
 * before any validation, email send, or other side effect. See CLAUDE.md §3 for
 * the env vars (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`).
 */

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type SiteVerifyResponse = {
  success?: boolean;
  "error-codes"?: string[];
};

/**
 * Verifies a Turnstile token against Cloudflare's siteverify endpoint.
 *
 * Returns `false` for a missing token, a non-200 response, or `success: false`.
 * Never throws for a failed challenge — only for a missing secret in production,
 * which is a deployment misconfiguration and should be loud.
 */
export async function verifyTurnstile(token: string, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "TURNSTILE_SECRET_KEY is not set. Add it to the environment before serving traffic."
      );
    }
    console.warn(
      "[Turnstile] TURNSTILE_SECRET_KEY is not set — skipping verification in development."
    );
    return true;
  }

  if (!token) {
    return false;
  }

  const params = new URLSearchParams();
  params.set("secret", secret);
  params.set("response", token);
  if (ip) params.set("remoteip", ip);

  try {
    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("[Turnstile] siteverify returned HTTP", res.status);
      return false;
    }

    const data = (await res.json()) as SiteVerifyResponse;

    if (!data.success) {
      // Cloudflare error codes stay server-side — never surfaced to the visitor.
      console.warn("[Turnstile] Verification failed:", data["error-codes"] ?? []);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[Turnstile] siteverify request failed:", error);
    return false;
  }
}

/** Best-effort visitor IP for the optional `remoteip` field. */
export function getClientIp(request: Request): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  return (
    request.headers.get("cf-connecting-ip") ??
    forwarded?.split(",")[0]?.trim() ??
    undefined
  );
}
