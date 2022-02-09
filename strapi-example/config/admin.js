module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '78d00c644881bf634301ac594d406518'),
  },
});
