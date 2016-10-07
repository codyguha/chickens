const __CONFIG__ = require('../config')
const logger = require('../utils/logger')
const Bot = require('@kikinteractive/kik')
const moment = require('moment')
const name = `${__CONFIG__.kik.botUsername}`
var _ = require( "underscore" );
var question = ""
var questions = [{
  user: 'community',
  text: 'Do you prefer Coke or Pepsi ?',
  answers: []
  }, {
  user: 'community',
  text: 'Do you prefer the Batman or Superman ?',
  answers: []
  }, {
  user: 'community',
  text: 'Do you prefer Android or iOS ?',
  answers: [] 
}, {
  user: 'daleevernden',
  text: 'Should Beyoncé leave Jay Z ?',
  answers: [] 
}, {
  user: 'codyguha',
  text: 'Is Jay-z a better rapper than Nas ?',
  answers: [] 
}]
var community = ['daleevernden', 'codyguha']
var scoreboard = [{user: 'daleevernden', points:10000},{user: 'codyguha', points:10000}]
var new_guy = ""

function hooks(bot) {
  // bot.onTextMessage(/^hi|hello|bonjour|sup$/i, (incoming, next) => {
  // bot.getUserProfile(incoming.from)
  //     .then((user) => {
  //       community.push(user.username)
  //       bot.broadcast(`${user.username} has joined the community`, community)
  //       console.log(community)
  //       const message = Bot.Message.text(`Hey ${user.firstName}! Welcome to the community. What can the community do for you ?`)
  //         .addTextResponse(`View all members of the community`)
  //         .addTextResponse(`Ask the community a question`)
  //         .addTextResponse(`View questions from the communtiy`)
  //       incoming.reply(message)
  //     });
  // });

  bot.onTextMessage(/Hi$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`Hey ${user.firstName}! Welcome back to the community. What can the community do for you ?`)
          .addTextResponse(`View Leaderboard`)
          .addTextResponse(`Show me my points`)
          .addTextResponse(`Ask the community a question`)
          .addTextResponse(`Do a community survey`)
          .addTextResponse(`View all members of the community`)
        incoming.reply(message)
      });
  });

  bot.onTextMessage(/^test$/i, (incoming, next) => {
        const message = Bot.Message.text(`do you like coke or pepsi ?`)
          .addTextResponse(`Coke`)
          .addTextResponse(`Pepsi`)
          .addTextResponse(`Bad question`)
        bot.broadcast(message, community)
        question = `do you like coke or pepsi ?`
        questions.push({user: 'community', text: question})
        console.log(questions)
  });

  bot.onStartChattingMessage((incoming) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`Hey ${user.firstName}! Before you can enter the community we need to know a bit more about you... and you need some points... Do you have a  moment to answer a few questions and gain some points ?`)
          .addTextResponse(`Yes I have a moment`)
          .addTextResponse(`Not right now`)
          .addTextResponse(`View all members of the community`)
        incoming.reply(message)
      });
  });

  bot.onTextMessage(/Not right now$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`ok ${user.firstName}! say "Hi" to join the community `)
          .addTextResponse(`Yes I have a moment`)
          .addTextResponse(`Not right now`)
          .addTextResponse(`View all members of the community`)
        incoming.reply(message)
      });
  });

 bot.onTextMessage(/Reboot$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`Hey ${user.firstName}! Before you can enter the community we need to know a bit more about you... and you need some points... Do you have a  moment to answer a few questions and gain some points ?`)
          .addTextResponse(`Yes I have a moment`)
          .addTextResponse(`Not right now`)
          .addTextResponse(`View all members of the community`)
        incoming.reply(message)
      });
  });

  bot.onTextMessage(/Restart$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        var user_score = _.findWhere(scoreboard, {user: user.username});
        user_score.points = 0
        var username = _.findWhere(community, user.username);
        var community_index = community.indexOf(username);
        community.splice(index, 1);
        const message = Bot.Message.text(`Hey ${user.firstName}! Before you can enter the community we need to know a bit more about you... and you need some points... Do you have a  moment to answer a few questions and gain some points ?`)
          .addTextResponse(`Yes I have a moment`)
          .addTextResponse(`Not right now`)
          .addTextResponse(`View all members of the community`)
        incoming.reply(message)
      });
  });

  bot.onTextMessage(/Yes I have a moment$/i, (incoming, next) => {
    communitySurveyQuestion1(incoming, bot);
  });

  // bot.onTextMessage(/Ignore$/i, (incoming, next) => {
  //   bot.getUserProfile(incoming.from)
  //     .then((user) => {
  //       const message = Bot.Message.text(`you really should be welcoming users to community`)
  //       .addTextResponse(`View Leaderboard`)
  //         .addTextResponse(`Show me my points`)
  //         .addTextResponse(`Ask the community a question`)
  //         .addTextResponse(`Do a community survey`)
  //         .addTextResponse(`View all members of the community`)
  //       return incoming.reply(message)
  //     });
  // });

  bot.onTextMessage(/Do a community survey$/i, (incoming, next) => {
    const message = Bot.Message.text(`excellent lets get started !`)
    incoming.reply(message)
    communitySurvey(incoming, bot)
  });

  bot.onTextMessage(/Personally welcome them to the community$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        var user_score = _.findWhere(scoreboard, {user: user.username});
        user_score.points+= 10
        const hi_message = Bot.Message.text(`${user.username} welcomes you to the community!`)
          .addTextResponse(`View Leaderboard`)
          .addTextResponse(`Show me my points`)
          .addTextResponse(`Ask the community a question`)
          .addTextResponse(`Do a community survey`)
          .addTextResponse(`View all members of the community`)
        bot.send(hi_message, new_guy);
        const message = Bot.Message.text(`Sweet! you gain 10 point. you currently have ${user_score.points} points`)
          .addTextResponse(`View Leaderboard`)
          .addTextResponse(`Show me my points`)
          .addTextResponse(`Ask the community a question`)
          .addTextResponse(`Do a community survey`)
          .addTextResponse(`View all members of the community`)
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/Show me my points$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        var user_score = _.findWhere(scoreboard, {user: user.username});
        console.log(user_score.points)
        const message = Bot.Message.text(`you currently have ${user_score.points} points`)
          .addTextResponse(`View Leaderboard`)
          .addTextResponse(`Ask the community a question`)
          .addTextResponse(`Do a community survey`)
          .addTextResponse(`View all members of the community`)
        return incoming.reply(message)
      });
  });
  
  // ASK COMMUNITY QUESTION
  bot.onTextMessage(/Ask the community a question|Ask the community another question$/i, (incoming, next) => { //another user.
    const message = Bot.Message.text(`Excellent, is it a YES/NO question or mutiple choice question ?`)
      .addTextResponse(`YES-NO`)
      .addTextResponse(`Multiple choice(!important:)`)
    return incoming.reply(message)
  });

  bot.onTextMessage(/View community results$/i, (incoming, next) => {
    const message = Bot.Message.text(`${questions}`)
    return incoming.reply(message)
  });

  bot.onTextMessage(/YES-NO|Redo question$/i, (incoming, next) => {
    const message = Bot.Message.text(`Ok. What is the question ?`)
    return incoming.reply(message)
  });

  bot.onTextMessage(/Yes$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        var foundObject = _.findWhere(questions, {text: question});
        var index = questions.indexOf(foundObject);
        var user_score = _.findWhere(scoreboard, {user: user.username});
        user_score.points+= 10
        var custom_answer = {
          user: user.username,
          answer: "yes"
        }
        foundObject.answers.push(custom_answer)

        const message = Bot.Message.text(`Thanks for your input ! you earn 10 points ! you have ${user_score.points} points`) // show points
         .addTextResponse(`View Leaderboard`)
          .addTextResponse(`Show me my points`)
          .addTextResponse(`Ask the community another question`)
          .addTextResponse(`Do a community survey`)
          .addTextResponse(`View all members of the community`)
        incoming.reply(message)
        nextQuestion(incoming,bot,index)
      });
      
  });

  bot.onTextMessage(/ask the communtiy now!$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        questions.push({user: user.username, text: question, answers: []})
        var user_score = _.findWhere(scoreboard, {user: user.username});
        if (user_score.points >= 100) {
          var other_members = _.without(community, user.username)
          user_score.points-= 100
          const message = Bot.Message.text(`${user.username} asks: ${question}`)
              .addTextResponse(`Yes`)
              .addTextResponse(`No`)
              .addTextResponse(`Bad question`)
          bot.broadcast(message, other_members)
          const personal_message = Bot.Message.text(`"${question}" was asked to the community. It cost you 100 points. you have ${user_score.points} points`)
            .addTextResponse(`View Leaderboard`)
          .addTextResponse(`Show me my points`)
          .addTextResponse(`Ask the community another question`)
          .addTextResponse(`Do a community survey`)
          .addTextResponse(`View all members of the community`)
          return incoming.reply(personal_message)
        } else {
          const another_message = Bot.Message.text(`sorry not enough points yet`)
          .addTextResponse(`View Leaderboard`)
          .addTextResponse(`Show me my points`)
          .addTextResponse(`Ask the community another question`)
          .addTextResponse(`Do a community survey`)
          .addTextResponse(`View all members of the community`)
          return incoming.reply(another_message)
        }
        
      });
  });

  bot.onTextMessage(/add question to survey$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        questions.push({user: user.username, text: question, answers: []})
        var user_score = _.findWhere(scoreboard, {user: user.username});
        user_score.points-= 50
        const message = Bot.Message.text(`"${question}" added to the survey. It cost you 50 points. you have ${user_score.points} points`)
          .addTextResponse(`View Leaderboard`)
          .addTextResponse(`Show me my points`)
          .addTextResponse(`Ask the community another question`)
          .addTextResponse(`Do a community survey`)
          .addTextResponse(`View all members of the community`)
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/No$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        var foundObject = _.findWhere(questions, {text: question});
        var index = questions.indexOf(foundObject);
        var user_score = _.findWhere(scoreboard, {user: user.username});
        user_score.points+= 10
        var custom_answer = {
          user: user.username,
          answer: "no"
        }
        foundObject.answers.push(custom_answer)

        const message = Bot.Message.text(`Thanks for your input ! you earn 10 points ! you have ${user_score.points} points`)
         .addTextResponse(`View Leaderboard`)
          .addTextResponse(`Show me my points`)
          .addTextResponse(`Ask the community another question`)
          .addTextResponse(`Do a community survey`)
          .addTextResponse(`View all members of the community`)
        incoming.reply(message)
        nextQuestion(incoming,bot,index)
      });
  });

  bot.onTextMessage(/Bad question$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        var foundObject = _.findWhere(questions, {text: question});
        var index = questions.indexOf(foundObject);
        var user_score = _.findWhere(scoreboard, {user: user.username});
        user_score.points+= 10
        var custom_answer = {
          user: user.username,
          answer: "no"
        }
        foundObject.answers.push(custom_answer)
        const message = Bot.Message.text(`Thanks for your input ! you earn 10 points ! you have ${user_score.points} points`)
         .addTextResponse(`View Leaderboard`)
          .addTextResponse(`Show me my points`)
          .addTextResponse(`Ask the community another question`)
          .addTextResponse(`Do a community survey`)
          .addTextResponse(`View all members of the community`)
        incoming.reply(message)
        nextQuestion(incoming,bot,index)
      });
  });

  bot.onTextMessage(/Coke|Pepsi|Mountain Dew is better than both!$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        var foundObject = _.findWhere(questions, {text: question});
        var custom_answer = {
          user: user.username,
          answer: incoming.body
        }
        foundObject.answers.push(custom_answer)
        communitySurveyQuestion2(incoming, bot)
      });
  });

  bot.onTextMessage(/The Batman|Superman|Wonderwoman is stronger than both!$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        var foundObject = _.findWhere(questions, {text: question});
        var custom_answer = {
          user: user.username,
          answer: incoming.body
        }
        foundObject.answers.push(custom_answer)
        communitySurveyQuestion3(incoming, bot)
      });
  });

  bot.onTextMessage(/Android|iOS|Ubuntu is boss$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        var foundObject = _.findWhere(questions, {text: question});
        var custom_answer = {
          user: user.username,
          answer: incoming.body
        }
        foundObject.answers.push(custom_answer)
        joinCommunity(incoming, bot)
      });
  });

  bot.onTextMessage(/Bad question$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        var foundObject = _.findWhere(questions, {text: question});
        var custom_answer = {
          user: user.username,
          answer: "bad question"
        }
        foundObject.answers = custom_answer
        console.log(questions)
        const message = Bot.Message.text(`Thanks for you input !`)
          .addTextResponse(`See what the community thinks about this question`)
        return incoming.reply(message)
      });
  });

  bot.onTextMessage(/View Leaderboard$/i, (incoming, next) => {
    const message = Bot.Message.link(`https://www.google.com`)
    .addTextResponse(`Show me my points`)
          .addTextResponse(`Ask the community a question`)
          .addTextResponse(`Do a community survey`)
          .addTextResponse(`View all members of the community`)
      // .setAttributionName('Leaderboard')
      // .setTitle('See where you rank in the community')
      // .setAttributionIcon('http://icons.iconarchive.com/icons/icons8/ios7/128/Animals-Chicken-icon.png')
    return incoming.reply(message)
  });

  bot.onTextMessage(/View all members of the community$/i, (incoming, next) => {
    const message = Bot.Message.text(`There are currently ${community.length} users: ${community}`)
      .addTextResponse(`View Leaderboard`)
          .addTextResponse(`Show me my points`)
          .addTextResponse(`Ask the community a question`)
          .addTextResponse(`Do a community survey`)
          .addTextResponse(`View all members of the community`)
    return incoming.reply(message)
  });

  bot.onTextMessage(/See what the community thinks about this question$/i, (incoming, next) => {
    var foundObject = _.findWhere(questions, {text: question});
    var results = JSON.stringify(foundObject.answers)
    const message = Bot.Message.text(`results so far: ${results}`)
    return incoming.reply(message)
  });

  bot.onTextMessage((incoming, next) => {
    console.log(incoming.body)
    question = ""
    question = incoming.body
     const message = Bot.Message.text(`are you sure you would like to ask "${question}" ?`)
      .addTextResponse(`ask the communtiy now!`)
      .addTextResponse(`add question to survey`)
      .addTextResponse(`Redo question`)
     return incoming.reply(message);
  });
 // bot.onTextMessage(/no, I ate|YES!$/i, (incoming, next) => {
  //   bot.getUserProfile(incoming.from)
  //     .then((user) => {
  //       const message = Bot.Message.text(`Thanks for your time. Say "hi" or "GET chicken" to take the survey or get chicken.`)
  //       const hifive = Bot.Message.video(`http://media.giphy.com/media/uXNYDeQ20XWSs/giphy.gif`)
  //         .setAttributionName(' ')
  //         .setLoop(true)
  //         .setAutoplay(true)
  //         .setAttributionIcon('http://icons.iconarchive.com/icons/icons8/ios7/128/Animals-Chicken-icon.png')
  //     var foundObject = _.findWhere(results, {user: user.username});
  //     foundObject.hungry = incoming.body
  //     return incoming.reply([hifive, message])
  //   });
  // });

  // bot.onTextMessage(/Yes, I have time$/i, (incoming, next) => {
  //   bot.getUserProfile(incoming.from)
  //     .then((user) => {
  //       const message = Bot.Message.text(`Awesome lets get started. What would you say your relationship is with fried chicken?`)
  //         .addTextResponse(`I love it`)
  //         .addTextResponse(`It's a guilty pleasure`)
  //         .addTextResponse(`Not really my thing`)
  //         .addTextResponse(`I’ll die before I eat fried chicken`)
  //       survey_result.user = user.username
  //       results.push(survey_result)
  //       survey_result = {}
  //       console.log(results)
  //     return incoming.reply(message)
  //   });
  // });

  // bot.onTextMessage(/I love it$/i, (incoming, next) => {
  //   bot.getUserProfile(incoming.from)
  //     .then((user) => {
  //       const message = Bot.Message.text(`What is your favourite way to eat fried chicken?`)
  //         .addTextResponse(`I make it myself`)
  //         .addTextResponse(`KFC is my go to`)
  //         .addTextResponse(`Any fried chicken is good chicken`)
  //         .addTextResponse(`It's a secret and I’m not telling you`)
  //     var foundObject = _.findWhere(results, {user: user.username});
  //     foundObject.relationship = incoming.body
  //     console.log(foundObject)
  //     return incoming.reply(message);
  //   });
  // });

  // bot.onTextMessage(/It's a guilty pleasure$/i, (incoming, next) => {
  //   bot.getUserProfile(incoming.from)
  //     .then((user) => {
  //       const message = Bot.Message.text(`Guilty pleasure you say, tell me more.`)
  //         .addTextResponse(`After a night of hard partying`)
  //         .addTextResponse(`A treat if I’ve been eating good for while`)
  //         .addTextResponse(`It’s a personal matter`)
  //     var foundObject = _.findWhere(results, {user: user.username});
  //     foundObject.relationship = incoming.body
  //     console.log(foundObject)
  //     return incoming.reply(message)
  //   });
  // });

  // bot.onTextMessage(/Not really my thing|I’ll die before I eat fried chicken$/i, (incoming, next) => {
  //   bot.getUserProfile(incoming.from)
  //     .then((user) => {
  //       const message = Bot.Message.text(`So your not a fan eh? Tell us more.`)
  //         .addTextResponse(`Chicken is God’s creature and shouldn’t be eaten`)
  //         .addTextResponse(`Fried food is gross`)
  //         .addTextResponse(`I’m not going to get into it`)
  //     var foundObject = _.findWhere(results, {user: user.username});
  //     foundObject.relationship = incoming.body
  //     console.log(foundObject)
  //     return incoming.reply(message)
  //   });
  // });

  // bot.onTextMessage(/^After a night of hard partying|I’m not going to get into it|Fried food is gross|Chicken is God’s creature and shouldn’t be eaten|A treat if I’ve been eating good for while|It’s a personal matter|I make it myself|KFC is my go to|Any fried chicken is good chicken|It's a secret and I’m not telling you$/i, (incoming, next) => {
  //   bot.getUserProfile(incoming.from)
  //     .then((user) => {
  //       const message = Bot.Message.text(`What is your current mood?`)
  //         .addTextResponse(`😀`)
  //         .addTextResponse(`😊`)
  //         .addTextResponse(`😞`)
  //         .addTextResponse(`😠`)
  //     var foundObject = _.findWhere(results, {user: user.username});
  //     foundObject.detail = incoming.body
  //     console.log(foundObject)
  //     return incoming.reply(message);
  //   });  
  // });

  // bot.onTextMessage(/^😀|😊|😞|😠$/i, (incoming, next) => {
  //   bot.getUserProfile(incoming.from)
  //     .then((user) => {
  //       const pic1 = Bot.Message.picture(`http://fiber-international.com/wp-content/uploads/2015/04/800x600-chicken.jpg`)
  //         .setAttributionName('Chicken Parmesan')
  //         .setAttributionIcon('http://icons.iconarchive.com/icons/icons8/ios7/128/Animals-Chicken-icon.png')
  //       const pic2 = Bot.Message.picture(`http://assets.bwbx.io/images/ieMg5BCeWkWU/v1/-1x-1.jpg`)
  //         .setAttributionName('Double Down')
  //         .setAttributionIcon('http://icons.iconarchive.com/icons/icons8/ios7/128/Animals-Chicken-icon.png')
  //       const pic3 = Bot.Message.picture(`https://i.ytimg.com/vi/G8hbFO-r2nQ/maxresdefault.jpg`)
  //         .setAttributionName('Fried Drumsticks')
  //         .setAttributionIcon('http://icons.iconarchive.com/icons/icons8/ios7/128/Animals-Chicken-icon.png')
  //       const pic4 = Bot.Message.picture(`http://www.urbanmommies.com/wp-content/uploads/McDonalds-Chicken-Nuggets.jpg`)
  //         .setAttributionName('Chicken Nuggets')
  //         .setAttributionIcon('http://icons.iconarchive.com/icons/icons8/ios7/128/Animals-Chicken-icon.png')
  //       const message = Bot.Message.text(`Which of these would you like to be eating right now?`)
  //         .addTextResponse('Chicken Parmesan')
  //         .addTextResponse('Double Down')
  //         .addTextResponse('Fried Drumsticks')
  //         .addTextResponse('Chicken Nuggets')
  //     var foundObject = _.findWhere(results, {user: user.username});
  //     foundObject.mood = incoming.body
  //     console.log(foundObject)
  //     return incoming.reply([pic1, pic2, pic3, pic4, message]);
  //   });
  // });

  // bot.onTextMessage(/^Chicken Parmesan|Double Down|Fried Drumsticks|Chicken Nuggets$/i, (incoming, next) => {
  //   bot.getUserProfile(incoming.from)
  //     .then((user) => {
  //       const message = Bot.Message.text(`Have we made you hungry answering these questions?`)
  //       .addTextResponse(`YES!`)
  //       .addTextResponse(`no, I ate`)
  //     var foundObject = _.findWhere(results, {user: user.username});
  //     foundObject.preference = incoming.body
  //     console.log(foundObject)
  //     return incoming.reply(message)
  //   });  
  // });
  // bot.onTextMessage(/My results from survey$/i, (incoming, next) => {
  //   bot.getUserProfile(incoming.from)
  //     .then((user) => {
  //       var foundObject = _.findWhere(results, {user: user.username});
  //       const info = Bot.Message.text(`Your relationship with chicken is "${foundObject.relationship}" and "${foundObject.detail}". You selected ${foundObject.preference} as what you would like to be eating right now. Your mood while doing survey was ${foundObject.mood}. And were you hungry after the survey ? "${foundObject.hungry}"`)
  //     return incoming.reply(info)
  //   });  
  // });
}

