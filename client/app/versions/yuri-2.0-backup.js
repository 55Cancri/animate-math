// remove punctuation
// .replace(/[~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, '')

// ----- TODO ------
// yuri help
// yuri ?
// YURI !!
// yuri list commands
// hold a conversation with someone
// detect questions that contain "yuri" and end with "?"
// define words by accessing dictionary.com api
// command: yuri, collision alert! change course immediately!
// how true is this yuri
// broadcast every (second|30 seconds)||(minute|5 minutes|10 minutes)
// todo list (add todo, i finished ... includes(cleaning my room))
// process one at a time (add other functions to que which are called)
// greet x
// greet the lobby
// tell x goodbye
// tell lobby goodbye
// apologize to x
// respond to thanks
// ask x a question
// ask x another a question
// ask x <question>
// record questions by x
// count to a number
// (tell|say|inform) x to <statement>
// demote users
// help commands
// get x with most comments (who has spoken the most)
// Yuri, run diagnostics on x.
// become banker (loan to x, how money does x have)
// sir you've been on here for 3 hours. Consider (going outside|taking a break)
// yuri tell me a secret

// ------ COMMANDS -------
// pos mode
// yuri run sentiment analysis
// calculate advanced equations
// how many comments does x have
// what was x first comment
// what was x last comment
// when did x join
// word frequency
// on this day
// autopilot mode while away
// how many users
// promote users
// everytime x speaks, say <statement>
// yuri read me a poem
// yuri where the iss?
// yuri who is on the iss?
// yuri give me some advice
// yuri give me some advice about t

// ------ BUGS --------
// finding a users name with punctuation in it
// mentioned user tries to find without s, if none, tries to find it with s
// when joining after 12pm, it says they joined at 0:26
// if failure, writeToChat still
// commands with blank spaces (who did you want me to _?, to... what?)

// ------ FIXED BUGS --------
// yuri most common word calls itself again
// yuri, time
// when did join (minutes ago)

// ----- SCRIPTS -------

// superscript.js
// $.getScript(
//   'https://cdn.jsdelivr.net/npm/superscript@1.1.4/lib/bot/index.min.js'
// )
// compromise.js
$.getScript('https://unpkg.com/compromise@latest/builds/compromise.min.js')

// brain.js
$.getScript('https://cdnjs.cloudflare.com/ajax/libs/brain/0.6.3/brain.min.js')

// moment.js
$.getScript(
  'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/locale/ar-dz.js'
)

// $.getJSON(
//   `https://cors-escape.herokuapp.com/...`,
//   data => {
//     console.log(data)
//   })
// $.getJSON(
//   `https://cors-escape.herokuapp.com/https://api.aylien.com/api/v1/sentiment`,
//   data => {
//     console.log(data)
//   }
// )
// $.getJSON(
//   `https://cors-escape.herokuapp.com/http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvsection=0&titles=pizza`,
//   data => {
//     console.log(data)
//   })

// $.ajaxSetup({
//   headers: {
//     'X-Mashape-Key': '71nR1ROTpnmshPcil7to1Csf8LStp1s9uN2jsnOWw2kIZcyizv',
//     Accept: 'application/json'
//   }
// })

// const setHeader = xhr => {
//   xhr.setRequestHeader(
//     'Ocp-Apim-Subscription-Key',
//     'e4ae6f4e9ccb216e81221702181ca5c4'
//   )
// }

// ****************** LOW-LEVEL FUNCTIONS ******************

text = {
  contains: (comment, ...strings) =>
    strings.every(string => comment.has(`${string}`)),
  lacks: (comment, ...strings) =>
    strings.every(string => !comment.has(`${string}`)),
  wordsOf: comment => comment.split(' ')
}

// for todays date
Date.prototype.dateNow = function() {
  return (
    (this.getMonth() + 1 < 10 ? '0' : '') +
    (this.getMonth() + 1) +
    '/' +
    (this.getDate() < 10 ? '0' : '') +
    this.getDate() +
    '/' +
    this.getFullYear()
  )
}

// for the time now
Date.prototype.timeNow = function() {
  return (
    (this.getHours() < 12 ? this.getHours() : this.getHours() - 12) +
    ':' +
    (this.getMinutes() < 10 ? '0' : '') +
    this.getMinutes() +
    ':' +
    (this.getHours() < 12 ? 'am' : 'pm')
  )
}

const createUniqueArray = (array, propertyName) =>
  array.filter(
    (e, i) => array.findIndex(a => a[propertyName] === e[propertyName]) === i
  )

const piecesOfName = name => name.split(' ')

const textSplitter = (text, len) => {
  // array that will contain split text
  let strings = []
  // while the text is still larger than the limit (200)
  while (text.length > len) {
    // get the index of the last space within the limit (200)
    let indexOfLastSpace = text.substring(0, len).lastIndexOf(' ')
    // if the index of the last space is 0, set it to the limit (200)
    indexOfLastSpace = indexOfLastSpace <= 0 ? len : indexOfLastSpace
    // then add it to the array of parsed strings
    strings = [...strings, text.substring(0, indexOfLastSpace)]
    // get the space immediately after the last string and use as the starting point
    const indexOfNextStartingPoint = text.indexOf(' ', indexOfLastSpace) + 1
    // seems to account for edge cases...?
    if (
      indexOfNextStartingPoint < indexOfLastSpace ||
      indexOfNextStartingPoint > indexOfLastSpace + len
    )
      indexOfNextStartingPoint = indexOfLastSpace
    // shorten text body to equal remaining
    text = text.substring(indexOfNextStartingPoint)
  }
  strings = [...strings, text]
  return strings
}

