(function() {
  var slice = [].slice;

  var Tag = (function() {
    function Tag(client) {
      this.client = client;
    }

    // page or query object, optional
    // perPage, optional
    // callback, required
    Tag.prototype.list = function() {
      var i,
          params = 2 <= arguments.length ? slice.call(arguments, 0, i = arguments.length - 1) : (i = 0, []),
          callback = arguments[i++];

      return this.client.get.apply(this.client, ['/tags', {}].concat(slice.call(params), [function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Tag error: ' + status));
        } else {
          return callback(null, response['tags'], headers, response);
        }
      }]));
    };

    // attributes, required
    // callback, required
    Tag.prototype.create = function(attributes, callback) {
      return this.client.post('/tags', attributes, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 201) {
          return callback(new Error('Tag error: ' + status));
        } else {
          return callback(null, response['tag'], headers, response);
        }
      });
    };

    // name, required
    // callback, required
    Tag.prototype.get = function(name, callback) {
      return this.client.get('/tags/' + name, {}, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Tag error: ' + status));
        } else {
          return callback(null, response['tag'], headers, response);
        }
      });
    };

    // name, required
    // attributes, required
    // callback, required
    Tag.prototype.update = function(name, attributes, callback) {
      return this.client.put('/tags/' + name, attributes, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 200) {
          return callback(new Error('Tag error: ' + status));
        } else {
          return callback(null, response['tag'], headers, response);
        }
      });
    };

    // name, required
    // callback, required
    Tag.prototype.delete = function(name, callback) {
      return this.client.delete('/tags/' + name, {}, function(err, status, response, headers) {
        if (err) {
          return callback(err);
        }
        if (status !== 204) {
          return callback(new Error('Tag error: ' + status));
        } else {
          return callback(null, null, headers, response);
        }
      });
    };

    return Tag;
  })();

  module.exports = Tag;
}).call(this);