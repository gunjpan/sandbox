module.exports = function (app) {
  //use express Router
  var router = app.loopback.Router();

  router.route('/ping')
    .get(function (req, res) {
      res.send('GET pongaroo');
    })
     .post(function(req, res) {
      res.send('POST pongaroo');
    })
    .put(function(req, res) {
      res.send('PUT pongaroo');
    });

  app.use(router);
};
