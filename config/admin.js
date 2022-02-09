module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '96b11489369f8d7391315f264da27c67'),
  },
});
