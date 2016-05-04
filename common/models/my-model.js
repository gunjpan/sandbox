var PassThrough = require('stream').PassThrough;

module.exports = function(MyModel) {

  MyModel.getStream = function(options, cb) {
     if (typeof options === 'function') {
      cb = options;
      options = undefined;
    }
    var changes = new PassThrough({ objectMode: true });
    var writeable = true;
    changes.destroy = function() {
      changes.removeAllListeners('error');
      changes.removeAllListeners('end');
      writeable = false;
      changes = null;
    };

    changes.on('error', function() {
      writeable = false;
    });
    changes.on('end', function() {
      writeable = false;
    });

    process.nextTick(function() {

        cb(null, changes);
    });

    MyModel.observe('loaded', createLoadHandler());

    function createLoadHandler() {
      return function(ctx, next) {
        if (!changes) {
          return next();
        }
        var data = ctx.instance || ctx.data;
        var change = { data: data };
        if(writeable)  changes.write(change);
        next();
      };
    }
  };

  MyModel.remoteMethod('getStream', {
    description: 'Create a get stream.',
      accessType: 'READ',
      http: [
        { verb: 'post', path: '/get-stream' },
        { verb: 'get', path: '/get-stream' },
      ],
      accepts: {
        arg: 'options',
        type: 'object',
      },
      returns: {
        arg: 'changes',
        type: 'ReadableStream',
        json: true,
      },
  });

};
