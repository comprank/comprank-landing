import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// 'unsafe-inline' sur script-src : Next inline sa charge RSC (self.__next_f.push)
// et le pixel Meta est un script inline. Passer par des nonces rendrait toutes
// les pages dynamiques et ferait perdre le prérendu statique.
const csp: Record<string, string[]> = {
  "default-src": ["'self'"],
  "script-src": ["'self'", "'unsafe-inline'", "https://connect.facebook.net"],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": ["'self'", "data:", "blob:", "https://www.facebook.com"],
  "font-src": ["'self'"],
  "connect-src": [
    "'self'",
    "https://www.facebook.com",
    "https://connect.facebook.net",
  ],
  "frame-src": ["'self'"],
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  "frame-ancestors": ["'none'"],
  "upgrade-insecure-requests": [],
};

// React Refresh évalue du code en développement, servi en http.
if (isDev) {
  csp["script-src"].push("'unsafe-eval'");
  delete csp["upgrade-insecure-requests"];
}

// Barre d'outils Vercel, injectée sur les déploiements de preview.
if (process.env.VERCEL_ENV === "preview") {
  csp["script-src"].push("https://vercel.live");
  csp["style-src"].push("https://vercel.live");
  csp["img-src"].push("https://vercel.live", "https://vercel.com");
  csp["font-src"].push("https://vercel.live", "https://assets.vercel.com");
  csp["connect-src"].push("https://vercel.live", "wss://ws-us3.pusher.com");
  csp["frame-src"].push("https://vercel.live");
}

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: Object.entries(csp)
      .map(([directive, sources]) => [directive, ...sources].join(" "))
      .join("; "),
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
