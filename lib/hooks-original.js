const __CONFIG__ = require('../config')
const logger = require('../utils/logger')
const Bot = require('@kikinteractive/kik')
const moment = require('moment')
const name = `${__CONFIG__.kik.botUsername}`
var _ = require( "underscore" );
survey_result = {}
results = []
// var question = ""
// var questions = [{
//   user: 'community',
//   text: 'Do you prefer Coke or Pepsi ?',
//   answers: []
//   }, {
//   user: 'community',
//   text: 'Do you prefer the Batman or Superman ?',
//   answers: []
//   }, {
//   user: 'community',
//   text: 'Do you prefer Android or iOS ?',
//   answers: [] 
// }, {
//   user: 'daleevernden',
//   text: 'Should Beyoncé leave Jay Z ?',
//   answers: [] 
// }, {
//   user: 'codyguha',
//   text: 'Is Jay-z a better rapper than Nas ?',
//   answers: [] 
// }]
// var community = ['daleevernden', 'codyguha']
// var scoreboard = [{user: 'daleevernden', points:10000},{user: 'codyguha', points:10000}]
// var new_guy = ""

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
        const message = Bot.Message.text(`Hey ${user.firstName}! Do you have a moment to answer some questions about fried chicken ?`)
          .addTextResponse(`Yes, I have time`)
          .addTextResponse(`No thanks`)
        incoming.reply(message)
      });
  });

  bot.onStartChattingMessage((incoming) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`Hey ${user.firstName}! Do you have a moment to answer some questions about fried chicken ?`)
			.addTextResponse(`Yes, I have time`)
          .addTextResponse(`No thanks`)
        incoming.reply(message)
      });
  });

  bot.onTextMessage(/No thanks$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`ok ${user.firstName}! say "Hi" agian sometime `)
        incoming.reply(message)
      });
  });

 bot.onTextMessage(/no, I ate|YES!$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`Thanks for your time. Say "hi" or "GET chicken" to take the survey or get chicken.`)
        const hifive = Bot.Message.video(`http://media.giphy.com/media/uXNYDeQ20XWSs/giphy.gif`)
          .setAttributionName(' ')
          .setLoop(true)
          .setAutoplay(true)
          .setAttributionIcon('http://icons.iconarchive.com/icons/icons8/ios7/128/Animals-Chicken-icon.png')
      var foundObject = _.findWhere(results, {user: user.username});
      foundObject.hungry = incoming.body
      return incoming.reply([hifive, message])
    });
  });

  bot.onTextMessage(/Yes, I have time$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`Awesome lets get started. What would you say your relationship is with fried chicken?`)
          .addTextResponse(`I love it`)
          .addTextResponse(`It's a guilty pleasure`)
          .addTextResponse(`Not really my thing`)
          .addTextResponse(`I’ll die before I eat fried chicken`)
        survey_result.user = user.username
        results.push(survey_result)
        survey_result = {}
        console.log(results)
      return incoming.reply(message)
    });
  });

  bot.onTextMessage(/I love it$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`What is your favourite way to eat fried chicken?`)
          .addTextResponse(`I make it myself`)
          .addTextResponse(`KFC is my go to`)
          .addTextResponse(`Any fried chicken is good chicken`)
          .addTextResponse(`It's a secret and I’m not telling you`)
      var foundObject = _.findWhere(results, {user: user.username});
      foundObject.relationship = incoming.body
      console.log(foundObject)
      return incoming.reply(message);
    });
  });

  bot.onTextMessage(/It's a guilty pleasure$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`Guilty pleasure you say, tell me more.`)
          .addTextResponse(`After a night of hard partying`)
          .addTextResponse(`A treat if I’ve been eating good for while`)
          .addTextResponse(`It’s a personal matter`)
      var foundObject = _.findWhere(results, {user: user.username});
      foundObject.relationship = incoming.body
      console.log(foundObject)
      return incoming.reply(message)
    });
  });

  bot.onTextMessage(/Not really my thing|I’ll die before I eat fried chicken$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`So your not a fan eh? Tell us more.`)
          .addTextResponse(`Chicken is God’s creature and shouldn’t be eaten`)
          .addTextResponse(`Fried food is gross`)
          .addTextResponse(`I’m not going to get into it`)
      var foundObject = _.findWhere(results, {user: user.username});
      foundObject.relationship = incoming.body
      console.log(foundObject)
      return incoming.reply(message)
    });
  });

  bot.onTextMessage(/^After a night of hard partying|I’m not going to get into it|Fried food is gross|Chicken is God’s creature and shouldn’t be eaten|A treat if I’ve been eating good for while|It’s a personal matter|I make it myself|KFC is my go to|Any fried chicken is good chicken|It's a secret and I’m not telling you$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`What is your current mood?`)
          .addTextResponse(`😀`)
          .addTextResponse(`😊`)
          .addTextResponse(`😞`)
          .addTextResponse(`😠`)
      var foundObject = _.findWhere(results, {user: user.username});
      foundObject.detail = incoming.body
      console.log(foundObject)
      return incoming.reply(message);
    });  
  });

  bot.onTextMessage(/^😀|😊|😞|😠$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const pic1 = Bot.Message.picture(`http://fiber-international.com/wp-content/uploads/2015/04/800x600-chicken.jpg`)
          .setAttributionName('Chicken Parmesan')
          .setAttributionIcon('http://icons.iconarchive.com/icons/icons8/ios7/128/Animals-Chicken-icon.png')
        const pic2 = Bot.Message.picture(`http://assets.bwbx.io/images/ieMg5BCeWkWU/v1/-1x-1.jpg`)
          .setAttributionName('Double Down')
          .setAttributionIcon('http://icons.iconarchive.com/icons/icons8/ios7/128/Animals-Chicken-icon.png')
        const pic3 = Bot.Message.picture(`https://i.ytimg.com/vi/G8hbFO-r2nQ/maxresdefault.jpg`)
          .setAttributionName('Fried Drumsticks')
          .setAttributionIcon('http://icons.iconarchive.com/icons/icons8/ios7/128/Animals-Chicken-icon.png')
        const pic4 = Bot.Message.picture(`http://www.urbanmommies.com/wp-content/uploads/McDonalds-Chicken-Nuggets.jpg`)
          .setAttributionName('Chicken Nuggets')
          .setAttributionIcon('http://icons.iconarchive.com/icons/icons8/ios7/128/Animals-Chicken-icon.png')
        const message = Bot.Message.text(`Which of these would you like to be eating right now?`)
          .addTextResponse('Chicken Parmesan')
          .addTextResponse('Double Down')
          .addTextResponse('Fried Drumsticks')
          .addTextResponse('Chicken Nuggets')
      var foundObject = _.findWhere(results, {user: user.username});
      foundObject.mood = incoming.body
      console.log(foundObject)
      return incoming.reply([pic1, pic2, pic3, pic4, message]);
    });
  });

  bot.onTextMessage(/^Chicken Parmesan|Double Down|Fried Drumsticks|Chicken Nuggets$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        const message = Bot.Message.text(`Have we made you hungry answering these questions?`)
        .addTextResponse(`YES!`)
        .addTextResponse(`no, I ate`)
      var foundObject = _.findWhere(results, {user: user.username});
      foundObject.preference = incoming.body
      console.log(foundObject)
      return incoming.reply(message)
    });  
  });
  bot.onTextMessage(/My results from survey$/i, (incoming, next) => {
    bot.getUserProfile(incoming.from)
      .then((user) => {
        var foundObject = _.findWhere(results, {user: user.username});
        const info = Bot.Message.text(`Your relationship with chicken is "${foundObject.relationship}" and "${foundObject.detail}". You selected ${foundObject.preference} as what you would like to be eating right now. Your mood while doing survey was ${foundObject.mood}. And were you hungry after the survey ? "${foundObject.hungry}"`)
      return incoming.reply(info)
    });  
  });
}

module.exports = hooks