function communitySurvey(incoming, bot){
  // lets get started
  askQuestion(incoming, bot, 3)
}

function nextQuestion(incoming, bot, index){
  if ((index+1) < questions.length){
    index+=1 
    askQuestion(incoming, bot, index)
  } else {
    endSurvey(incoming, bot)
  }
}

function endSurvey(incoming, bot){
  const message = Bot.Message.text('That is all the questions so far... add some more !')
          .addTextResponse(`View Leaderboard`)
          .addTextResponse(`Show me my points`)
          .addTextResponse(`Ask the community a question`)
          .addTextResponse(`Do a community survey`)
  incoming.reply(message)
}

function askQuestion(incoming, bot, index){
  var i = index
  var q = questions[i]
  console.log(questions, i, q )
  bot.getUserProfile(incoming.from)
      .then((user) => {    
        const message = Bot.Message.text(`${q.user} asks: ${q.text}`)
          .addTextResponse(`Yes`)
          .addTextResponse(`No`)
          .addTextResponse(`Bad question`)
        incoming.reply(message)
      });
  question = q.text
}

function communitySurveyQuestion1(incoming, bot){
  bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`Do you prefer Coke or Pepsi ?`)
          .addTextResponse(`Coke`)
          .addTextResponse(`Pepsi`)
          .addTextResponse(`Mountain Dew is better than both!`)
        incoming.reply(message)
        question = `Do you prefer Coke or Pepsi ?`
      });
}
function communitySurveyQuestion2(incoming, bot){
  bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`Do you prefer the Batman or Superman ?`)
          .addTextResponse(`The Batman`)
          .addTextResponse(`Superman`)
          .addTextResponse(`Wonderwoman is stronger than both!`)
        incoming.reply(message)
        question = `Do you prefer the Batman or Superman ?`
      });
}
function communitySurveyQuestion3(incoming, bot){
  bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`Do you prefer Android or iOS ?`)
          .addTextResponse(`Android`)
          .addTextResponse(`iOS`)
          .addTextResponse(`Ubuntu is boss`)
        incoming.reply(message)
        question = 'Do you prefer Android or iOS ?'
      });
}

function joinCommunity(incoming, bot){
  bot.getUserProfile(incoming.from)
      .then((user) => {
        
        var user_score = _.findWhere(scoreboard, {user: user.username});
        if (user_score === undefined) {
          community.push(user.username)
          scoreboard.push({user: user.username, points: 150})
        } else {
          user_score.points+= 150
        var other_members = _.without(community, user.username)
        if (other_members.length >= 1) {
          const new_member_msg = Bot.Message.text(`${user.username} has joined the community`)
            .addTextResponse(`Personally welcome them to the community`)
          bot.broadcast(new_member_msg, other_members)
        }
        new_guy = user.username
        console.log(community)
        console.log(scoreboard)
        const message = Bot.Message.text(`Welcome to the community ! 150 points gained ! you have ${user_score.points} points`)
          .addTextResponse(`View Leaderboard`)
          .addTextResponse(`Show me my points`)
          .addTextResponse(`Ask the community a question`)
          .addTextResponse(`Do a community survey`)
          .addTextResponse(`View all members of the community`)
        return incoming.reply(message)
        }
      });
}

module.exports = hooks
