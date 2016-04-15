'use strict';

var util = require('util');
var watson = require('watson-developer-cloud');
var questionMatch = require('./questionMatch');

var username = '236ca868-d05c-4a6a-a7d7-5be9cd953a98';
var password = 'o3IySK8nGypa';
var vector;
var natural_language_classifier = watson.natural_language_classifier({
  url: 'https://gateway.watsonplatform.net/natural-language-classifier/api',
  username: username,
  password: password,
  version: 'v1'
});

function getAnswer(question) {
  natural_language_classifier.classify({
    classifier_id: 'f1704ex55-nlc-4522',
    text: question,
  }, function(err, response) {
      if (err) {
        console.log('error:', err);
      } else {
        console.log(JSON.stringify(response, null, 2));
        var bestMatch = questionMatch.vectorToQuestion(response);
        console.log(bestMatch);
        // return bestMatch;
      }
    }
  );
}

getAnswer('What services are provided by Part B?');
