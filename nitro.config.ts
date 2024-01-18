//https://nitro.unjs.io/config
export default defineNitroConfig({
//   preset: "vercel",
  routeRules: {
    "/api/*": {
      cors: true,
      headers: { "access-control-allow-methods": "POST" },
    },
    "/templates/*": { headers: { "cache-control": "s-maxage=0" } },
  },
  serverAssets: [
    {
      baseName: "templates",
      dir: "./templates",
    },
  ]
});
