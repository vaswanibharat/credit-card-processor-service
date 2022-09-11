const passport = require('passport');

const middleware = () => async (req, res, next) => {
  if (req.headers.authorization === undefined) {
    res
      .status(401)
      .send({
        success: false,
        description: 'Authentication failed: Api key not available in header',
      })
      .end();
  } else {
    passport.authenticate('headerapikey', (err, user) => {
      if (err) {
        res
          .status(500)
          .send({
            success: false,
            description: 'Service Unavailable',
          })
          .end();
      }
      if (!user) {
        res
          .status(401)
          .send({
            success: false,
            description: 'Authentication failed: Invalid api key',
          })
          .end();
      } else {
        next();
      }
    })(req, res, next);
  }
};
module.exports = middleware;
