// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment

// This enables autocomplete, go to definition, etc.

const schema = {
  "type": { type: "string", required: true },
  "url": { type: "string", required: true },
  "payload": { type: "string", required: false },
  "user_id": { type: "string", required: true },
  "session_id": { type: "string", required: true },
  "created_at": { type: "string", required: true },
} as Record<string, { type: string; required: boolean }>;

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(null, { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch (_) {
    return new Response("Invalid JSON", { status: 400 });
  }

  const payload = {
    type: body.type,
    url: body.url,
    payload: body.payload,
    user_id: body.user_id,
    session_id: body.session_id,
    created_at: body.created_at,
  } as Record<string, string>;

  const apikey = body.apikey;

  if (
    !apikey ||
    apikey !== Deno.env.get("SUPABASE_ANON_KEY")
  ) {
    return new Response("Unauthorized", { status: 401 });
  }

  for (const key in schema) {
    if (schema[key].required && !payload[key]) {
      return new Response(`"${key}" is required`, { status: 400 });
    }

    if (
      schema[key].type !== typeof payload[key] && payload[key] !== undefined
    ) {
      return new Response(`"${key}" must be of type ${schema[key].type}`, {
        status: 400,
      });
    }
  }

  const URL = Deno.env.get("SUPABASE_URL") + "/rest/v1/analytics";

  const res = await fetch(`${URL}?apikey=${apikey}`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return new Response(await res.text(), { status: res.status });
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/analytics' \
    --header 'Authorization: Bearer ' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
