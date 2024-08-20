export default () => ({
  secret: process.env.JWT_SECRET,
  expired: process.env.JWT_EXPIRED,
});
