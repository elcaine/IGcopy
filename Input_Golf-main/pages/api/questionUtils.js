/*
  Question management
  -Questions kept in a source json file (with correct answer always at index 0 for simplicity).
  -Functions below will variously randomize and/or output those questions as noted in comments/function names.
  -Options to create/assign correct answer keys to output json objects too.
  -TODO:  output to API/interface for program use.
*/

// File Paths
var fpIN = './QsAnswerArrays.json'
var fpOUT = './QsAnswerArraysOUT.json'

// Bring json data in
const fs = require('fs')
theQuestions = JSON.parse(fs.readFileSync(fpIN))

// json key names & number of questions
// Note:  this will be updated further down, but needed here for "Randomize answers"
var keyRay = Object.keys(theQuestions[1])// Currently: id, topic, question, answers

// Randomize answers
shuffleAnswerArray(theQuestions, true)//last argument (bool) determines whether new "correctKey" keys added

// Randomize questions
var randoTheQuestions = true
if(randoTheQuestions){theQuestions = randomate(theQuestions)}

// Update json key names & number of questions
var keyRay = Object.keys(theQuestions[1])// Currently: id, topic, question, answers, correctAnswer, correctAnswerIndex

// Output new json file
var writeQuestionsToFile = true
if(writeQuestionsToFile){
  theQuestions = JSON.stringify(theQuestions, null, 2)
  fs.writeFile(fpOUT, theQuestions, 'utf-8', function(err){if(err) throw err;})
}

// Test randomness of Randomizer algorithm because it did not initially look random enough to me
var testRandomizer = false
if(testRandomizer){randomatorTestor()} 

//*** FUNCTIONS AND STUFF  ***/

// Shuffles the json question bank's answers and creates/assigns correct answer field
function shuffleAnswerArray(jsonQuestions, addCorrectKey){
  numQs = jsonQuestions.length
  if(addCorrectKey){
    var rayLen = jsonQuestions[0][keyRay[3]].length
    for(i = 0; i < numQs; ++i){
      // Correct string answer from answer array (answer at index 0)
      tmpStr = jsonQuestions[i][keyRay[3]][0]
      
      // Answer array shuffled
      newRay = randomate(jsonQuestions[i][keyRay[3]])
      jsonQuestions[i][keyRay[3]] = newRay
      
      // New json key for correct answer (string) created & assigned value
      jsonQuestions[i]['correctAnswer'] = tmpStr
      // New json key for correct answer (index) in answer array created & assigned
      for(j = 0; j < rayLen; ++j){
        if(tmpStr === jsonQuestions[i][keyRay[3]][j]){
          jsonQuestions[i]['correctAnswerIndex'] = j
          j = rayLen + 1
        }
     } 
    }
  } else { // This case will PROBABLY never be used... but, was useful while this part built.
    for(i = 0; i < numQs; ++i){
    newRay = randomate(jsonQuestions[i][keyRay[3]])
    jsonQuestions[i][keyRay[3]] = newRay
    }
  }  
}

function randomate(ray) {
  iC = ray.length
  iR = 0
  tmp = ''
      
  while (iC != 0) {
    mRando = Math.random()
    mRando = mRando * iC
    iR = Math.floor(mRando)
    iC--

    // Swap
    tmp = ray[iC]
    ray[iC] = ray[iR]
    ray[iR] = tmp
  }
  return ray;
}

