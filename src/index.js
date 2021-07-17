import $ from 'jquery'
require("jquery-html5-validity")($);

const rootElement = $('#survey');
const submissionID = Math.floor(Math.random(0, 1000)*100)
let questionQueue = []
let questionCount = 0
let officialQuestionCount = 0

const fakeSurveyJSON = {
  id: '1',
  title: 'Fake Survey',
  questions: [
    {
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
      }
    }
  ]
}

generateQuestion(fakeSurveyJSON.questions[officialQuestionCount])

function generateElements(question) {
  let elements = question.elements
  let form = question.rootElement.find('form')

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
            <label class='checkbox'>
              ${choice}
              <input type='checkbox' value='${choice}' name='question_${index}' required this>
            </label>
          `)
          $('[this]').change(function() {
            checkFormValidity(form)
          })
          $('[this]').removeAttr('this')
        })
        break;

      case 'text':
        fieldset.append(`
          <label class='text'>
            <span>${element.title}</span>
            <input type='text' name='question_${index}' required this>
          </label>
        `)
        $('[this]').keyup(function() {
          checkFormValidity(form)
        })
        $('[this]').keyup(function() {
          console.log('!')
        })
        $('[this]').removeAttr('this')
        break;

      case 'radiogroup':
        element.choices.forEach(function(choice) {
          fieldset.append(`
            <label class='radiogroup'>
              ${choice}
              <input type='radio' value='${choice}' name='question_${index}' required this>
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
          <label class='text'>
            <input type='text' name='other_1' required this>
          </label>
          <button type='button'>Add</button>
        `)
        $('[this]').keyup(function() {
          checkFormValidity(form)
        })
        $('[this]').removeAttr('this')
        fieldset.find('button').click(function() {
          let self = $(this)
          fieldset.find('label').last().after(`
            <label class='text'>
              <input type='text' name='other_${index}' required this>
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
            <label class='rating'>
              1
              <input type='radio' value='1' name='${element.title}' required this>
            </label>
            <label class='rating'>
              2
              <input type='radio' value='2' name='${element.title}' required this>
            </label>
            <label class='rating'>
              3
              <input type='radio' value='3' name='${element.title}' required this>
            </label>
            <label class='rating'>
              4
              <input type='radio' value='4' name='${element.title}' required this>
            </label>
            <label class='rating'>
              5
              <input type='radio' value='5' name='${element.title}' required this>
            </label>
          `)
          $('[this]').change(function() {
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
  rootElement.html('')
  rootElement.append(`
    <div id='question-root-${question.id}'>
      <form>
        <h3>${question.title}</h3>   
      </form>
    </div>
  `)
  question.rootElement = $(`#question-root-${question.id}`)

  generateElements(question)
}

function checkFormValidity(form) {
  let target = form.find('fieldset').length
  let validFields = 0;

  form.find('fieldset').each(function() {
    $(this).find('input').each(function() {
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
    officialQuestionCount++
    let response = {
      id: question.id,
      response: formatResponse(form.serializeArray(), question.type),
      submission_id: submissionID
    }
    console.log(response)

    if(question.otherQuestion) {
      if(checkOther(response.response)) {
        questionQueue.push(question.otherQuestion)
      }
    }
  
    if(questionQueue.length > 0) {
      generateQuestion(questionQueue[0])
      questionQueue.shift()
    } else {
      generateQuestion(fakeSurveyJSON.questions[officialQuestionCount])
    }
  }
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
      console.log(response)
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
  console.log(response)
  if(response.includes('Other')) {
    return true
  } else {
    return false
  }
}