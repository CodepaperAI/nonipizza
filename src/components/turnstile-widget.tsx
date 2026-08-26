"use client";

import Script from "next/script";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

/**
 * Cloudflare Turnstile widget — explicit render, no wrapper package.
 *
 * The API script is injected once per page by next/script (deduped by `id`), and
 * every mounted widget renders itself into its own container once the script is
 * ready. Tokens are single-use, so the parent must call `reset()` after each
 * submit — success or failure.
 */

type TurnstileRenderOptions = {
  sitekey: string;
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
  theme?: "auto" | "light" | "dark";
  action?: string;
};

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: TurnstileRenderOptions) => string | undefined;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

const SCRIPT_ID = "cf-turnstile-script";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

/**
 * False when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is absent (local dev without keys).
 * Forms use this to skip token-gating rather than blocking submission forever.
 */
export const isTurnstileConfigured = TURNSTILE_SITE_KEY.length > 0;

export type TurnstileWidgetHandle = {
  /** Discards the current token and issues a fresh challenge. */
  reset: () => void;
};

type TurnstileWidgetProps = {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  /** Cloudflare widget theme. The footer this sits in is dark. */
  theme?: "auto" | "light" | "dark";
  action?: string;
  className?: string;
};

export const TurnstileWidget = forwardRef<TurnstileWidgetHandle, TurnstileWidgetProps>(
  function TurnstileWidget({ onVerify, onExpire, onError, theme = "dark", action, className }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const [scriptReady, setScriptReady] = useState(false);

    // Callbacks live in a ref so re-renders never force the widget to re-render.
    const handlersRef = useRef({ onVerify, onExpire, onError });
    handlersRef.current = { onVerify, onExpire, onError };

    const markReady = useCallback(() => setScriptReady(true), []);

    useImperativeHandle(
      ref,
      () => ({
        reset: () => {
          if (widgetIdRef.current && window.turnstile) {
            window.turnstile.reset(widgetIdRef.current);
          }
        },
      }),
      []
    );

    useEffect(() => {
      if (!isTurnstileConfigured) return;
      // The script may already be present from an earlier mount — don't wait for onReady.
      if (!scriptReady && !window.turnstile) return;
      if (widgetIdRef.current !== null) return;

      const container = containerRef.current;
      if (!container || !window.turnstile) return;

      const id = window.turnstile.render(container, {
        sitekey: TURNSTILE_SITE_KEY,
        theme,
        action,
        callback: (token) => handlersRef.current.onVerify(token),
        "expired-callback": () => handlersRef.current.onExpire?.(),
        "error-callback": () => handlersRef.current.onError?.(),
      });

      widgetIdRef.current = id ?? null;

      return () => {
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.remove(widgetIdRef.current);
        }
        widgetIdRef.current = null;
      };
    }, [scriptReady, theme, action]);

    if (!isTurnstileConfigured) return null;

    return (
      <>
        <Script id={SCRIPT_ID} src={SCRIPT_SRC} strategy="lazyOnload" onReady={markReady} />
        {/* min-height reserves the standard 65px widget box so nothing shifts on load. */}
        <div
          ref={containerRef}
          className={`min-h-[65px] ${className ?? ""}`}
          aria-label="Spam protection challenge"
        />
      </>
    );
  }
);
