'use strict';

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');

module.exports = {
  audioSearch: audioSearch
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function audioSearch(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var audioFile = req.swagger.params.audioSearch || 'stranger';
  var hello = util.format('Hello, %s!', name);

  // this sends back a JSON response which is a single string
  res.json(hello);
}
