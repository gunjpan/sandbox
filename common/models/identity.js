module.exports = function(Identity) {
Identity.afterRemote('find', function(ctx, a, next) {
    console.log('called in Identity');

  });
};
