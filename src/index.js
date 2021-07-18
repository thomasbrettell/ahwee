import $ from 'jquery'
require("jquery-html5-validity")($);
import surveyfile from '../survey.json'

const appRoot = $('#survey');
const submissionID = Math.floor(Math.random(0, 1000)*100)
let questionQueue = []
let questionCount = 0
let officialQuestionCount = 0
let surveyJSON = surveyfile
let totalQuestions = surveyJSON.questions.length
console.log(totalQuestions)

const fakeSurveyJSON = {
  id: '1',
  title: 'Fake Survey',
  questions: [
    {
      id: 'blibidy',
      title: 'carry over',
      type: 'checkbox',
      elements: [
        {
          title: 'other_1',
          type: 'checkbox',
          choices: [
            '1111',
            '2222',
            '3333',
            '4444',
            'Other'
          ]
        }
      ],
      otherQuestion: {
        id: 'blibidy_other',
        title: 'varry over other',
        type: 'other',
        elements: [
          {
            title: 'other_1',
            type: 'other'
          }
        ],
        conditionalLogic: {
          type: 'otherupdate'
        }
      },
      conditionalLogic: {
        type: 'update',
        conditionalQuestion: {
          id: 'rank-choices',
          title: 'rank choices',
          type: 'multirating',
          elements: []
        }
      }
    },
    {
      id: 'conditional-comment',
      type: 'comment',
      elements: [
        {
          type: 'comment',
          title: 'COMMENT'
        }
      ]
    },
    {
      id: 'tessst',
      title: 'Textbox',
      type: 'text',
      elements: [
        {
          type: 'text'
        }
      ]
    },
    {
      id: 'dsad',
      title: 'How much wood',
      type: 'other',
      elements: [
        {
          title: 'other_1',
          type: 'other',
        }
      ]
    },
    {
      id: 'blaaah',
      title: 'Is this?',
      type: 'radiogroup',
      description: '1 = Disagree, 5 = Agree',
      elements: [
        {
          title: 'other_1',
          type: 'radiogroup',
          choices: [
            '1111',
            '2222',
            '3333',
            '4444',
            'Other'
          ]
        }
      ],
      otherQuestion: {
        id: 'blaaah_other',
        title: 'Is this other?',
        type: 'other',
        elements: [
          {
            title: 'other_1',
            type: 'other'
          }
        ]
      },
      conditionalLogic: {
        condition: '4444',
        conditionalQuestion: {
          id: 'conditional-comment',
          type: 'comment',
          elements: [
            {
              type: 'comment',
              title: 'COMMENT'
            }
          ]
        } 
      }
    }
  ]
}

//enable leaving page warning
// window.onbeforeunload = function() {
//   return true;
// };

//set vh too 100% vh on mobile
function fixVh() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
fixVh()
$(window).resize(function() {
  fixVh()
})

appRoot.append(`
  <div class='slider-container'></div>
  <div class="progress-bar">
    <div class="progress">
      <span class="value"></span>
    </div>
  </div>
`)



generateQuestion(surveyJSON.questions[officialQuestionCount])

function generateElements(question) {
  let elements = question.elements
  let form = question.rootElement.find('form')
  let charLimit = 255

  elements.forEach(function(element, index) {
    question.rootElement.find('form').append(`
      <fieldset name='question_${index}'>
        <legend>${element.title}</legend>
      </fieldset>
    `)
    let fieldset = question.rootElement.find('fieldset').eq(index)

    switch(element.type) {
      case 'checkbox':
        element.choices.forEach(function(choice) {
          fieldset.append(`
            <label class="checkbox">
              ${choice}
              <input type="checkbox" value="${choice}" name="question_${index}" required this>
            </label>
          `)
          $('[this]').change(function(e) {
            checkFormValidity(form)
            console.log(question.none)
            if(e.target.value === question.none) {
              fieldset.find('input').each(function() {
                if($(this).val() != question.none) {
                  $(this).prop('checked', false)
                }
              })
            } else {
              fieldset.find('input').each(function() {
                if($(this).val() === question.none) {
                  $(this).prop('checked', false)
                }
              })
            }
          })
          $('[this]').removeAttr('this')
        })
        break;

      case 'text':
        charLimit = 256
        fieldset.append(`
          <label class="text">
            <span>${element.title}</span>
            <input type="text" name="question_${index}" placeholder="${element.placeholder ? element.placeholder : ''}" required this maxlength="${charLimit}">
          </label>
        `)
        $('[this]').keyup(function() {
          $(this).attr('maxlength', charLimit)
          checkFormValidity(form)
        })
        $('[this]').removeAttr('this')
        break;

      case 'radiogroup':
        element.choices.forEach(function(choice) {
          fieldset.append(`
            <label class="radiogroup">
              ${choice}
              <input type="radio" value="${choice}" name="question_${index}" required this>
            </label>
          `)
          $('[this]').change(function() {
            checkFormValidity(form)
          })
          $('[this]').removeAttr('this')
        })
        break;

      case 'other':
        fieldset.append(`
          <label class="text">
            <input type="text" name="other_1" required this>
          </label>
          <button type="button">Add</button>
        `)
        $('[this]').keyup(function() {
          checkFormValidity(form)
        })
        $('[this]').removeAttr('this')
        fieldset.find('button').click(function() {
          let self = $(this)
          fieldset.find('label').last().after(`
            <label class="text">
              <input type="text" name="other_${index}" required this>
            </label>
          `)
          $('[this]').keyup(function() {
            checkFormValidity(form)
          })
          $('[this]').removeAttr('this')
          if(fieldset.find('input').length === 3) {
            self.remove()
          }
        })
        break;

      case 'rating':
          fieldset.append(`
            <label class="rating">
              1
              <input type="radio" value="1" name="${element.title}" required this>
            </label>
            <label class="rating">
              2
              <input type="radio" value="2" name="${element.title}" required this>
            </label>
            <label class="rating">
              3
              <input type="radio" value="3" name="${element.title}" required this>
            </label>
            <label class="rating">
              4
              <input type="radio" value="4" name="${element.title}" required this>
            </label>
            <label class="rating">
              5
              <input type="radio" value="5" name="${element.title}" required this>
            </label>
          `)
          $('[this]').change(function() {
            checkFormValidity(form)
          })
          $('[this]').removeAttr('this')
        break;

      case 'comment':
        charLimit = 500
        fieldset.append(`
        <label class='text'>
          <span>${element.title}</span>
          <textarea this required  rows="5" placeholder="Write your response in 500 characters" maxlength="${charLimit}"></textarea>
        </label>
        `)
        fieldset.append(`
          <span class="char-indicator">You have <span>${charLimit}</span> characters remaining</span>
        `)
        $('[this]').keyup(function() {
          $(this).attr('maxlength', charLimit)
          fieldset.find('.char-indicator span').text(charLimit - $(this).val().trim().length)
          checkFormValidity(form)
        })
        $('[this]').removeAttr('this')
        break;
    }
  })

  form.append(`
    <button type='submit' disabled this>submit</button>
  `)
  $('[this]').click(function(e) {
    e.preventDefault()
    processQuestion(question, form)
  })
  $('[this]').removeAttr('this')
}

