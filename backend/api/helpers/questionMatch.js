require('./includesPolyfill')();
var library = require('./questionLibrary.json');

var testVector = {
  "classifier_id": "10D41B-nlc-1",
  "url": "https://gateway.watsonplatform.net/natural-language-classifier/api/v1/classifiers/10D41B-nlc-1/classify?text=How%20hot%20wil/10D41B-nlc-1",
  "text": "How hot will it be today?",
  "top_class": "ABN",
  "classes": [
    {
      "class_name": "ABN",
      "confidence": 0.9998201258549781
    },
    {
      "class_name": "coverage",
      "confidence": 0.00017987414502176904
    }
  ]
}

module.exports = {
  questionsByCategory: questionsByCategory,
  vectorToQuestion: vectorToQuestion
};

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
  console.log(deviations);

  return possibilities[indexOfMin(deviations)];
}

var possibilities = [{
  question: 'With a Private Fee-for-Service (PFFS) plan, can I get my health care from any doctor, other health care provider, or hospital?',
  categories: ['PFFS', 'coverage', 'doctor', 'provider', 'hospital']
}, {
  question: 'With a Private Fee-for-Service (PFFS) plan, are prescription drugs covered?',
  categories: ['PFFS', 'coverage', 'drugs']
}, {
  question: 'With a Private Fee-for-Service (PFFS) plan, do I need to choose a primary care doctor?',
  categories: ['PFFS', 'decision', 'doctor']
}, {
  question: 'With a Private Fee-for-Service (PFFS) plan, do I have to get a referral to see a specialist?',
  categories: ['PFFS', 'referral', 'specialist']
}];

var vectorClasses = [{
  class_name: 'PFFS',
  confidence: 0.6
}, {
  class_name: 'coverage',
  confidence: 0.25
}, {
  class_name: 'drugs',
  confidence: 0.15
}];

var best = findBestMatch(possibilities, vectorClasses);

console.log(best);

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
    return findBestMatch(possibleQuestions, vector);
  }
}

// var availableQuestions = vectorToQuestion(testVector);
// console.log(availableQuestions);
