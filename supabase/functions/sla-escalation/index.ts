// Supabase Edge Function stub for scheduled SLA escalation checks.
declare const Deno: {
  serve: (handler: (request: Request) => Response | Promise<Response>) => void;
};

Deno.serve(async () => {
  return new Response(JSON.stringify({ ok: true, message: "WhatsApp provider placeholder only" }), {
    headers: { "content-type": "application/json" }
  });
});
