module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'f1cfd6234877a376627a18237bd3b3ed'),
  },
});
