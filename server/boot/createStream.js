var es = require('event-stream');

module.exports = function(app) {
  var MyModel = app.models.MyModel;
   MyModel.getStream(function(err, changes) {
    changes.pipe(es.stringify()).pipe(process.stdout);
  });
  for (var i=0; i < 1000; i++){
    MyModel.create({ 'name': 'row-'+i });
  }
};
