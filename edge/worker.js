// Cloud Run service garbar-web, project garbar-tech, region europe-southwest1.
const ORIGIN = "https://garbar-web-73xqjacdbq-no.a.run.app";
const CANONICAL_HOST = "garbar.tech";

export default {
  async fetch(request) {
    const incoming = new URL(request.url);
    if (![CANONICAL_HOST, "www.garbar.tech"].includes(incoming.hostname)) {
      return new Response("Not found", { status: 404 });
    }

    if (incoming.protocol !== "https:" || incoming.hostname !== CANONICAL_HOST) {
      incoming.protocol = "https:";
      incoming.hostname = CANONICAL_HOST;
      incoming.port = "";
      return Response.redirect(incoming.toString(), 308);
    }

    if (!["GET", "HEAD"].includes(request.method)) {
      return new Response("Method not allowed", {
        status: 405,
        headers: { Allow: "GET, HEAD" },
      });
    }

    // Set URL components separately so a path beginning // cannot change the origin.
    const upstream = new URL(ORIGIN);
    upstream.pathname = incoming.pathname;
    upstream.search = incoming.search;
    const headers = new Headers(request.headers);
    headers.delete("Authorization");
    headers.set("Host", upstream.host);
    headers.set("X-Forwarded-Host", CANONICAL_HOST);
    headers.set("X-Forwarded-Proto", "https");

    try {
      const response = await fetch(upstream, {
        method: request.method,
        headers,
        redirect: "manual",
      });
      const result = new Response(response.body, response);
      const location = result.headers.get("Location");
      if (location) {
        const target = new URL(location, upstream);
        if (target.origin === upstream.origin) {
          target.protocol = "https:";
          target.hostname = CANONICAL_HOST;
          target.port = "";
          result.headers.set("Location", target.toString());
        }
      }
      result.headers.set("Strict-Transport-Security", "max-age=31536000");
      return result;
    } catch {
      return new Response("The website is temporarily unavailable. Please try again.", {
        status: 502,
        headers: { "Cache-Control": "no-store" },
      });
    }
  },
};
