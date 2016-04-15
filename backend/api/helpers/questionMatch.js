require('./includesPolyfill')();
var library = require('./questionLibrary.json');

function questionsByCategory(category) {
  return library.filter(function(question) {
    return question.categories.includes(category);
  });
}

function findBestMatch(possibilities, classes) {
  var deviations = new Array(possibilities.length);

  possibilities.forEach(function(question, questionIndex) {
    var refVector = createCategoryVector(question.categories);
    deviations[questionIndex] = calculateDeviation(refVector, classes);
  });

  return possibilities[indexOfMin(deviations)];
}

function indexOfMin(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var min = arr[0];
    var minIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            minIndex = i;
            min = arr[i];
        }
    }

    return minIndex;
}

function createCategoryVector(categories) {
  var equalConfidence = 1 / categories.length;

  return categories.map(function(category) {
    return {
      'class_name': category,
      confidence: equalConfidence
    };
  })
}

function calculateDeviation(refVector, testVector) {
  var deviation = 0;
  refVector.forEach(function(refClass) {
    var matchedTestClass = testVector.find(function(testClass) {
      return refClass['class_name'] === testClass['class_name'];
    });

    if (matchedTestClass) {
      deviation += Math.abs((refClass.confidence - matchedTestClass.confidence) / refClass.confidence);
    } else {
      deviation += 1;
    }
  });

  return deviation;
}

function vectorToQuestion(vector) {
  var possibleQuestions = questionsByCategory(vector['top_class']);

  if (possibleQuestions.length === 1) {
    return possibleQuestions[0];
  } else {
    return findBestMatch(possibleQuestions, vector.classes);
  }
}

module.exports = {
  vectorToQuestion: vectorToQuestion
};