function generateQuestion(question) {
  let slider = appRoot.find('.slider-container')
  slider.append(`
  <div class='question-container'>
    <div id='question-root-${question.id}' class="question">
      <form>
        <h3 class='question-title'>${question.title}</h3>   
      </form>
    </div>
  </div>
  `)
  question.rootElement = $(`#question-root-${question.id}`)

  if(question.textbox) {
    question.rootElement.find('.question-title').after(`
      <div>${question.textbox}<div>
    `)
  }
  
  if(question.description) {
    question.rootElement.find('.question-title').after(`
      <p>${question.description}</p>
    `)
  }

  generateElements(question)
}

function checkFormValidity(form) {
  console.log('checking...')
  let target = form.find('fieldset').length
  let validFields = 0;

  form.find('fieldset').each(function() {
    $(this).find('input, textarea').each(function() {
      if($(this).isValid()) {
        validFields++
        return false
      }
    })
  })

  if(validFields === target) {
    form.find('button[type="submit"]').removeAttr('disabled')
    return true
  } else {
    form.find('button[type="submit"]').attr('disabled', true)
    return false
  }
}

function processQuestion(question, form) {

  if (checkFormValidity(form)) {
    console.log(officialQuestionCount)

    let response = {
      id: question.id,
      response: formatResponse(form.serializeArray(), question.questionType),
      submission_id: submissionID
    }
    console.log(response)

    if(question.otherQuestion) {
      if(checkOther(response.response)) {
        questionQueue.push(question.otherQuestion)
      }
    }

    if(question.conditionalLogic && !response.response.includes(question.none)) {
      if(conditionalLogic(response.response, question.conditionalLogic)) {
        questionQueue.push(question.conditionalLogic.conditionalQuestion)
      }
    }
  
    if(questionQueue.length > 0) {
      generateQuestion(questionQueue[0])
      questionQueue.shift()
    } else {
      officialQuestionCount++
      if(surveyJSON.questions[officialQuestionCount]) {
        generateQuestion(surveyJSON.questions[officialQuestionCount])
      } else {
        endSurvey()
      }
    }
    transitionQuestion()
  }
}

function transitionQuestion() {
  $('.slider-container').toggleClass('animating')
  setTimeout(function() {
    $('.slider-container').toggleClass('animating')
    $('.question-container').eq(0).remove()
    $('.slider-container').css('transform', `translateY(0px)`)
  }, 500)
  $('.slider-container').css('transform', `translateY(-${appRoot.height()}px)`) 
}

function formatResponse(response, type) {
  let responses = []

  switch(type) {
    case 'checkbox': 
      response.forEach(function(input) {
        responses.push(input.value)
      })
      return responses

    case 'radiogroup':
      return response[0].value

    case 'text':
      return response[0].value

    case 'other':
      response.forEach(function(input) {
        responses.push(input.value)
      })
      return responses

    case 'rating':
      return response[0].value

    case 'multirating':
      response.forEach(function(input) {
        responses.push({
          keys: input.name,
          value: input.value
        })
      })
      return responses
  }
}

function checkOther(response) {
  if(response.includes('Other')) {
    return true
  } else {
    return false
  }
}

function endSurvey() {
  rootElement.html('')
  rootElement.append(`
    <div>
      <h3>End of survey</h3>   
    </div>
  `)
}

function conditionalLogic(response, conditionalLogic) {
  switch(conditionalLogic.type) {
    case 'update':
      response.forEach(function(input) {
        if(input === 'Other') {
          return
        }
        conditionalLogic.conditionalQuestion.elements.push(
        {
          title: input,
          type: 'rating',
        }
        )
      })
      return true;

    case 'other-update':
      response.forEach(function(input) {
        questionQueue[0].elements.push(
          {
            title: input,
            type: 'rating',
          }
        )
      })
      break; 
      
    default:
      if(response.includes(conditionalLogic.condition)) {
        return true
      }
  }
}