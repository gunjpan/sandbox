module.exports = function(User) {
  User.afterRemote('prototype.__get__identities', function(ctx, a, next) {
    console.log('called in User');
    next();
  });
};