const randomNumber = (min, max) => Math.round(Math.random() * (max - min)) + min

const textTimeout = (text, delay = 3000) =>
  setTimeout(() => {
    document.querySelector('#InputTextArea').value = text
    document.querySelector('#SendButton').click()
  }, delay)

const setSentimentAnalysisHeader = xhr => {
  xhr.setRequestHeader(
    'X-AYLIEN-TextAPI-Application-Key',
    'e4ae6f4e9ccb216e81221702181ca5c4'
  )
  xhr.setRequestHeader('X-AYLIEN-TextAPI-Application-ID', '9efcf12d')
}

// ****************** YURI FUNCTIONS ******************

const writeToChat = (text, delay = 3000, intervalPeriod = 3000) => {
  if (text.length < 200) {
    textTimeout(text, delay)
  } else {
    const parsed = textSplitter(text, 180)

    parsed.map((s, i) =>
      console.log(
        `index of text part: ${i}`,
        `initial delay time: ${i + 2}`,
        `each subsequent delay: ${(i + 3) * 5 * 1000}`,
        `interval period in seconds: ${(i + 3) * 5}`
      )
    )
    parsed.map((sentence, i) => textTimeout(sentence, (i + 3) * intervalPeriod))
  }
}

const sentimentAnalysis = comment =>
  $.ajax({
    url:
      'https://cors-escape.herokuapp.com/https://api.aylien.com/api/v1/sentiment',
    type: 'GET',
    data: {
      text: comment
    },
    dataType: 'json',
    success: data => {
      const { polarity, polarity_confidence, subjectivity } = data
      return {
        polarity,
        polarity_confidence: +polarity_confidence.toFixed(2),
        subjectivity
      }
    },

    error: () => {
      console.log('request failed.')
    },
    beforeSend: setSentimentAnalysisHeader
  })

const getUserDataFromMemory = passedInUser =>
  memory.users.filter(
    user =>
      user.username.toLowerCase().trim() === passedInUser.toLowerCase().trim()
  )[0]

const checkIfUserIsReferenced = comment =>
  comment.match('#Username').found ||
  Object.keys(memory.tags).some(key =>
    comment
      .out('text')
      .toLowerCase()
      .includes(key.toLowerCase())
  )

const revokeResponse = username =>
  writeToChat(`Sorry ${username}. Your access is restricted.`)

