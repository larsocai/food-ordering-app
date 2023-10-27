module.exports = {
  // "strapi-google-auth": {
  //   enabled: true,
  //   config: {
  //     clientID: "YOUR_CLIENT_ID",
  //     clientSecret: "YOUR_CLIENT_SECRET", // Replace with your secret, ideally from env variable
  //     callbackURL: "http://127.0.0.1:1337",
  //     scope: ["email", "profile"],
  //   },
  // },
  graphql: {
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: true,
      depthLimit: 10,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
        introspection: true,
      },
    },
  },
  "users-permissions": {
    jwtSecret: process.env.JWT_SECRET,
  },
};
