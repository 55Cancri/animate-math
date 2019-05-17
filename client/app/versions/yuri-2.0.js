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
// get time in <location> (use tags)
// yori ignore x (now ignoring x commands sir. x, these are my last words to you.)


// ------ COMMANDS -------
// pos mode
// yuri run sentiment analysis
// calculate advanced equations: 
    // 2 + 4
    // 17^2 + 132 - (7^-2 - 84) / 16
    // 7x + 18y - 3z + 9x -6y
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
// how much money does x have?
// yuri deposit $x into y account
// yuri deduct $x from y account
// yuri what is the date?
// yuri what is x's access level?
// yuri what is your battery level?
// yuri ill be back


// ------ BUGS --------
// commands with blank spaces (who did you want me to _?, to... what?)
// first comment is black
// when did join (if first comment is blank)

// ------ FIXED BUGS --------
// fix give advice
// yuri most common word calls itself again
// yuri, time
// when did join (minutes ago)

// ----- SCRIPTS -------

// superscript.js
// $.getScript(
//   'https://cdn.jsdelivr.net/npm/superscript@1.1.4/lib/bot/index.min.js'
// )
const start = async () => {
  // compromise.js
  await $.getScript(
    'https://unpkg.com/compromise@latest/builds/compromise.min.js'
  )

  // currency.js
  await $.getScript('https://unpkg.com/currency.js@~1.2.0/dist/currency.min.js')

  // math.js
  await $.getScript(
    'https://cdnjs.cloudflare.com/ajax/libs/mathjs/5.2.0/math.min.js'
  )

  // brain.js
  await $.getScript(
    'https://cdnjs.cloudflare.com/ajax/libs/brain/0.6.3/brain.min.js'
  )

  // rx.js
  await $.getScript('https://unpkg.com/rxjs/bundles/rxjs.umd.min.js')

  // $.getJSON(
  //   `https://cors-escape.herokuapp.com/...`,
  //   data => {
  //     console.log(data)
  //   })
  // $.getJSON(
  //   `https://cors-escape.herokuapp.com/https://www.jasonbase.com/things/ZAJz.json`,
  //   data => {
  //     console.log(data)
  //   })
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

  // should make me unbannable
  // com.echat.shared.redirect.Controller = {}

  // const mockRoasts = [
  // ]

  // const { Observable, Subject, ReplaySubject, from, of, range } = rxjs
  // const { map, filter, switchMap } = rxjs.operators

  // ****************** LOW-LEVEL FUNCTIONS ******************

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
      (this.getHours() <= 12 ? this.getHours() : this.getHours() - 12) +
      ':' +
      (this.getMinutes() < 10 ? '0' : '') +
      this.getMinutes() +
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
    // while the text is still larger than the character limit (200)
    while (text.length > len) {
      // get the index of the last space within the character limit (200)
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

  const money = amount =>
    currency(amount, {
      formatWithSymbol: true
    }).format()

  const randomNumber = (min, max) =>
    Math.round(Math.random() * (max - min)) + min

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

  // const setRecastHeader = xhr => {
  //   xhr.setRequestHeader(
  //     'Authorization',
  //     'Token 9ea072ae806c44beb182da2344993c3d'
  //   )
  // }

  // const recast = comment =>
  //   $.ajax({
  //     url: 'https://cors-escape.herokuapp.com/https://api.recast.ai/v2/request',
  //     type: 'GET',
  //     data: { messages: [{ type: 'text', content: 'Hello!' }] },
  //     dataType: 'json',
  //     success: data => {
  //       console.log('worked!', data)
  //     },
  //     error: () => {
  //       console.log('request failed.')
  //     },
  //     beforeSend: setRecastHeader
  //   })

  // const setRoastHeader = xhr => {
  //   xhr.setRequestHeader(
  //     'secret-key',
  //     '$2a$10$eVNj8x7bMSJ7QA46LctIFekkFoZItaF9aFWinm2kPgTh/3c8Xyueu'
  //   )
  // }

  // const message = 'make this message variable dynamic'

  // // echat spammer
  // function pmUser(userUuid, message) {
  //   console.log('uuid', userUuid, message)
  //   $.cometd.publish('/service/conversation/opened', {
  //     conversationUserUuid: userUuid
  //   })
  //   $.cometd.publish('/service/conversation/message', {
  //     conversationUserUuid: userUuid,
  //     messageBody: message
  //   })
  // }

  // com.echat.shared.popup.user.Controller.openUserPopup = function(
  //   event,
  //   clickedWrapper,
  //   userUuid
  // ) {
  //   pmUser(userUuid, message)
  //   com.echat.shared.conversation.Controller.closeConversation(event, userUuid)
  // }

  // ****************** YURI FUNCTIONS ******************

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

  // Is this function necessary?
  const carefullyExecute = (text, conditional, delay = 3000) => {
    try {
      writeToChat(text, delay)
    } catch (e) {
      console.log(`Error occurred in ${conditional} check. Details: ${e}`)
      const error = `Unable to fulfill request.`
      writeToChat(error)
    }
  }

  const writeToChat = (text, delay = 3000, intervalPeriod = 3000) => {
    if (text.length < 200) {
      textTimeout(text, delay)
    } else {
      const parsed = textSplitter(text, 180)

      parsed.map((s, i) =>
        console.log(
          `index of text part: ${i}`,
          `initial delay time: ${i + 2}`,
          `each subsequent delay: ${(i + 1) * 5 * 1000}`,
          `interval period in seconds: ${(i + 1) * 5}`
        )
      )
      parsed.map((sentence, i) =>
        textTimeout(sentence, (i + 1) * intervalPeriod)
      )
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

  const recast = comment =>
    $.ajax({
      url: 'https://cors-escape.herokuapp.com/https://api.recast.ai/v2/request',
      type: 'POST',
      data: { messages: [{ type: 'text', content: 'Hello!' }] },
      dataType: 'json',
      success: data => {
        console.log('worked!', data)
      },
      error: () => {
        console.log('request failed.')
      },
      beforeSend: setRecastHeader
    })

  // https://api.jsonbin.io/b/
  const roast = async () =>
    await $.getJSON(
      `http://anyorigin.com/go?url=https%3A//www.jasonbase.com/things/ZAJz.json&callback=?`,
      data => data.contents
    )

  const laugh = async () =>
    await $.getJSON(
      `http://anyorigin.com/go?url=https%3A//www.jasonbase.com/things/l4ko.json&callback=?`,
      data => data.contents
    )

  const advice = async () =>
    await $.getJSON(
      `http://anyorigin.com/go?url=https%3A//www.jasonbase.com/things/l4ko.json&callback=?`,
      data => data.contents
    )

  const adviceAbout = async topic =>
    await $.getJSON(
      `http://anyorigin.com/go?url=https%3A//www.jasonbase.com/things/l4ko.json&callback=?`,
      data => data.contents
    )

  const readPoem = async () =>
    await $.getJSON(
      `https://cors-escape.herokuapp.com/https://www.poemist.com/api/v1/randompoems`,
      data => data.contents
    )
  // const readPoem = async () =>
  //   await $.getJSON(
  //     `http://anyorigin.com/go?url=https%3A//www.poemist.com/api/v1/randompoems&callback=?`,
  //     data => data.contents
  //   )
  let poemCheck = async () =>
    await $.getJSON(
      `http://anyorigin.com/go?url=https%3A//www.poemist.com/api/v1/randompoems&callback=?`,
      data => console.log(data)
    )

  let count = () => {
    let counter = 0
    setInterval(() => {
      document.querySelector('#InputTextArea').value = counter
      document.querySelector('#SendButton').click()
      counter += 1
    }, 3000)
  }

  // const roast = async () =>
  //   await $.getJSON(
  //     `https://cors-escape.herokuapp.com/https://www.jasonbase.com/things/ZAJz.json`,
  //     data => data
  //   )

  // const laugh = async () =>
  //   await $.getJSON(
  //     `https://cors-escape.herokuapp.com/https://www.jasonbase.com/things/l4ko.json`,
  //     data => data
  //   )

  const getUserDataFromMemory = passedInUser =>
    memory.users.filter(
      user =>
        passedInUser !== undefined &&
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

  const accessLevelIs = (user, ...levels) =>
    levels.some(level => {
      const flags = 'gi'
      const regex = new RegExp(`${level}`, flags)
      return !!user.accessLevel.match(regex)
    })

  const checkSentenceFor = (comment, params) => {
    // convert from npl to text
    comment = comment.out('text')
    const numberOfWords = comment.split(' ')

    // determine sentence checks
    const keys = Object.keys(params).map(key => key)
    const flags = 'gi'

    if (keys.includes('startsWith')) {
      const regex = new RegExp($`^${params.startsWith}`, flags[1])
      const matched = regex.test(comment)
      if (!matched) return false
    }

    if (keys.includes('endsWith')) {
      const regex = new RegExp(`${params.endsWith}$`, flags[1])
      const matched = regex.test(comment)
      if (!matched) return false
    }

    if (keys.includes('mustHave')) {
      // for every word
      if (
        params.mustHave.every(word => {
          const regex = new RegExp(`${word}`, flags)
          const matched = regex.test(comment)
          // if word is not found in sentence, break from function
          if (matched) return true
        }) === false
      )
        return false
    }

    if (keys.includes('cantHave')) {
      if (
        // if sentence has any of these words, break from function
        params.cantHave.some(word => {
          const regex = new RegExp(`${word}`, flags)
          const matched = regex.test(comment)
          if (matched) return false
        }) === true
      )
        return false
    }

    if (keys.includes('regexMatch')) {
      if (
        params.regexMatch.every(regexp => {
          const regex = new RegExp(`${regexp}`, flags)
          const matched = regex.test(comment)
          // if regex matches comment, return true
          if (matched) return true
        }) === false
      )
        return false
    }
    if (keys.includes('regexMatchCase')) {
      if (
        params.regexMatchCase.every(regexp => {
          const regex = new RegExp(`${regexp}`, flags[0])
          const matched = regex.test(comment)
          // if regex matches comment, return true
          if (matched) return true
        }) === false
      )
        return false
    }

    if (keys.includes('maxLength')) {
      if (numberOfWords >= params.maxLength) return false
    }

    // else return true and enter conditional
    return true
  }

  const revokeResponse = username =>
    writeToChat(`Sorry ${username}. Your access is restricted.`)

  const respondToComment = async (subjectivity, polarity, score) => {
    const currentUser = memory.commentLogs[memory.commentLogs.length - 1].name
    const originalComment = nlp(
      memory.commentLogs[memory.commentLogs.length - 1].comment,
      memory.tags
    )
    const currentUserInfoInMemory = getUserDataFromMemory(currentUser)
    let currentComment = originalComment.clone()
    const comment = currentComment.out('text')
    const parsedComment = comment.replace(/[^A-Za-z0-9\s]/g, '').toLowerCase()

    const allUsers = Object.keys(memory.tags).map(user => ({
      original: user,
      simpleParse: user
        .replace(/[^A-Za-z0-9\s]/g, '')
        .toLowerCase()
        .trim(),
      deepParse: user
        .replace(/[^A-Za-z\s]/g, '')
        .toLowerCase()
        .trim()
    }))

    let mentionedUser
    allUsers.some(name => {
      if (
        name.parsed !== 'yuri' &&
        name.original !== '____' &&
        name.original !== 'ÅÐÅM' &&
        name.simpleParse.length > 1 &&
        name.deepParse.length > 1 &&
        (parsedComment.includes(name.simpleParse) ||
          parsedComment.includes(name.deepParse))
      ) {
        mentionedUser = name.original
        return true
      }
      return false
    })

    const mentionedUserInfoInMemory = getUserDataFromMemory(mentionedUser)

    // --------------- PARAMS ---------------

    // first comment
    const fc_params = {
      cantHave: [`"`],
      mustHave: [`yuri`, `first comment`],
      maxLength: 7
    }

    // last comment
    const lc_params = {
      cantHave: [`"`],
      mustHave: [`yuri`, `last comment`],
      maxLength: 7
    }

    // total comments
    const tc_params = {
      cantHave: [`"`],
      mustHave: [`yuri`],
      regexMatch: [`(total|many) comments`]
    }

    // join time
    const jt_params = {
      cantHave: [`"`],
      mustHave: [`yuri`],
      regexMatch: [`(when|what time)`, `join(?!ed)`]
    }

    // access level
    const al_params = {
      cantHave: [`"`, `promote`],
      mustHave: [`yuri`],
      regexMatch: [`(access level|permission(s)?)`]
    }

    // user's money
    const um_params = {
      cantHave: [`deposit`, `withdraw`],
      mustHave: [`yuri`],
      regexMatch: [`(money|funds|balance)`]
    }

    // deposit money
    const dm_params = {
      mustHave: [`yuri`, `deposit`]
    }

    // deduct money
    const ddm_params = {
      mustHave: [`yuri`, `deduct`]
    }

    // get time
    const gt_params = {
      cantHave: [`"`, `join`, `tell`],
      mustHave: [`yuri`],
      regexMatch: [` time `],
      maxLength: 5
    }

    // get date
    const gd_params = {
      mustHave: [`yuri`, `date`]
    }

    // total people
    const tp_params = {
      mustHave: [`yuri`],
      regexMatch: [`(how many|total( number of)?) (users|people|ppl)`]
    }

    // read poem
    const rp_params = {
      mustHave: [`yuri`, `poem`],
      maxLength: 7
    }

    // activate sentiment analysis (lvl 1 command)
    const asa_params = {
      mustHave: [`yuri`, `sentiment analysis`],
      cantHave: [`deactivate`]
    }

    // deactivate sentiment analysis (lvl 1 command)
    const dsa_params = {
      mustHave: [`yuri`, `analysis`, `deactivate`]
    }

    // roast user
    const ru_params = {
      mustHave: [`yuri`, `roast`]
    }

    const sru_params = {
      mustHave: [`tsu`]
    }

    // roast all users
    const rau_params = {
      mustHave: [`yuri`, `roast`, `all`]
    }

    // make laugh
    const ml_params = {
      mustHave: ['yuri'],
      regexMatch: [`(make me laugh|something funny|a joke)`]
    }

    // yuri
    const y1_params = {
      regexMatchCase: [`^(Y|y)uri$`]
    }

    // yuri?
    const y2_params = {
      regexMatchCase: [`^(Y|y)uri( *)[?]$`]
    }

    // yuri!
    const y3_params = {
      regexMatchCase: [`^(Y|y)uri( *)[!]$`]
    }

    // YURI
    const y4_params = {
      regexMatchCase: [`^YURI$`]
    }

    // activate mock user (lvl 1 command)
    const amu_params = {
      mustHave: ['yuri'],
      regexMatch: [`every( )?time`, `( tell |call)`]
    }

    // deactivate mock user (lvl 1 command)
    const dmu_params = {
      mustHave: [`yuri`, `stop`, `monitoring`]
    }

    // math calculation
    const mc_params = {
      mustHave: [`yuri`, `calculate`]
    }

    // happened on this day
    const hotd_params = {
      mustHave: [`yuri`, `on this day`]
    }

    // position of iss
    const pis_params = {
      cantHave: [`who`, `many`],
      mustHave: [`yuri`, `where`],
      regexMatch: [`iss`]
    }

    // who is on iss
    const wis_params = {
      mustHave: [`yuri`, `on`],
      regexMatch: [`iss`]
    }

    // give advice
    const ga_params = {
      cantHave: [`about`],
      mustHave: [`yuri`, `advice`]
    }

    // give advice about
    const gaa_params = {
      mustHave: [`yuri`, `advice`, `about`]
    }

    // most common word (lvl 1 command)
    const mcw_params = {
      mustHave: [`yuri`, `word`, `what`],
      regexMatch: [`(frequent|common|used)`]
    }

    // activate pos mode
    const apos_params = {
      mustHave: [`pos mode`, `activate`]
    }

    // deactivate pos mode
    const dpos_params = {
      mustHave: [`pos mode`, `deactivate`]
    }

    // activate autopilot mode
    const aam_params = {
      mustHave: [`yuri`],
      regexMatch: [`(i(')?ll be back|autopilot)`]
    }

    // deactivate autopilot mode
    const dam_params = {
      cantHave: [`be`],
      mustHave: [`yuri`],
      regexMatch: [`(i(\')?m back)`]
    }

    // battery level
    const bl_params = {
      cantHave: [`reserve`, `backup`],
      mustHave: [`yuri`],
      regexMatch: [`(battery|juice)`]
    }

    // backup battery level
    const bbl_params = {
      cantHave: [`%`],
      mustHave: [`yuri`],
      regexMatch: [`(back(\s)?up|reserve)`]
    }

    // promote user (lvl 1 command)
    const pu_params = {
      mustHave: [`yuri`, `promote`],
      regexMatch: [`level (1|2)`]
    }

    // demote user (lvl 1 command)
    const du_params = {
      mustHave: [`yuri`, `demote`],
      regexMatch: [`level (2|3)`]
    }

    // promote all users (lvl 0 command)
    const pau_params = {
      mustHave: [`yuri`, `promote`, `all`],
      regexMatch: [`level (1|2)`]
    }

    // demote all users (lvl 0 command)
    const dau_params = {
      mustHave: [`yuri`, `demote`, `all`],
      regexMatch: [`level (2|3)`]
    }

    // --------------- MODES ---------------

    if (state.sentimentMode) {
      if (currentUser !== memory.self && currentUser !== memory.owner) {
        const text = `${currentUser}'s comment was ${subjectivity} and ${score *
          100}% ${polarity}.`
        writeToChat(text, 500)
      }
    }

    // --------------- ACTIONS ---------------

    // get user's first comment
    if (
      checkIfUserIsReferenced(currentComment) &&
      checkSentenceFor(currentComment, fc_params)
    ) {
      if (accessLevelIs(currentUserInfoInMemory, 0, 1, 2)) {
        const { username, firstComment } = mentionedUserInfoInMemory
        const text = `${username}'s first comment was "${firstComment}"`
        const conditional = `first comment`
        carefullyExecute(text, conditional)
      } else if (accessLevelIs(currentUserInfoInMemory, 3)) {
        revokeResponse(currentUser)
      }
    }

    // get users last comment
    if (
      checkIfUserIsReferenced(currentComment) &&
      checkSentenceFor(currentComment, lc_params)
    ) {
      if (accessLevelIs(currentUserInfoInMemory, 0, 1, 2)) {
        const { lastComment } = mentionedUserInfoInMemory
        const text = `${mentionedUser}'s last comment was "${lastComment}"`
        const conditional = `last comment`
        carefullyExecute(text, conditional)
      } else if (accessLevelIs(currentUserInfoInMemory, 3)) {
        revokeResponse(currentUser)
      }
    }

    // get user's total comments
    if (
      checkIfUserIsReferenced(currentComment) &&
      checkSentenceFor(currentComment, tc_params)
    ) {
      if (accessLevelIs(currentUserInfoInMemory, 0, 1, 2)) {
        const conditional = 'total comments'
        try {
          const {
            numberOfCommentsFromThisUser: totalComments
          } = mentionedUserInfoInMemory
          const text = `${mentionedUser} has written ${totalComments} total comments.`
          carefullyExecute(text, conditional)
        } catch (err) {
          const text = `Sir. I could not find that user.`
          carefullyExecute(text, conditional)
        }
      } else if (accessLevelIs(currentUserInfoInMemory, 3)) {
        revokeResponse(currentUser)
      }
    }

    // get user's join time
    if (
      checkIfUserIsReferenced(currentComment) &&
      checkSentenceFor(currentComment, jt_params)
    ) {
      if (accessLevelIs(currentUserInfoInMemory, 0, 1, 2)) {
        const { timeJoined: joinedTime } = mentionedUserInfoInMemory
        const joinedTimeArr = joinedTime.split(':')

        // 1539630794517
        const before = new Date().setHours(joinedTimeArr[0], joinedTimeArr[1])
        const now = new Date()

        if (now < before) now.setDate(now.getDate() + 1)

        const interval = now - before

        let timespan = interval
        const hh = Math.floor(timespan / 1000 / 60 / 60)
        timespan -= hh * 1000 * 60 * 60
        const mm = Math.floor(timespan / 1000 / 60)
        timespan -= mm * 1000 * 60

        console.log('joined time array:', joinedTimeArr)

        const time = `Sir, my earliest records indicate that ${mentionedUser} joined approximately${
          hh > 0 ? ` ${hh} hour${hh > 1 ? `s` : ``} and` : ``
        } ${mm} minutes ago at ${
          joinedTimeArr[0] < 12
            ? `${joinedTimeArr[0]}:${joinedTimeArr[1]}am`
            : `${
                parseInt(joinedTimeArr[0]) === 12
                  ? 12
                  : parseInt(joinedTimeArr[0]) - 12
              }:${joinedTimeArr[1]}pm`
        }.`
        const conditional = `user joined time`
        carefullyExecute(time, conditional)
      } else if (accessLevelIs(currentUserInfoInMemory, 3)) {
        revokeResponse(currentUser)
      }
    }

    // get user's access level
    if (
      checkIfUserIsReferenced(currentComment) &&
      checkSentenceFor(currentComment, al_params)
    ) {
      if (accessLevelIs(currentUserInfoInMemory, 0, 1, 2)) {
        const { accessLevel } = mentionedUserInfoInMemory
        const text = `${mentionedUser}'s access level is ${accessLevel}.`
        const conditional = `access level`
        carefullyExecute(text, conditional)
      } else if (accessLevelIs(currentUserInfoInMemory, 3)) {
        revokeResponse(currentUser)
      }
    }

    // get user's money
    if (
      (checkIfUserIsReferenced(currentComment) ||
        currentComment.out('text').match(/ my /i)) &&
      checkSentenceFor(currentComment, um_params)
    ) {
      if (accessLevelIs(currentUserInfoInMemory, 0, 1, 2)) {
        const { balance } = mentionedUserInfoInMemory
        const text = `${
          mentionedUser ? mentionedUser + `\'s` : `Your`
        } balance is ${currency(balance, { formatWithSymbol: true }).format()}.`
        const conditional = `user balance`
        carefullyExecute(text, conditional)
      } else if (accessLevelIs(currentUserInfoInMemory, 3)) {
        revokeResponse(currentUser)
      }
    }

    // deposit money into user's account
    if (
      checkIfUserIsReferenced(currentComment) &&
      checkSentenceFor(currentComment, dm_params)
    ) {
      if (accessLevelIs(currentUserInfoInMemory, 0, 1, 2)) {
        const { balance: preBalance } = mentionedUserInfoInMemory

        const sentenceToArray = currentComment.out('array')
        const indexOfDeposit = sentenceToArray.indexOf('deposit')
        const amountToAdd = sentenceToArray[indexOfDeposit + 1]

        const oldMemories = memory.users
        let updatedUser = oldMemories.filter(
          user =>
            user.username.toLowerCase().trim() ===
            mentionedUser.toLowerCase().trim()
        )[0]

        updatedUser.balance = currency(preBalance)
          .add(money(amountToAdd))
          .format()

        memory.users = memory.users.map(u => {
          if (u.username === updatedUser.username) {
            u.balance = updatedUser.balance
            return u
          }
          return u
        })

        const text = `${money(
          amountToAdd
        )} has been added to ${mentionedUser}'s account.`
        const conditional = `user balance`
        carefullyExecute(text, conditional)
      } else if (accessLevelIs(currentUserInfoInMemory, 3)) {
        revokeResponse(currentUser)
      }
    }

    // deduct money from user's account
    if (
      checkIfUserIsReferenced(currentComment) &&
      checkSentenceFor(currentComment, ddm_params)
    ) {
      if (accessLevelIs(currentUserInfoInMemory, 0, 1, 2)) {
        const { balance: preBalance } = mentionedUserInfoInMemory

        const sentenceToArray = currentComment.out('array')
        const indexOfDeposit = sentenceToArray.indexOf('deduct')
        const amountToSubtract = sentenceToArray[indexOfDeposit + 1]

        const oldMemories = memory.users
        let updatedUser = oldMemories.filter(
          user =>
            user.username.toLowerCase().trim() ===
            mentionedUser.toLowerCase().trim()
        )[0]

        updatedUser.balance = currency(preBalance)
          .subtract(money(amountToSubtract))
          .format()

        memory.users = memory.users.map(u => {
          if (u.username === updatedUser.username) {
            u.balance = updatedUser.balance
            return u
          }
          return u
        })

        const text = `${money(
          amountToSubtract
        )} has been deducted from ${mentionedUser}'s account.`
        const conditional = `deduct funds`
        carefullyExecute(text, conditional)
      } else if (accessLevelIs(currentUserInfoInMemory, 3)) {
        revokeResponse(currentUser)
      }
    }

    // get time
    if (checkSentenceFor(currentComment, gt_params)) {
      if (currentUser === memory.self || currentUser === memory.owner) {
        console.log(currentComment.out('tags').map(obj => obj.tags))
        const time = new Date()
        const text = `Sir, the time is ${time.timeNow()}.`
        const conditional = `get time`
        carefullyExecute(text, conditional)
      } else {
        if (accessLevelIs(currentUserInfoInMemory, 0, 1, 2)) {
          console.log(currentComment.out('tags').map(obj => obj.tags))
          const time = new Date()
          const text = `${currentUser}, the time is ${time.timeNow()}.`
          const conditional = `get time`
          carefullyExecute(text, conditional)
        } else if (accessLevelIs(currentUserInfoInMemory, 3)) {
          revokeResponse(currentUser)
        }
      }
    }

    // get date
    if (checkSentenceFor(currentComment, gd_params)) {
      if (currentUser === memory.self || currentUser === memory.owner) {
        const date = new Date()
        const text = `Sir, the date is ${date.dateNow()}.`
        const conditional = `get date`
        carefullyExecute(text, conditional)
      } else {
        if (accessLevelIs(currentUserInfoInMemory, 0, 1, 2)) {
          const text = `${currentUser}, the date is ${time.dateNow}.`
          const conditional = `get date`
          carefullyExecute(text, conditional)
        } else if (accessLevelIs(currentUserInfoInMemory, 3)) {
          revokeResponse(currentUser)
        }
      }
    }

    // get total people in lobby
    if (checkSentenceFor(currentComment, tp_params)) {
      if (accessLevelIs(currentUserInfoInMemory, 0, 1, 2)) {
        const text = `There are currently ${
          memory.numberOfUsers
        } users in this room.`
        const conditional = `total people in lobby`
        carefullyExecute(text, conditional)
      } else if (accessLevelIs(currentUserInfoInMemory, 3)) {
        revokeResponse(currentUser)
      }
    }

    // roast user
    if (
      checkIfUserIsReferenced(currentComment) &&
      checkSentenceFor(currentComment, ru_params)
    ) {
      if (accessLevelIs(currentUserInfoInMemory, 0, 1, 2)) {
        const data = await roast()
        const { roasts } = data.contents
        const max = roasts.length
        const rand = randomNumber(0, max)
        const insult = roasts[rand]
        console.log(insult)

        const text = `${mentionedUser}${insult}`
        const conditional = `roast user`
        carefullyExecute(text, conditional)
      } else if (accessLevelIs(currentUserInfoInMemory, 3)) {
        revokeResponse(currentUser)
      }
    }

    // another roast trigger
    if (
      checkSentenceFor(currentComment, sru_params) &&
      currentUser !== 'THE FUCKING MIGHTY ALEXZERO ▲'
    ) {
      const data = await roast()
      const { roasts } = data.contents
      // const { roasts } = data
      const max = roasts.length
      const rand = randomNumber(0, max)
      const insult = roasts[rand]
      console.log(insult)
      const text = `${currentUser}${insult}`
      const conditional = `roast user`
      carefullyExecute(text, conditional, 1000)
    }

    // const observable = Observable.create(observer => {
    //   observer.next('hello')
    //   observer.next('world')
    // })

    // observable.subscribe(val => console.log(val))
    // roast all users
    if (checkSentenceFor(currentComment, rau_params)) {
      while (state.roastAllMode) {
        // memory.users.map(user => {})
      }
    }

    // make person laugh
    if (checkSentenceFor(currentComment, ml_params)) {
      const data = await laugh()
      const { humor } = data.contents
      // const { humor } = data
      const max = humor.length
      const rand = randomNumber(0, max)
      const joke = humor[rand]
      console.log(joke)
      const text = `${joke}`
      const conditional = `make laugh`
      carefullyExecute(text, conditional)
    }

    // yuri
    if (checkSentenceFor(currentComment, y1_params)) {
      if (currentUser === memory.self || currentUser === memory.owner) {
        const text = `Sir.`
        const conditional = `yuri`
        carefullyExecute(text, conditional)
      } else {
        const text = `${currentUser}.`
        const conditional = `yuri`
        carefullyExecute(text, conditional)
      }
    }

    // yuri?
    if (checkSentenceFor(currentComment, y2_params)) {
      if (currentUser === memory.self || currentUser === memory.owner) {
        const text = `Sir?`
        const conditional = `yuri?`
        carefullyExecute(text, conditional)
      } else {
        const text = `${currentUser}?`
        const conditional = `yuri?`
        carefullyExecute(text, conditional)
      }
    }

    // yuri!
    if (checkSentenceFor(currentComment, y3_params)) {
      if (currentUser === memory.self || currentUser === memory.owner) {
        const text = `Sir! Why are you yelling!`
        const conditional = `yuri! Why are you yelling!`
        carefullyExecute(text, conditional)
      } else {
        const text = `${currentUser}! Why are you yelling!`
        const conditional = `yuri! Why are you yelling!`
        carefullyExecute(text, conditional)
      }
    }

    // YURI
    if (checkSentenceFor(currentComment, y4_params)) {
      if (currentUser === memory.self || currentUser === memory.owner) {
        const text = `SIR! WHY ARE YOU SCREAMING.`
        const conditional = `SIR! WHY ARE YOU SCREAMING.`
        carefullyExecute(text, conditional)
      } else {
        const text = `${currentUser}! WHY ARE YOU SCREAMING.`
        const conditional = `${currentUser}! WHY ARE YOU SCREAMING.`
        carefullyExecute(text, conditional)
      }
    }

    // everytime user speaks, tell them something
    if (
      checkIfUserIsReferenced(currentComment) &&
      checkSentenceFor(currentComment, amu_params)
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

        const text = `Will do, Sir. Now monitoring ${mentionedUser}'s speech patterns.`
        const conditional = `mock user`
        carefullyExecute(text, conditional)
      } else {
        if (accessLevelIs(currentUserInfoInMemory, 0, 1, 2)) {
          memory.grillSpecificUser = {
            status: true,
            victim: mentionedUser,
            speech: command[1].replace('my', ` ${currentUser}'s `),
            count: 0
          }
          const text = `Will do ${currentUser}.`
          const conditional = `mock user`
          carefullyExecute(text, conditional)
          if (accessLevelIs(currentUserInfoInMemory, 3)) {
            revokeResponse(currentUser)
          }
        }
      }
    }

    // stop responding to user
    if (checkSentenceFor(currentComment, dmu_params)) {
      const { victim } = memory.grillSpecificUser
      if (currentUser === memory.self || currentUser === memory.owner) {
        const text = `I've stopped monitoring ${victim}'s speech patterns sir.`
        const conditional = `stop mocking user`
        carefullyExecute(text, conditional)
        memory.grillSpecificUser = {
          status: false,
          victim: '',
          speech: '',
          count: 0
        }
      } else {
        if (accessLevelIs(currentUserInfoInMemory, 0, 1, 2)) {
          const text = `I've stopped monitoring ${victim}'s speech patterns ${currentUser}.`
          const conditional = `stop mocking user`
          carefullyExecute(text, conditional)
          memory.grillSpecificUser = {
            status: false,
            victim: '',
            speech: '',
            count: 0
          }
        } else if (accessLevelIs(currentUserInfoInMemory, 3)) {
          revokeResponse(currentUser)
        }
      }
    }
    // run math calculation
    if (checkSentenceFor(currentComment, mc_params)) {
      if (accessLevelIs(currentUserInfoInMemory, 0, 1, 2)) {
        const comment = currentComment.out('text')
        const expression = comment.split('calculate')[1]
        let result
        // yuri calculate 3x + 5x - 7y
        try {
          result = math.eval(expression)
        } catch (e) {
          result = math.simplify(expression).toString()
          console.log('before', result)
          result = result.replace(/\s\*\s(?!\d)/gi, '')
          result = result.replace(/\^( *)(\d)/g, '<sup>$2</sup>')
          result = result.replace(/\s(?=<sup>)/g, '')
          console.log('after', result)
        }
        const text = `The answer is ${result}.`
        const conditional = `math calculation`
        carefullyExecute(text, conditional)
      } else if (accessLevelIs(currentUserInfoInMemory, 3)) {
        revokeResponse(currentUser)
      }
    }

    // on this day
    if (checkSentenceFor(currentComment, hotd_params)) {
      if (accessLevelIs(currentUserInfoInMemory, 0, 1, 2)) {
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
                  const text = `On ${today}${year}, ${event}.`
                  const conditional = `event on this day`
                  carefullyExecute(text, conditional)
                } else if (type === 'Births' || type === 'Deaths') {
                  const year = `/${info.year}`
                  const dossier = info.text.split(',')
                  const name = dossier[0]
                  const occupation = dossier[1].replace(
                    /\([a-z]\. \d{0,4}\)/g,
                    ''
                  )
                  let action = ''
                  if (type === 'Births') action = `was born`
                  if (type === 'Deaths') action = `died`
                  console.log(
                    `Should log: On ${today}, ${name}, ${occupation.trim()}, ${action}.`
                  )
                  const text = `On ${today}${year}, ${name}, the ${occupation.trim()}, ${action}.`
                  const conditional = `born/died on this day`
                  carefullyExecute(text, conditional)
                }
              }
            )
          } catch (e) {
            const text = `Forgive me, but at this moment I am able to give you historical information about today.`
            const conditional = `born/died on this day`
            carefullyExecute(text, conditional)
          }
        }
      } else if (accessLevelIs(currentUserInfoInMemory, 3)) {
        revokeResponse(currentUser)
      }
    }

    // read a poem
    if (checkSentenceFor(currentComment, rp_params)) {
      if (accessLevelIs(currentUserInfoInMemory, 0, 1, 2)) {
        // if does not work: open e-chat in tab and try again, else any-origin
        const poems = await readPoem()

        poems.some(poem => {
          if (poem.content !== null && poem.content.length < 1000) {
            console.log('Found a poem.')
            let person
            const intro = `As you wish ${person}. I will read the poem ${
              poem.title
            } by ${poem.poet.name}.`
            if (currentUser === memory.self || currentUser === memory.owner) {
              person = `sir`
              const text = `${poem.content}`
              console.log('intro', intro)
              console.log('currentUser', currentUser)
              console.log('memory.self', memory.self)
              writeToChat(intro)
              writeToChat(text, 1000, 6000)
            } else {
              person = `${currentUser}`
              const text = `${poem.content}`
              writeToChat(intro)
              writeToChat(text, 1000, 6000)
            }
            return true
          }
          return false
        })

        // $.getJSON(
        //   `http://anyorigin.com/go?url=https%3A//www.poemist.com/api/v1/randompoems&callback=?`,
        //   data => {
        //     console.log('poem route')
        //     let poem = { title: 'No poem.' }

        //     data.some(poemArr => {
        //       if (poemArr.content !== null && poemArr.content.length < 1000) {
        //         console.log('Found a poem.')
        //         poem = poemArr
        //         return true
        //       }
        //       return false
        //     })
        //     let person
        //     const intro = `As you wish ${person}. I will read the poem ${
        //       poem.title
        //     } by ${poem.poet.name}.`
        //     console.log(intro)
        //     if (currentUser === memory.self || currentUser === memory.owner) {
        //       person = `sir`
        //       const text = `${poem.content}`
        //       writeToChat(intro)
        //       writeToChat(text, 1000, 6000)
        //     } else {
        //       person = `${currentUser}`
        //       const text = `${poem.content}`
        //       writeToChat(intro)
        //       writeToChat(text, 1000, 6000)
        //     }
        //   }
        // )
      } else if (accessLevelIs(currentUserInfoInMemory, 3)) {
        revokeResponse(currentUser)
      }
    }

    // get position of ISS
    if (checkSentenceFor(currentComment, pis_params)) {
      if (accessLevelIs(currentUserInfoInMemory, 0, 1, 2)) {
        $.getJSON(
          `http://api.open-notify.org/iss-now.json?callback=?`,
          data => {
            const lat = data['iss_position']['latitude']
            const lon = data['iss_position']['longitude']
            const text = `Sir the location of the ISS is lat: ${lat} lon: ${lon}.`
            writeToChat(text, 3000, 7000)
          }
        )
      } else if (accessLevelIs(currentUserInfoInMemory, 3)) {
        revokeResponse(currentUser)
      }
    }

    // who is on the ISS
    if (checkSentenceFor(currentComment, wis_params)) {
      if (accessLevelIs(currentUserInfoInMemory, 0, 1, 2)) {
        $.getJSON(`http://api.open-notify.org/astros.json?callback=?`, data => {
          const { number, people } = data
          const text = `The ${number} people currently on the ISS are ${people.map(
            (person, i) => {
              if (i + 1 < people.length) return ` ${person.name}`
              else return ` and ${person.name}`
            }
          )}.`
          writeToChat(text, 3000, 7000)
        })
      } else if (accessLevelIs(currentUserInfoInMemory, 3)) {
        revokeResponse(currentUser)
      }
    }

    // give advice
    if (checkSentenceFor(currentComment, ga_params)) {
      if (accessLevelIs(currentUserInfoInMemory, 0, 1, 2))
        $.getJSON(
          `https://cors-escape.herokuapp.com/http://api.adviceslip.com/advice`,
          data => writeToChat(`${data.slip.advice}`)
        )
      else if (accessLevelIs(currentUserInfoInMemory, 3))
        revokeResponse(currentUser)
    }

    // give advice about x
    if (checkSentenceFor(currentComment, gaa_params)) {
      if (accessLevelIs(currentUserInfoInMemory, 0, 1, 2)) {
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
      } else if (accessLevelIs(currentUserInfoInMemory, 3))
        revokeResponse(currentUser)
    }

    // get most common word
    if (checkSentenceFor(currentComment, mcw_params)) {
      const speech = memory.commentLogs.map(log => log.comment).join(' ')
      const freq = nlp(speech)
        .terms()
        .out('freq')
      const index = currentComment.values().numbers()[0]
        ? currentComment.values().numbers()[0]
        : 0

      if (currentUser === memory.self || currentUser === memory.owner) {
        const text = `Sir, the ${currentComment
          .values()
          .toOrdinal()
          .out()} most common word is "${freq[index].normal}", which is used ${
          freq[index].count
        } times and accounts for ${
          freq[index].percent
        }% of all words in this chat session.`
        writeToChat(text)
      } else {
        const speech = memory.commentLogs.map(log => log.comment).join(' ')
        const freq = nlp(speech)
          .terms()
          .out('freq')
        const index = currentComment.values().numbers()[0]
          ? currentComment.values().numbers()[0]
          : 0

        if (accessLevelIs(currentUserInfoInMemory, 1)) {
          const text = `${currentUser}, the ${currentComment
            .values()
            .toOrdinal()
            .out()} most common word is "${
            freq[index].normal
          }", which is used ${freq[index].count} times and accounts for ${
            freq[index].percent
          }% of all words in this chat session.`
          writeToChat(text)
        } else if (accessLevelIs(currentUserInfoInMemory, 2, 3)) {
          revokeResponse(currentUser)
        }
      }

      // promote user
      if (
        checkIfUserIsReferenced(currentComment) &&
        checkSentenceFor(currentComment, pu_params)
      ) {
        const oldMemories = memory.users
        let updatedUser = oldMemories.filter(
          user =>
            user.username.toLowerCase().trim() ===
            mentionedUser.toLowerCase().trim()
        )[0]

        if (currentComment.match('level (1|2)'))
          updatedUser.accessLevel = currentComment
            .match('level (1|2)')
            .toTitleCase()
            .out('text')

        memory.users = [...oldMemories, updatedUser]

        const text = `${mentionedUser} has been promoted. They now have access to ${
          updatedUser.accessLevel
        } commands.`
        writeToChat(text)
      }

      // demote user
      if (
        checkIfUserIsReferenced(currentComment) &&
        checkSentenceFor(currentComment, du_params)
      ) {
        const oldMemories = memory.users
        let updatedUser = oldMemories.filter(
          user =>
            user.username.toLowerCase().trim() ===
            mentionedUser.toLowerCase().trim()
        )[0]

        if (currentComment.match('level (2|3)'))
          updatedUser.accessLevel = currentComment
            .match('level (2|3)')
            .toTitleCase()
            .out('text')

        memory.users = [...oldMemories, updatedUser]

        const text = `${mentionedUser} has been demoted. They retain access to ${
          updatedUser.accessLevel
        } commands.`
        writeToChat(text)
      }
    }

    // MY COMMANDS
    if (currentUser === memory.self) {
      // pos mode on
      if (checkSentenceFor(currentComment, apos_params)) {
        state.normalMode = false
        state.POSMode = true
        const text = `Activating Language Learning Protocol.`
        writeToChat(text)
      }

      // pos mode off
      if (checkSentenceFor(currentComment, dpos_params)) {
        state.normalMode = true
        state.POSMode = false
        const text = `As you wish, sir. Deactivating Language Learning Protocol.`
        writeToChat(text)
      }

      // autopilotMode mode on
      if (checkSentenceFor(currentComment, aam_params) && state.normalMode) {
        state.normalMode = false
        state.autopilotMode = true
        const text = `Understood, sir. I've enabled Autopilot mode. I will inform others while you are away.`
        writeToChat(text)
      }

      // autopilotMode mode off
      if (checkSentenceFor(currentComment, dam_params) && state.autopilotMode) {
        let text
        state.normalMode = true
        state.autopilotMode = false

        if (memory.voicemail.length === 0)
          text = `Welcome back, sir. Nobody reached out to you while you were away.`
        else if (memory.voicemail.length === 1)
          text = `Deactivating Autopilot mode. Sir, ${memory.voicemail.join(
            ' '
          )} reached out to you.`
        else if (memory.voicemail.length > 1)
          text = `Deactivating Autopilot mode. Sir, ${memory.voicemail
            .slice(0, -1)
            .join(', ')}, and ${
            memory.voicemail[memory.voicemail.length - 1]
          } reached out to you.`

        writeToChat(text)
        memory.voicemail = []
      }

      // turn on sentiment analysis mode
      if (checkSentenceFor(currentComment, asa_params)) {
        const text = `Now analyzing user sentiment.`
        writeToChat(text, 2000)
        setTimeout(() => (state.sentimentMode = true), 2500)
      }

      // turn off sentiment analysis mode
      if (checkSentenceFor(currentComment, dsa_params)) {
        const text = `Deactivating Sentiment Analysis. Sentiments for each user have been recorded sir.`
        writeToChat(text, 2000)
        setTimeout(() => (state.sentimentMode = false), 2500)
      }

      // battery level
      if (checkSentenceFor(currentComment, bl_params)) {
        text = `My battery level is at ${state.batteryLevel}% sir.`
        writeToChat(text)
      }

      // backup battery level
      if (checkSentenceFor(currentComment, bbl_params)) {
        text = `My reserve capacity is at ${state.reserveBatteryLevel}%.`
        writeToChat(text)
      }

      // promote all users
      if (checkSentenceFor(currentComment, pau_params)) {
        const targetLevel = currentComment
          .match('level (1|2)')
          .toTitleCase()
          .out('text')

        if (currentComment.match('level (1|2)'))
          memory.users = memory.users.map(user => {
            user.accessLevel = targetLevel
            return user
          })

        let text
        try {
          text = `Sir, I have given all users ${targetLevel} clearance.`
        } catch (e) {
          console.log(`An error occurred: ${e}`)
          text = `Sir, that is not an actionable command.`
        }
        writeToChat(text)
      }

      // demote all users
      if (checkSentenceFor(currentComment, dau_params)) {
        const targetLevel = currentComment
          .match('level (2|3)')
          .toTitleCase()
          .out('text')
        if (currentComment.match('level (2|3)'))
          memory.users = memory.users.map(user => {
            user.accessLevel = targetLevel
            return user
          })

        let text
        try {
          text = `Sir, I have successfully demoted all users to ${targetLevel}.`
        } catch (e) {
          console.log(`An error occurred: ${e}`)
          text = `Sir, that is not an actionable command.`
        }
        writeToChat(text)
      }
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
        const text = `${beginning}${currentUser} ${
          memory.grillSpecificUser.speech
        }`
        writeToChat(text, 1000)
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
        const comment = currentComment.out('text')

        console.log('current user:', currentUser)
        console.log(
          'includes my name:',
          comment.includes(memory.self) ||
            piecesOfName(memory.self).some(pieceOfName =>
              comment.includes(pieceOfName)
            )
        )

        // add to voicemail to memory.myself (later change to state.owner when code moved to yuri account)
        if (
          (comment.includes(memory.self) ||
            piecesOfName(memory.self).some(pieceOfName =>
              comment.includes(pieceOfName)
            )) &&
          currentUser !== 'Y.U.R.I.'
        ) {
          console.log('voicemail: ', memory.voicemail)
          // no duplicate voicemails from repeated user
          memory.voicemail = [...new Set([...memory.voicemail, currentUser])]
          console.log('voicemail: ', memory.voicemail)
          const text = `Sorry ${currentUser}. ${
            memory.self
          } is away right now, but will be back shortly. I will let him know you reached out to him.`
          writeToChat(text)
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
        if (currentComment.nouns().out('array').length > 0) {
          const nouns = currentComment.nouns().out('array')
          const verbs = currentComment.verbs().out('array')
          const adjectives = currentComment.adjectives().out('array')
          const text = `nouns: ${JSON.stringify(nouns)}, verbs:${JSON.stringify(
            verbs
          )}, adjectives:${JSON.stringify(adjectives)}`
          writeToChat(text)
        }
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
        comment
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

      // get INFORMATION about this user
      let UserRecord = memory.users.filter(
        user => user.username === username
      )[0]

      // set DEFAULTS for this user
      if (!!UserRecord) UserRecord = UserRecord
      else
        UserRecord = {
          username: '',
          timeJoined: '',
          numberOfCommentsFromThisUser: '',
          firstComment: '',
          lastComment: '',
          accessLevel: '',
          accounts: '',
          balance: 0,
          yuriCalls: '',
          yuriStatus: ''
        }

      // get all the COMMENTS for this user
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
        // set user's FIRST COMMENT
        // and if first comment is empty, then set it
        if (!!UserRecord.firstComment)
          firstComment = commentsFilteredByThisUser[0].querySelector(
            '.echat-shared-chat-message-wrapper .echat-shared-chat-message-body'
          ).textContent

        // otherwise keep it the same.
        if (!!UserRecord.firstComment) firstComment = UserRecord.firstComment

        // set user's LAST COMMENT
        // the last comment always changes
        lastComment = commentsFilteredByThisUser[
          commentsFilteredByThisUser.length - 1
        ].querySelector(
          '.echat-shared-chat-message-wrapper .echat-shared-chat-message-body'
        ).textContent

        // set user's TIME JOINED
        // if no joined time has been assigned to the user, then add it
        if (!!UserRecord.timeJoined)
          timeJoined = commentsFilteredByThisUser[0]
            .querySelector(
              '.echat-shared-chat-message-wrapper .echat-shared-chat-message-top-wrapper .echat-shared-chat-message-time'
            )
            .textContent.slice(1, -1)

        // else keep the joined time the same
        if (!!UserRecord.firstComment) timeJoined = UserRecord.timeJoined
      }

      // set user's TOTAL COMMENTS
      const numberOfCommentsFromThisUser = commentsFilteredByThisUser.length

      // set user's ACCESS LEVEL
      let accessLevel
      if (!!UserRecord) {
        // if (memory.users.filter(user => user.username === username).length === 0) {
        if (username === memory.self || username === memory.owner)
          accessLevel = 'Level 0'
        else if (UserRecord.accessLevel) accessLevel = UserRecord.accessLevel
        else accessLevel = 'Level 2'
      } else accessLevel = 'Level 2'

      // set user's YURI CALL # and YURI COOLDOWN
      let yuriCalls
      if (!!UserRecord) {
        // if (memory.users.filter(user => user.username === username).length === 0) {
        if (username === memory.self || username === memory.owner) yuriCalls = 0
        else yuriCalls = 0
      } else accessLevel = UserRecord.accessLevel.yuriCalls

      // console.log('user balance before if: ', UserRecord.balance)

      const balance = UserRecord.balance

      // otherwise keep it the same.
      if (!!UserRecord.firstComment) firstComment = UserRecord.firstComment

      // FUTURE SETTINGS
      let yuriStatus = undefined
      let accounts = []

      // and finally return all that to the array
      return {
        username,
        timeJoined,
        numberOfCommentsFromThisUser,
        firstComment,
        lastComment,
        accessLevel,
        accounts,
        balance,
        yuriCalls,
        yuriStatus
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
    roastAllMode: true,
    mockUsersMode: false,
    autopilotMode: false,
    sentimentMode: false,
    ignoreMode: false,
    triviaMode: false
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
    setAccessControl: () => setAccessControl()
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
}
await start()