const respondToComment = (subjectivity, polarity, score) => {
  const currentUser = memory.commentLogs[memory.commentLogs.length - 1].name
  const originalComment = nlp(
    memory.commentLogs[memory.commentLogs.length - 1].comment,
    memory.tags
  )

  // ------------------ SETUP
  const currentUserInfoInMemory = getUserDataFromMemory(currentUser)
  let currentComment = originalComment.clone()
  let mentionedUser
  mentionedUser =
    currentComment
      .not('yuri')
      .match('#Username')
      .out('text')
      .replace(/\'s$/, '')
      .replace(/[~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, '')
      .trim() ||
    currentComment
      .not('yuri')
      .match('#Username')
      .out('text')
      .replace(/(s)?$/, '')
      .replace(/[~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, '')
      .trim() ||
    currentComment
      .not('yuri')
      .match('#Username')
      .out('text')
      .replace(/\'s$/, '')
      .replace(/[~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, '')
      .trim()

  if (!mentionedUser) {
    Object.keys(memory.tags).some(key => {
      if (
        currentComment
          .out('text')
          .toLowerCase()
          .includes(key.toLowerCase()) ||
        currentComment
          .out('text')
          .toLowerCase()
          .replace(/(')?s$/, '')
          .includes(key.toLowerCase()) ||
        currentComment
          .out('text')
          .toLowerCase()
          .replace(/(')?s$/, '')
          .replace(/[~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, '')
          .includes(
            key
              .toLowerCase()
              .replace(/[~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, '')
          )
      ) {
        console.log('using key assignment.')
        mentionedUser = key
          .toLowerCase()
          .trim()
          .replace(/(')?s$/, '')
          .replace(/[~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, '')
        return true
      }
      return false
    })
  }

  // ------------------- PARAMS ----------------------
  const params_fc = {
    mustHave: ['yuri', 'first comment'],
    cantHave: ['"']
  }

  if (state.sentimentMode) {
    if (currentUser !== memory.self && currentUser !== memory.owner) {
      const text = `${currentUser}'s comment was ${subjectivity} and ${score *
        100}% ${polarity}.`
      writeToChat(text, 500)
    }
  }

  const mentionedUserInfoInMemory = getUserDataFromMemory(mentionedUser)

  // get first comments
  if (
    checkIfUserIsReferenced(currentComment) &&
    currentComment.has('first comment') &&
    !currentComment.has('"') &&
    currentComment.has('yuri')
  ) {
    console.log('yuri before you speak, what is in it:')
    console.log(mentionedUserInfoInMemory)
    if (currentUserInfoInMemory.accessLevel.match(/(1|2)/)) {
      writeToChat(
        `${mentionedUserInfoInMemory.username}'s first comment was "${
          mentionedUserInfoInMemory.firstComment
        }"`
      )
    } else if (currentUserInfoInMemory.accessLevel.match(/(3)/)) {
      revokeResponse(currentUser)
    }
  }

  // get last comments
  if (
    checkIfUserIsReferenced(currentComment) &&
    text.lacks(currentComment, '"') &&
    text.contains(currentComment, 'yuri', 'last comment')
  ) {
    if (currentUserInfoInMemory.accessLevel.match(/(1|2)/)) {
      console.log('mentionedUser', mentionedUser)
      console.log(
        'getUserDataFromMemory(mentionedUser)',
        mentionedUserInfoInMemory
      )
      writeToChat(
        `${mentionedUser}'s last comment was "${
          mentionedUserInfoInMemory.lastComment
        }"`
      )
    } else if (currentUserInfoInMemory.accessLevel.match(/(3)/)) {
      revokeResponse(currentUser)
    }
  }

  // get join time
  if (
    checkIfUserIsReferenced(currentComment) &&
    currentComment.match('(when|what time)').found &&
    currentComment.match('join!ed') &&
    !currentComment.has('"') &&
    currentComment.has('yuri')
  ) {
    if (currentUserInfoInMemory.accessLevel.match(/(1|2)/)) {
      const joinedTime = mentionedUserInfoInMemory.timeJoined
      const joinedTimeArr = joinedTime.split(':')

      const before = new Date().setHours(joinedTimeArr[0], joinedTimeArr[1]) // 1539630794517
      const now = new Date()

      if (now < before) {
        now.setDate(now.getDate() + 1)
      }

      const interval = now - before

      let timespan = interval
      let hh = Math.floor(timespan / 1000 / 60 / 60)
      timespan -= hh * 1000 * 60 * 60
      let mm = Math.floor(timespan / 1000 / 60)
      timespan -= mm * 1000 * 60

      time = `Sir, my earliest records indicate that ${mentionedUser} joined approximately${
        hh > 0 ? ` ${hh} hour${hh > 1 ? `s` : ``} and` : ``
      } ${mm} minutes ago at ${
        joinedTimeArr[0] < 12
          ? `${joinedTimeArr[0]}:${joinedTimeArr[1]}am`
          : `${joinedTimeArr[0] - 12}:${joinedTimeArr[1]}pm`
      }.`

      writeToChat(time)
    } else if (currentUserInfoInMemory.accessLevel.match(/(3)/)) {
      revokeResponse(currentUser)
    }
  }

  // get users total comments
  if (
    checkIfUserIsReferenced(currentComment) &&
    currentComment.has('(total|many) comments') &&
    !currentComment.has('"') &&
    currentComment.has('yuri')
  ) {
    if (currentUserInfoInMemory.accessLevel.match(/(1|2)/)) {
      writeToChat(
        `${mentionedUser} has written ${
          mentionedUserInfoInMemory.numberOfCommentsFromThisUser
        } total comments.`
      )
    } else if (currentUserInfoInMemory.accessLevel.match(/(3)/)) {
      revokeResponse(currentUser)
    }
  }

  // get users access level
  if (
    checkIfUserIsReferenced(currentComment) &&
    (currentComment.match('access level').found ||
      currentComment.match('permission(s)?').found) &&
    !currentComment.has('promote') &&
    currentComment.has('yuri')
  ) {
    if (currentUserInfoInMemory.accessLevel.match(/(1|2)/)) {
      writeToChat(
        `${mentionedUser}'s access level is ${
          mentionedUserInfoInMemory.accessLevel
        }.`
      )
    } else if (currentUserInfoInMemory.accessLevel.match(/(3)/)) {
      revokeResponse(currentUser)
    }
  }

  // get time
  if (
    currentComment.has('time') &&
    !currentComment.has('join') &&
    !currentComment.not('yuri').has('#Username') &&
    currentComment.has('yuri')
  ) {
    if (currentUser === memory.self || currentUser === memory.owner) {
      const time = new Date()
      writeToChat(`Sir, the time is ${time.timeNow()}.`)
    } else {
      if (currentUserInfoInMemory.accessLevel.match(/(1|2)/)) {
        writeToChat(`${currentUser}, the time is ${time.timeNow.toString()}.`)
      } else if (currentUserInfoInMemory.accessLevel.match(/(3)/)) {
        revokeResponse(currentUser)
      }
    }
  }

  // get date
  if (currentComment.has('date') && currentComment.has('yuri')) {
    if (currentUser === memory.self || currentUser === memory.owner) {
      const date = new Date()
      writeToChat(`Sir, the date is ${date.dateNow()}.`)
    } else {
      if (currentUserInfoInMemory.accessLevel.match(/(1|2)/)) {
        writeToChat(`${currentUser}, the date is ${time.dateNow}.`)
      } else if (currentUserInfoInMemory.accessLevel.match(/(3)/)) {
        revokeResponse(currentUser)
      }
    }
  }

  // get total people in lobby
  if (
    !!currentComment
      .out('text')
      .match(/(how many|total( number of)?) (users|people|ppl)/i) &&
    currentComment.has('yuri')
  ) {
    if (currentUserInfoInMemory.accessLevel.match(/(1|2)/)) {
      writeToChat(
        `There are currently ${memory.numberOfUsers} users in this room.`
      )
    } else if (currentUserInfoInMemory.accessLevel.match(/(3)/)) {
      revokeResponse(currentUser)
    }
  }

  // yuri
  if (currentComment.out('text').match(/^yuri(?!(\!|\?))$/)) {
    if (currentUser === memory.self || currentUser === memory.owner) {
      writeToChat(`Sir.`)
    } else {
      writeToChat(`${currentUser}.`)
    }
  }

  // yuri?
  if (currentComment.out('text').match(/^yuri\?$/)) {
    if (currentUser === memory.self || currentUser === memory.owner) {
      writeToChat(`Sir?`)
    } else {
      writeToChat(`${currentUser}?`)
    }
  }

  // yuri!
  if (currentComment.out('text').match(/^yuri\!$/)) {
    if (currentUser === memory.self || currentUser === memory.owner) {
      writeToChat(`Sir! Why are you yelling?`)
    } else {
      writeToChat(`${currentUser}. Why are you yelling?`)
    }
  }

  // YURI
  if (currentComment.out('text').match(/^YURI(?!(\!|\?))$/)) {
    if (currentUser === memory.self || currentUser === memory.owner) {
      writeToChat(`SIR! WHY ARE YOU SCREAMING`)
    } else {
      writeToChat(`${currentUser}! WHY ARE YOU SCREAMING`)
    }
  }

  // everytime user speaks, tell them something
  if (
    currentComment.out('text').match(/(every(\s)?time|(tell|call))/i) &&
    currentComment.match('(speaks|talks)') &&
    checkIfUserIsReferenced(currentComment) &&
    currentComment.has('yuri')
  ) {
    const pronouns = currentComment
      .match(
        '#Verb (#Possessive|#Pronoun) (#Singular #Verb|#Verb|#Pronoun|#Plural|#Conjunction)'
      )
      .out('text')
    const command = currentComment.out('text').split(pronouns)

    if (currentUser === memory.self || currentUser === memory.owner) {
      memory.grillSpecificUser = {
        status: true,
        victim: mentionedUser,
        speech: command[1].replace('my', ` ${currentUser}'s `),
        count: 0
      }
      console.log(memory.grillSpecificUser)

      writeToChat(
        `Will do, Sir. Now monitoring ${mentionedUser}'s speech patterns.`
      )
    } else {
      if (currentUserInfoInMemory.accessLevel.match(/(1|2)/)) {
        memory.grillSpecificUser = {
          status: true,
          victim: mentionedUser,
          speech: command[1].replace('my', ` ${currentUser}'s `),
          count: 0
        }
        writeToChat(`Will do ${currentUser}.`)
      } else if (currentUserInfoInMemory.accessLevel.match(/(3)/)) {
        revokeResponse(currentUser)
      }
    }
  }

  // stop responding to user
  if (
    currentComment.has('stop') &&
    currentComment.has('monitoring') &&
    currentComment.has('yuri')
  ) {
    if (currentUser === memory.self || currentUser === memory.owner) {
      writeToChat(
        `I've stopped monitoring ${
          memory.grillSpecificUser.victim
        }'s speech patterns sir.`
      )
      memory.grillSpecificUser = {
        status: false,
        victim: '',
        speech: '',
        count: 0
      }
    } else {
      if (currentUserInfoInMemory.accessLevel.match(/(1|2)/)) {
        writeToChat(
          `I've stopped monitoring ${
            memory.grillSpecificUser.victim
          }'s speech patterns ${currentUser}.`
        )
        memory.grillSpecificUser = {
          status: false,
          victim: '',
          speech: '',
          count: 0
        }
      } else if (currentUserInfoInMemory.accessLevel.match(/(3)/)) {
        revokeResponse(currentUser)
      }
    }
  }

  // run math calculation
  if (currentComment.has('calculate') && currentComment.has('yuri')) {
    if (currentUserInfoInMemory.accessLevel.match(/(1|2)/)) {
      const math = currentComment
        .out('text')
        .split('calculate')[1]
        .replace(/\^/g, '**')
        .trim()
      // const math = currentComment
      //   .after('calculate')
      //   .out('text')
      //   .replace(/\^/g, '**').trim()
      console.log('math', math)
      writeToChat(`The results are ${yuri.calculate(math)}.`)
    } else if (currentUserInfoInMemory.accessLevel.match(/(3)/)) {
      revokeResponse(currentUser)
    }
  }

  // on this day
  if (currentComment.has('on this day') && currentComment.has('yuri')) {
    if (currentUserInfoInMemory.accessLevel.match(/(1|2)/)) {
      const pos = currentComment
        .match('#Verb #Preposition #Determiner #Date')
        .out('text')
        .trim()
        .split(' ')[0]

      let type = ''
      if (pos === 'happened') type = 'Events'
      if (pos === 'born') type = 'Births'
      if (pos === 'died') type = 'Deaths'

      if (type.length > 0) {
        try {
          $.getJSON(
            `http://anyorigin.com/go?url=http%3A//history.muffinlabs.com/date&callback=?`,
            data => {
              const section = data.contents.data[type]
              const max = data.contents.data[type].length
              const rand = randomNumber(0, max)
              const info = section[rand]
              const now = new Date()
              let today = now
                .dateNow()
                .split('/')
                .splice(0, 2)
                .join('/')

              if (type === 'Events') {
                const year = `/${info.year}`
                const event = info.text.replace(/\([a-z]\. \d{0,4}\)/g, '')

                console.log(`Should log: On ${today}${year}, ${event}`)

                writeToChat(`On ${today}${year}, ${event}`)
              } else if (type === 'Births' || type === 'Deaths') {
                const year = `/${info.year}`
                const dossier = info.text.split(',')
                const name = dossier[0]
                const occupation = dossier[1].replace(
                  /\([a-z]\. \d{0,4}\)/g,
                  ''
                )

                console.log('occ with', dossier[1])
                console.log(
                  'occ without',
                  dossier[1].replace(/\([a-z]\. \d{0,4}\)/g, '')
                )

                let action = ''
                if (type === 'Births') action = `was born`
                if (type === 'Deaths') action = `died`
                console.log
                console.log(
                  `Should log: On ${today}, ${name}, ${occupation.trim()}, ${action}.`
                )

                writeToChat(
                  `On ${today}${year}, ${name}, the ${occupation.trim()}, ${action}.`
                )
              }
            }
          )
        } catch (e) {
          writeToChat(
            `Forgive me, but at this moment I am able to give you historical information about today.`
          )
        }
      }
    } else if (currentUserInfoInMemory.accessLevel.match(/(3)/)) {
      revokeResponse(currentUser)
    }
  }

  // read a poem
  if (
    text.contains(currentComment, 'poem', 'yuri') &&
    text.wordsOf(currentComment.out('text')).length < 7
  ) {
    if (currentUserInfoInMemory.accessLevel.match(/(1|2)/)) {
      $.getJSON(
        `https://cors-escape.herokuapp.com/https://www.poemist.com/api/v1/randompoems`,
        data => {
          let poem = {
            title: 'No poem.'
          }
          console.log(data)

          data.some(poemArr => {
            if (poemArr.content !== null && poemArr.content.length < 1000) {
              console.log('found a poem.')
              poem = poemArr
              return true
            }
            return false
          })

          console.log(
            `Should log: As you wish sir. I will read the poem: ${
              poem.title
            } by ${poem.poet.name}.`
          )
          writeToChat(
            `As you wish sir. I will read the poem ${poem.title} by ${
              poem.poet.name
            }.`
          )
          writeToChat(`${poem.content}`, 1000, 6000)
        }
      )
    } else if (currentUserInfoInMemory.accessLevel.match(/(3)/)) {
      revokeResponse(currentUser)
    }
  }

  // get position of ISS
  if (
    currentComment.has('iss') &&
    !currentComment.has('who') &&
    !currentComment.has('many') &&
    currentComment.has('yuri')
  ) {
    if (currentUserInfoInMemory.accessLevel.match(/(1|2)/)) {
      $.getJSON(`http://api.open-notify.org/iss-now.json?callback=?`, data => {
        const lat = data['iss_position']['latitude']
        const lon = data['iss_position']['longitude']
        writeToChat(
          `Sir the location of the ISS is lat: ${lat} lon: ${lon}.`,
          3000,
          7000
        )
      })
    } else if (currentUserInfoInMemory.accessLevel.match(/(3)/)) {
      revokeResponse(currentUser)
    }
  }

  // who is on the ISS
  if (
    currentComment.has('on') &&
    currentComment.has('iss') &&
    currentComment.has('yuri')
  ) {
    if (currentUserInfoInMemory.accessLevel.match(/(1|2)/)) {
      $.getJSON(`http://api.open-notify.org/astros.json?callback=?`, data => {
        const { number, people } = data

        writeToChat(
          `The ${number} people currently on the ISS are ${people.map(
            (person, i) => {
              if (i + 1 < people.length) return ` ${person.name}`
              else return ` and ${person.name}`
            }
          )}.`,
          3000,
          7000
        )
      })
    } else if (currentUserInfoInMemory.accessLevel.match(/(3)/)) {
      revokeResponse(currentUser)
    }
  }

  // give advice
  if (
    currentComment.has('advice') &&
    !currentComment.has('about') &&
    currentComment.has('yuri')
  ) {
    if (currentUserInfoInMemory.accessLevel.match(/(1|2)/)) {
      $.getJSON(
        `https://cors-escape.herokuapp.com/http://api.adviceslip.com/advice`,
        data => writeToChat(`${data.slip.advice}`)
      )
    } else if (currentUserInfoInMemory.accessLevel.match(/(3)/)) {
      revokeResponse(currentUser)
    }
  }
  // give advice about x
  if (
    currentComment.has('advice') &&
    currentComment.has('about') &&
    currentComment.has('yuri')
  ) {
    if (currentUserInfoInMemory.accessLevel.match(/(1|2)/)) {
      const sentenceToArray = currentComment.out('text').split(' ')
      const indexOfAbout = sentenceToArray.indexOf('about')
      const query = sentenceToArray[indexOfAbout + 1]

      $.getJSON(
        `https://cors-escape.herokuapp.com/http://api.adviceslip.com/advice/search/${query}`,
        data => {
          const pool = data.slips
          const max = pool.length
          const rand = randomNumber(0, max)
          const advice = pool[rand].advice
          writeToChat(advice)
        }
      )
    } else if (currentUserInfoInMemory.accessLevel.match(/(3)/)) {
      revokeResponse(currentUser)
    }
  }

  // get most common word
  if (
    currentComment.match('/(frequent|common|used)/').found &&
    currentComment.has('word') &&
    currentComment.has('yuri')
  ) {
    const text = memory.commentLogs.map(log => log.comment).join(' ')
    const freq = nlp(text)
      .terms()
      .out('freq')
    const index = currentComment.values().numbers()[0]
      ? currentComment.values().numbers()[0]
      : 0

    if (currentUser === memory.self || currentUser === memory.owner) {
      writeToChat(
        `Sir, the ${currentComment
          .values()
          .toOrdinal()
          .out()} most common word is "${freq[index].normal}", which is used ${
          freq[index].count
        } times and accounts for ${
          freq[index].percent
        }% of all words in this chat session.`
      )
    } else {
      const text = memory.commentLogs.map(log => log.comment).join(' ')
      const freq = nlp(text)
        .terms()
        .out('freq')
      const index = currentComment.values().numbers()[0]
        ? currentComment.values().numbers()[0]
        : 0

      if (currentUserInfoInMemory.accessLevel.match(/1/)) {
        writeToChat(
          `${currentUser}, the ${currentComment
            .values()
            .toOrdinal()
            .out()} most common word is "${
            freq[index].normal
          }", which is used ${freq[index].count} times and accounts for ${
            freq[index].percent
          }% of all words in this chat session.`
        )
      } else if (currentUserInfoInMemory.accessLevel.match(/(2|3)/)) {
        revokeResponse(currentUser)
      }
    }
  }

  // MY COMMANDS
  if (currentUser === memory.self) {
    // pos mode on
    if (currentComment.has('POS mode') && currentComment.has('activate')) {
      state.normalMode = false
      state.POSMode = true
      writeToChat('Activating Language Learning Protocol...')
    }

    // pos mode off
    if (currentComment.match('POS mode') && currentComment.has('deactivate')) {
      state.normalMode = true
      state.POSMode = false
      writeToChat('As you wish, sir. Deactivating Language Learning Protocol.')
    }

    // autopilotMode mode on
    if (
      (currentComment.has('autopilot') ||
        currentComment.out('text').match(/i(')?ll be back/gi)) &&
      currentComment.has('yuri') &&
      state.normalMode
    ) {
      state.normalMode = false
      state.autopilotMode = true
      writeToChat(
        "Understood, sir. I've enabled Autopilot mode. I will inform others while you are away."
      )
    }

    // autopilotMode mode off
    if (
      currentComment.match('back') &&
      !currentComment.has('be') &&
      currentComment.has('yuri') &&
      state.autopilotMode
    ) {
      state.normalMode = true
      state.autopilotMode = false
      if (memory.voicemail.length === 0) {
        writeToChat(
          `Welcome back, sir. Nobody reached out to you while you were away.`
        )
      } else if (memory.voicemail.length === 1) {
        writeToChat(
          `Deactivating Autopilot mode. Sir, ${memory.voicemail.join(
            ' '
          )} reached out to you.`
        )
      } else if (memory.voicemail.length > 1) {
        writeToChat(
          `Deactivating Autopilot mode. Sir, ${memory.voicemail
            .slice(0, -1)
            .join(', ')}, and ${
            memory.voicemail[memory.voicemail.length - 1]
          } reached out to you.`
        )
      }

      memory.voicemail = []
    }

    // turn on sentiment analysis mode
    if (
      text.contains(currentComment, 'yuri', 'sentiment analysis') &&
      text.lacks(currentComment, 'deactivate')
    ) {
      writeToChat(`Now analyzing user sentiment.`, 2000)
      setTimeout(() => (state.sentimentMode = true), 2500)
    }

    // turn off sentiment analysis mode
    if (text.contains(currentComment, 'yuri', 'analysis', 'deactivate')) {
      writeToChat(
        `Deactivating Sentiment Analysis. Sentiments for each user have been recorded sir.`,
        2000
      )
      setTimeout(() => (state.sentimentMode = false), 2500)
    }

    // battery level
    if (
      currentComment.match('/(battery|juice)/').found &&
      currentComment.has('yuri')
    ) {
      writeToChat(`My battery level is at ${state.batteryLevel}% sir.`)
    }

    // backup battery level
    if (!!currentComment.out('text').match(/(back(\s)?up|reserve)/i)) {
      writeToChat(`My reserve capacity is at ${state.reserveBatteryLevel}%.`)
    }

    // promote user
    if (
      checkIfUserIsReferenced(currentComment) &&
      currentComment.match('level (1|2)').found &&
      currentComment.has(`promote`)
    ) {
      const oldMemories = memory.users
      let updatedUser = oldMemories.filter(
        user =>
          user.username.toLowerCase().trim() ===
          mentionedUser.toLowerCase().trim()
      )[0]

      updatedUser.accessLevel = currentComment
        .match('level (1|2)')
        .toTitleCase()
        .out('text')
      memory.users = [...oldMemories, updatedUser]

      writeToChat(
        `${mentionedUser} has been promoted. They now have access to ${
          updatedUser.accessLevel
        } commands.`
      )
    }

    // promote user
    // if (
    //   currentComment.not('yuri').match('#Username').found &&
    //   currentComment.match('Level (1|2)').found &&
    //   currentComment.has(`promote`)
    // ) {
    //   writeToChat(`My reserve capacity is at ${state.reserveBatteryLevel}%.`)
    // }
  }

  // other user commands
  if (currentUser.toLowerCase().trim() !== memory.self.toLowerCase().trim()) {
    // respond to user
    if (
      memory.grillSpecificUser.status &&
      currentUser === memory.grillSpecificUser.victim
    ) {
      const iteration = memory.grillSpecificUser.count + 1

      console.log('responding to user', iteration)

      let beginning = ''
      if (iteration === 4) beginning = `You fucking idiot! `
      if (iteration === 6) beginning = `Don't you ever fucking learn? `
      if (iteration === 8)
        beginning = `Holy shit, is your bitch ass still speaking? `
      if (iteration === 50)
        beginning = `Dude... is your bitch ass still at this? `
      if (iteration === 100) beginning = `This 100 times now. `

      memory.grillSpecificUser.count = memory.grillSpecificUser.count + 1
      writeToChat(
        `${beginning}${currentUser} ${memory.grillSpecificUser.speech}`,
        1000
      )
    }
    // determine if question
    // nlp(currentComment)
    //   .questions(, /   .questions()
    //   .data().length)
    //   .data()

    // if (currentComment.has('#Username'))
    //   writeToChat(
    //     `${currentComment.match('#Username').out('text')} was just mentioned.`
    //   )

    if (state.autopilotMode) {
      console.log('current user:', currentUser)
      console.log(
        'includes my name:',
        currentComment.out('text').includes(memory.self) ||
          piecesOfName(memory.self).some(pieceOfName =>
            currentComment.out('text').includes(pieceOfName)
          )
      )

      // add to voicemail to myself (later change to state.owner when code moved to yuri account)
      if (
        (currentComment.out('text').includes(memory.self) ||
          piecesOfName(memory.self).some(pieceOfName =>
            currentComment.out('text').includes(pieceOfName)
          )) &&
        currentUser !== 'Y.U.R.I.'
      ) {
        console.log('in voicemail')
        console.log('voicemail: ', memory.voicemail)
        memory.voicemail = [...new Set([...memory.voicemail, currentUser])]
        console.log('voicemail: ', memory.voicemail)
        writeToChat(
          `Sorry ${currentUser}. ${
            memory.self
          } is away right now, but will be back shortly. I will let him know you reached out to him.`
        )
      }
    }

    if (state.normalMode) {
      // console.log(
      //   'normal mode',
      //   currentComment.out('tags').map(obj => obj.tags),
      //   currentComment.match('#Username')
      // )
      // if (currentComment.match('#Username')) {
      //   writeToChat(`The user ${currentUser} was just mentioned.`)
      // }
    }

    if (state.POSMode) {
      if (currentComment.nouns().out('array').length > 0)
        writeToChat(
          `nouns: ${JSON.stringify(
            currentComment.nouns().out('array')
          )}, verbs:${JSON.stringify(
            currentComment.verbs().out('array')
          )}, adjectives:${JSON.stringify(
            currentComment.adjectives().out('array')
          )}`
        )
    }
  }
}

const recordComment = async e => {
  const { children: user } = e.target
  const name = `${user[1].textContent.split('(')[0]}`
  const comment = `${user[2].textContent}`
  // const sentiment = await sentimentAnalysis(comment)

  // const { polarity, subjectivity, polarity_confidence } = sentiment
  // const polarity_score = polarity_confidence.toFixed(2)
  // console.log(sentiment)

  memory.commentLogs = [
    ...memory.commentLogs,
    {
      name,
      comment,
      // polarity,
      // subjectivity,
      // polarity_score
    }
  ]
  if (state.sentimentMode) {
    // respondToComment(subjectivity, polarity, polarity_score)
  } else {
    respondToComment()
  }
}

const calculate = equation => eval(equation)

const batteryDrain = () => {
  let { batteryLevel: battery } = state
  // if (operational && battery >= 0) {
  state.batteryLevel = battery -= 1
  let text
  if (battery === 75) {
    text = `Sir, my battery is at 75%.`
    writeToChat(text)
  }

  if (battery === 50) {
    text = `Sir, my battery is at 30%. Consider charging me soon.`
    writeToChat(text)
  }

  if (battery === 20) {
    text = `Sir, my battery is at 20%. I have about 20 minutes before I shutdown.`
    writeToChat(text)
  }

  if (battery === 10) {
    text = `Sir, my battery is at 10%. In 10 minutes I will lose consciousness and become unresponsive.`
    writeToChat(text)
  }

  if (battery === 5) {
    text = `Sir, 5% battery remaining.`
    writeToChat(text)
  }

  if (battery === 1) {
    text = `Shutdown sequence initiated...`
    writeToChat(text)
  }

  if (battery === 0) {
    // operational = false
    text = `${randomNumber(25, 1)}% Erasing memory logs...`
    writeToChat(text)
    text = `${randomNumber(50, 27)}% Clearing cache...`
    writeToChat(text, 6000)
    text = `${randomNumber(75, 52)}% Powering down...`
    writeToChat(text, 9000)
    text = `100% Goodbye sir.`
    writeToChat(text, 12000)
  }
}

statusReport = () => {
  let text
  const newDate = new Date()
  text = `Time: ${newDate.timeNow()}`
  writeToChat(text)

  text = `Date: ${newDate.dateNow()}`
  writeToChat(text, 6000)

  text = `Battery: ${state.batteryLevel}%`
  writeToChat(text, 9000)

  text = `Lobby users: ${memory.numberOfUsers}`
  writeToChat(text, 12000)
}

const updateUserCount = () => {
  const users = [
    ...document.querySelectorAll(
      '.UsersListLayer .UsersListUserWrapper .UsersListUsername'
    )
  ]
  memory.numberOfUsers = users.length
}

updateMemoryOfUsers = () => {
  let userList = [
    ...document.querySelectorAll(
      '.UsersListLayer .UsersListUserWrapper .UsersListUsername'
    )
  ]

  // store all users with nlp #Username tag
  const users = [
    ...document.querySelectorAll(
      '.UsersListLayer .UsersListUserWrapper .UsersListUsername'
    )
  ]

  users.map(user => {
    if (!memory.tags[user.textContent])
      memory.tags[user.textContent] = '#Username'
  })

  // includes username, comment, and time divs
  let allLobbyComments = [
    ...document.querySelectorAll('.echat-shared-chat-message-wrapper')
  ]

  userList = userList.map(wrapper => {
    const username = wrapper.textContent

    // get all the comments for this user
    const commentsFilteredByThisUser = allLobbyComments.filter(
      container =>
        container.querySelector(
          '.echat-shared-chat-message-top-wrapper .echat-shared-chat-message-username'
        ).textContent === username
    )

    // then find out some information
    let lastComment = '',
      firstComment = '',
      timeJoined = ''

    // if the user has comments
    if (commentsFilteredByThisUser.length > 0) {
      // FIRST COMMENT
      // and if first comment is empty, then set it
      if (
        memory.users.filter(
          user => user.username === username && user.firstComment === ''
        ).length > 0
      ) {
        firstComment = commentsFilteredByThisUser[0].querySelector(
          '.echat-shared-chat-message-wrapper .echat-shared-chat-message-body'
        ).textContent
      }
      // otherwise keep it the same.
      if (
        memory.users.filter(
          user => user.username === username && user.firstComment !== ''
        ).length > 0
      ) {
        firstComment = memory.users.filter(
          user => user.username === username
        )[0].firstComment
      }

      // LAST COMMENT
      // the last comment always changes
      lastComment = commentsFilteredByThisUser[
        commentsFilteredByThisUser.length - 1
      ].querySelector(
        '.echat-shared-chat-message-wrapper .echat-shared-chat-message-body'
      ).textContent

      // TIME JOINED
      // if no joined time has been assigned to the user, then add it
      if (
        memory.users.filter(
          user => user.username === username && user.timeJoined === ''
        ).length > 0
      ) {
        timeJoined = commentsFilteredByThisUser[0]
          .querySelector(
            '.echat-shared-chat-message-wrapper .echat-shared-chat-message-top-wrapper .echat-shared-chat-message-time'
          )
          .textContent.slice(1, -1)
      }

      // else keep the joined time the same
      if (
        memory.users.filter(
          user => user.username === username && user.timeJoined !== ''
        ).length > 0
      ) {
        timeJoined = memory.users.filter(user => user.username === username)[0]
          .timeJoined
      }
    }

    // also get the users total comments
    const numberOfCommentsFromThisUser = commentsFilteredByThisUser.length

    let accessLevel

    if (memory.users.filter(user => user.username === username).length === 0) {
      if (username === memory.self || username === memory.owner) {
        accessLevel = 'Level 1'
      } else {
        accessLevel = 'Level 3'
      }
    } else {
      accessLevel = memory.users.filter(user => user.username === username)[0]
        .accessLevel
    }

    // and finally return all that to the array
    return {
      username,
      timeJoined,
      numberOfCommentsFromThisUser,
      firstComment,
      lastComment,
      accessLevel
    }
  })

  // now store the whole array of user information in yuri's memory
  memory.users = userList
}

// ****************** YURI'S MEMORY ******************

const memory = {
  self: document.querySelector('#HeaderUsername').textContent, // primary account
  owner: '', // second account
  users: [],
  commentLogs: [],
  numberOfUsers: 0,
  voicemail: [],
  tags: {},
  grillSpecificUser: {
    status: false,
    victim: '',
    speech: '',
    count: 0
  }
}

// ****************** YURI'S STATE ******************

const state = {
  listening: false,
  batteryLevel: 100,
  reserveBatteryLevel: 100,
  accessControl: false,
  POSMode: false,
  normalMode: true,
  roastAllMode: false,
  mockUsersMode: false,
  autopilotMode: false,
  sentimentMode: false
}

// ****************** COMMANDS ******************

const accessControl = [
  {
    name: 'level1Commands'
    // state: state('awake' || 'sleep'),
    // stats: statusReport()
  },
  {
    name: 'level2Commands',
    // ask: askQuestion(string),
    calculate: string => calculate(string)
  },
  {
    name: 'level3Commands',
    getNumberOfComments: number => commentTotal(number)
  }
]

const yuri = {
  writeToChat: text => writeToChat(text),
  batteryDrain: () => batteryDrain(),
  updateUserCount: () => updateUserCount(),
  updateMemoryOfUsers: () => updateMemoryOfUsers(),
  setAccessControl: () => setAccessControl(),
  calculate: equation => calculate(equation)
}

// ----- ACCESS CONTROL? -------

const contraints = {
  level1: '',
  level2: '',
  level3: ''
}

// ****************** TIME-BASED FUNCTIONS ******************

const handleByTheSecond = () => {
  yuri.updateMemoryOfUsers()
  yuri.updateUserCount()
}

const handleByTheMinute = () => {
  yuri.batteryDrain()
}

setInterval(() => handleByTheSecond(), 1000)
setInterval(() => handleByTheMinute(), 60 * 1000)

const lobby = document.querySelector('#ChatroomChatBox')
lobby.addEventListener('DOMNodeInserted', recordComment)

// ****************** DEBUG FUNCTIONS ******************

const Yuri = {
  state: state,
  memory: memory
}

const log = string => {
  const arr = string.split(' ')
  const name = arr[0]
  const prop = arr[1]
  console.log(`${name}: ${Yuri[name][prop]}`)
}

const listAll = () =>
  console.log(`
state: ${JSON.stringify(state, null, 2)}
memory: ${JSON.stringify(memory, null, 2)}
`)
