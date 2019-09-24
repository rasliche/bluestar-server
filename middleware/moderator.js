module.exports = (req, res, next) => {
  const { isAdmin } = req.token;
  if (!isAdmin) return res.status(403).send('User is not authorized.');
  next();
};
