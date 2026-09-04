import "server-only";

/**
 * Outbound order-lifecycle webhooks — the integration surface for the
 * later n8n → WhatsApp automation phase.
 *
 * Events fire to: {N8N_WEBHOOK_BASE_URL}/{event}
 *   order-placed              → order confirmation message
 *   cod-confirmation-needed   → WhatsApp COD confirmation (cuts RTO)
 *   order-shipped             → tracking update
 *   order-delivered           → review request
 *
 * When N8N_WEBHOOK_BASE_URL is unset (dev), events are logged instead
 * of sent, so the flow is visible in the server console.
 */
export type WebhookEvent =
  | "order-placed"
  | "cod-confirmation-needed"
  | "order-shipped"
  | "order-delivered";

export async function fireWebhook(
  event: WebhookEvent,
  payload: Record<string, unknown>,
): Promise<void> {
  const base = process.env.N8N_WEBHOOK_BASE_URL;
  if (!base) {
    console.log(`[webhook:dry-run] ${event}`, JSON.stringify(payload));
    return;
  }
  try {
    await fetch(`${base.replace(/\/$/, "")}/${event}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.N8N_WEBHOOK_TOKEN
          ? { authorization: `Bearer ${process.env.N8N_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({ event, fired_at: new Date().toISOString(), ...payload }),
    });
  } catch (err) {
    // Webhook failure must never fail the order — log and continue.
    console.error(`[webhook:error] ${event}`, err);
  }
}
