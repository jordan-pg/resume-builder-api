//https://nitro.unjs.io/config
export default defineNitroConfig({
    preset: 'node-server',
    routeRules: {
        "/api/*": {
          cors: true,
          headers: { "access-control-allow-methods": "POST" },
        },
      },
});
