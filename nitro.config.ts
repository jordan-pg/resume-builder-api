//https://nitro.unjs.io/config
export default defineNitroConfig({
    routeRules: {
        "/api/*": {
          cors: true,
          headers: { "access-control-allow-methods": "POST" },
        },
      },
});
