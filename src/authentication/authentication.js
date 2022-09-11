const passport = require('passport');
const { HeaderAPIKeyStrategy } = require('passport-headerapikey');
/* istanbul ignore next */
passport.serializeUser((user, done) => {
  done(null, user);
});
/* istanbul ignore next */
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new HeaderAPIKeyStrategy(
  { header: 'Authorization', prefix: 'Api-key' },
  false,
  ((apikey, done) => {
    if (apikey !== process.env.API_Key) {
      return done();
    }
    return done(null, apikey);
  }),
));
