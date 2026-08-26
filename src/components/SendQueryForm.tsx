"use client";

import { useRef, useState } from "react";
import {
  TurnstileWidget,
  isTurnstileConfigured,
  type TurnstileWidgetHandle,
} from "./turnstile-widget";

export function SendQueryForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    emailOrPhone: "",
    subject: "General Query",
    message: "",
  });
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);

  // When no site key is configured (local dev), don't gate the form on a token.
  const awaitingVerification = isTurnstileConfigured && !turnstileToken;

  const resetChallenge = () => {
    // Turnstile tokens are single-use — always issue a fresh challenge after a submit.
    setTurnstileToken("");
    turnstileRef.current?.reset();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, turnstileToken }),
      });

      const data = await res.json();
      resetChallenge();

      if (res.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", emailOrPhone: "", subject: "General Query", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to send message. Please try again or call us.");
      }
    } catch {
      resetChallenge();
      setStatus("error");
      setErrorMessage("Something went wrong. Please check your network or call us directly.");
    }
  };

  return (
    <div>
      <h2 className="text-display-lg uppercase leading-none">
        Send a <span className="text-orange">Query</span>
      </h2>
      <p className="mt-3 text-sm text-cream/80">
        Have a question, feedback, or catering query? Drop us a line and we&apos;ll get back to you fast.
      </p>

      {status === "success" ? (
        <div className="mt-4 rounded-2xl bg-cream/10 p-5 ring-1 ring-orange text-cream">
          <p className="font-bold text-orange text-base">✓ Message Sent!</p>
          <p className="mt-1 text-sm text-cream/90">
            Thank you for reaching out! We have received your query and will respond shortly.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-3 text-xs font-bold uppercase text-orange underline hover:text-white"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="query-name" className="sr-only">
                Your Name
              </label>
              <input
                id="query-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your Name *"
                className="w-full rounded-2xl bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
              />
            </div>
            <div>
              <label htmlFor="query-contact" className="sr-only">
                Email or Phone
              </label>
              <input
                id="query-contact"
                type="text"
                required
                value={formData.emailOrPhone}
                onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                placeholder="Email or Phone Number *"
                className="w-full rounded-2xl bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
              />
            </div>
          </div>

          <div>
            <label htmlFor="query-message" className="sr-only">
              Your Message
            </label>
            <textarea
              id="query-message"
              required
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="How can we help you? *"
              className="w-full rounded-2xl bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange resize-none"
            />
          </div>

          <TurnstileWidget
            ref={turnstileRef}
            onVerify={(token) => setTurnstileToken(token)}
            onExpire={() => setTurnstileToken("")}
            onError={() => setTurnstileToken("")}
          />

          {awaitingVerification && (
            <p id="query-turnstile-hint" className="text-xs text-cream/70">
              Complete the verification above to send your message.
            </p>
          )}

          {status === "error" && (
            <p className="text-xs text-red-400 font-semibold">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading" || awaitingVerification}
            aria-describedby={awaitingVerification ? "query-turnstile-hint" : undefined}
            className="self-start rounded-full bg-orange px-6 py-2.5 text-sm font-bold uppercase text-white transition hover:bg-orange-600 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
          >
            {status === "loading" ? "Sending..." : "Send Query →"}
          </button>
        </form>
      )}
    </div>
  );
}