function randomatorTestor (){
  console.log("RANDOMATOR TESTOR!!!!\n(for 4-element arrays)\n==========================================")
  numRuns = 100
  numRaysPerRun = 50
  console.log('numRuns: ', numRuns, '\tnumRaysPerRun: ', numRaysPerRun)

  a = 'a'
  b = 'b'
  c = 'c'
  d = 'd'
  aAvg = Array(0, 0, 0, 0)
  bAvg = Array(0, 0, 0, 0)
  cAvg = Array(0, 0, 0, 0)
  dAvg = Array(0, 0, 0, 0)
  for(yy = 0; yy < numRuns; ++yy){
      aPlace = Array(0, 0, 0, 0)
      bPlace = Array(0, 0, 0, 0)
      cPlace = Array(0, 0, 0, 0)
      dPlace = Array(0, 0, 0, 0)
      
      for(xx = 0; xx < numRaysPerRun; ++xx){
          ray = Array('a', 'b', 'c', 'd')
          ray = randomate(ray)

          if     (ray[0] === a){ aPlace[0]++}
          else if(ray[1] === a){ aPlace[1]++}
          else if(ray[2] === a){ aPlace[2]++}
          else if(ray[3] === a){ aPlace[3]++}

          if     (ray[0] === b){ bPlace[0]++}
          else if(ray[1] === b){ bPlace[1]++}
          else if(ray[2] === b){ bPlace[2]++}
          else if(ray[3] === b){ bPlace[3]++}

          if     (ray[0] === c){ cPlace[0]++}
          else if(ray[1] === c){ cPlace[1]++}
          else if(ray[2] === c){ cPlace[2]++}
          else if(ray[3] === c){ cPlace[3]++}

          if     (ray[0] === d){ dPlace[0]++}
          else if(ray[1] === d){ dPlace[1]++}
          else if(ray[2] === d){ dPlace[2]++}
          else if(ray[3] === d){ dPlace[3]++}
      }
      
      aAvg[0] += aPlace[0]
      aAvg[1] += aPlace[1]
      aAvg[2] += aPlace[2]
      aAvg[3] += aPlace[3]
      
      bAvg[0] += bPlace[0]
      bAvg[1] += bPlace[1]
      bAvg[2] += bPlace[2]
      bAvg[3] += bPlace[3]
      
      cAvg[0] += cPlace[0]
      cAvg[1] += cPlace[1]
      cAvg[2] += cPlace[2]
      cAvg[3] += cPlace[3]
      
      dAvg[0] += dPlace[0]
      dAvg[1] += dPlace[1]
      dAvg[2] += dPlace[2]
      dAvg[3] += dPlace[3]

      console.log('run number: ', yy)
      console.log('a placement count: [', aPlace[0], ']\t[', aPlace[1], ']\t[', aPlace[2], ']\t[', aPlace[3], ']')
      console.log('b placement count: [', bPlace[0], ']\t[', bPlace[1], ']\t[', bPlace[2], ']\t[', bPlace[3], ']')
      console.log('c placement count: [', cPlace[0], ']\t[', cPlace[1], ']\t[', cPlace[2], ']\t[', cPlace[3], ']')
      console.log('d placement count: [', cPlace[0], ']\t[', cPlace[1], ']\t[', cPlace[2], ']\t[', cPlace[3], ']')
      console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
  }
  console.log('a placement avg: [', aAvg[0]/numRaysPerRun, ']\t[', aAvg[1]/numRaysPerRun, ']\t[', aAvg[2]/numRaysPerRun, ']\t[', aAvg[3]/numRaysPerRun, ']')
  console.log('b placement avg: [', bAvg[0]/numRaysPerRun, ']\t[', bAvg[1]/numRaysPerRun, ']\t[', bAvg[2]/numRaysPerRun, ']\t[', bAvg[3]/numRaysPerRun, ']')
  console.log('c placement avg: [', cAvg[0]/numRaysPerRun, ']\t[', cAvg[1]/numRaysPerRun, ']\t[', cAvg[2]/numRaysPerRun, ']\t[', cAvg[3]/numRaysPerRun, ']')
  console.log('d placement avg: [', dAvg[0]/numRaysPerRun, ']\t[', dAvg[1]/numRaysPerRun, ']\t[', dAvg[2]/numRaysPerRun, ']\t[', dAvg[3]/numRaysPerRun, ']')
}