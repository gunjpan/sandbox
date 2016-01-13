var loopback = require('loopback');
var boot = require('loopback-boot');
var rest = require('restler');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
    
  var Planet = app.models.Planet;
 
  Planet.nestRemoting('moons');
      rest.postJson('http://localhost:3000/api/planets', {
                planetName: 'Earth'
            }).on('complete', function (data, res) {

                if (res.statusCode === 200) {
                    console.log('All good!')
                }
                else {
                    console.error('');
                    console.error('FAILED TO POST NEW PLANET');
                    console.error('-------------------------');
                    console.error("Because of Planet.nestRemoting('moons') didn't include {hooks:false} as an option?");
                    console.error('');
                }

       }
    );
});
