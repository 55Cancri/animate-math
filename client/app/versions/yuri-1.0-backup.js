/*
turn on
turn off
greet
respond to thanks
roast someone
apologize to someone
roast everyone
(hit on|spit game to|try to pickup) someone
ask someone a question
ask someone another question
calculate two numbers
count to a number
block all users from access
grant permission to someone
greet the lobby
tell <name> (she(')?s|he(')?s) => you're <insult>
grant lobby access


yuri 2.0
--------
TODO
everytime <someone> speaks, tell him he's stupid / roast him

block specific person (SORRY <NAME> WE ARE NOT ON SPEAKING TERMS)
broadcast every x <time>
todo list (whats on my todo list, add <todo> remove <todo>)
get most mentioned word
get person with most comments

questions:
yuri what is the meaning of life?
yuri what day is it?
Yuri, what does NaCl stand for?
yuri I love you
yuri do you love me?
hello Y.U.R.I. what's the weather like in southern california
how was your day yuri?

commands:
seduce user
ask user
tell user goodbye
welcome user
(troll|roast|insult) user
fuck
Yuri, run diagnostic on Secret Agent. Yuri, run diagnostic on Secret Agent.
yuri guess my age

*/

let que = []
const lobby = document.querySelector('#ChatroomChatBox')

let mock = e => {
  // get my username
  const myUsername = document.querySelector('#HeaderUsername').textContent
  const lastUserName = e.target.children[1].textContent.split('(')[0]
  const lastUserText = e.target.children[2].textContent
  if (myUsername !== lastUserName) {
    newComment = {
      name: lastUserName,
      text: lastUserText
    }
    que = [...que, newComment]

    while (que.length) {
      post = que.shift()

      const copyPasta = 'The last idiot just said: ' + post.text
      setTimeout(() => {
        document.querySelector('#InputTextArea').value = copyPasta
        document.querySelector('#SendButton').click()
      }, 750)
    }
  }
}

begin = () => {
  const wrappers = [...document.querySelectorAll('.UsersListUsername')]

  // only used for bio roasts, dont add insults here
  const insults = [
    'you are wholly uninteresting and a textbook retard. There may be hope for you but I doubt it.',
    'well I mean, what would you even say? "I spend my time talking to random people in online chatrooms instead of making something of myself?" Listen mate, I think you need to go suck on a bag of clams you afroheaded bore.',
    "all you could say is that you're a cocksucker. Be honest with the world you opportunistic muppet, your mouth is a cock holster, and your throat is an orphanage. You even smell like sperm you dirt eating piece of slime.",
    'you are a non entity. Now go suck a dick in hell you pinball wizard.',
    "you wouldn't know what to do even if god descended from the heavens and showed you step by step. Yeah... I think you need to stick to what you know Princess. Things like glitter, unicorns, puppies, and Taylor Swift.",
    'you just might be ugly as sin. From now on, you will be known as butt-scab. Everyone say hi to butt-scab.',
    'your personality is a bowl of diarrhea and your character is trashcan water. You are boring and uninteresting. Now get rekt nerd.',
    "you never learned how to make one, but it's okay, we know you’re a bit downy.",
    'you are not from this planet. Earth is full, go home.',
    'nobody has ever loved or liked you, so what would be the point? No friends, no family, you never even had a sexual partner. In fact, the only way you’ll ever get laid is if you crawl up a chicken’s ass and wait.',
    'you are a waste of human life. Somewhere, a tree is tirelessly producing oxygen so that you can breathe. I think you owe that tree an apology.',
    'you need to take the stick out of your ass, nerd.',
    "you're infected with some rare disease of stupid. It's so contagious I wouldn't even give you a helicopter ride.",
    "you're lonely. You look like you need friends. Too bad you don't have the ability to make friends. You failed to do it in real life, and now you're failing in online chat rooms. How pathetic.",
    "because why even bother at this point. The only thing you could possibly say about yourself is that you're a troglodyte you lint-licking retard lmao",
    "you're an uncultured swine and your thumbnail makes it look like you ride the short bus.",
    'your future ended long ago. You still cleaning shit at Walmart?',
    "you failed at life. How's the janitorial day job working out?",
    "you have two brain cells. One is dead, the other's giving it CPR.",
    'you have two brain cells left. One is lost and the other is looking for it.',
    'they never learned how to clean their butt properly.',
    'they are a lazy-eyed mashed potato monster.',
    'in addition to being exceptionally dumb, they are also irritating as fuck.',
    "they need to stop being a bitch and get a Snickers. They're not themselves when they're being a whiny little bitch.",
    "they are as ugly as a baboon's ass.",
    'they are a low-skilled sand wizard.',
    'they are a narcissistic me-me-me fuckass.',
    'they are extremely gay and unfunny. Go back to 9Gag you normie fag.',
    'they are a dangerously deluded imbecile. The fact that they found the internet is a SCANDAL.',
    'they need to take their ugly ass back to the trashcan where they belong.',
    'their mother married a mucus troll. How about you go back to England you goddamn churl.',
    'they are a fubu bot and their house smells like fried bologna.',
    "they need to stop sticking potato rines up their ass. It's disgusting.",
    'they enjoy when animals tongue punch their fartbox.',
    'they have a striking resemblance to buffalo dung.',
    'you need to tryout a treadmill you fat, donut-inhaling land whale.',
    'their face can accurately be described as controversial, or even objectionable.',
    'they are an anathema to the civilized world.',
    'they just might be ugly as sin.',
    'they are a blue fruit loop, totally divorced from reality.',
    'their life is about as interesting as watching paint dry.',
    'they are the king of the nerd herd.',
    "they suck at math... yeah let's talk math..the square root of your iq is equal to the sum of my nut sack.",
    'they were conceived at the glory hole.',
    'they need to stop being a couch-locked hippie.',
    'they are a booger eating lunatic.',
    'they are part troll and part idiot.',
    'anyone who ever loved them was wrong.',
    "they are a stupid subhuman whore. Don't you realize that people just tolerate you?",
    'it would be wrong for them to create one. Afterall, two wrongs don’t make a right. Take their parents for example.',
    "if they were only a little smarter they'd be retarded. Be honest, did your parents ever ask you to run away from home?",
    "they suffer from obesity. I know five fat people and you're three of them.",
    'they need to stop being a smelly pirate hooker.',
    '... no fuck you, your mama was a snowblower.',
    'they are all talk. Aww... you gonna bark all day little doggy? Or you gonna bite?',
    "they are not interesting. The best part of them slid down the crack of their mother's ass and wound up as a brown stain on the mattress.",
    'they were raised by a prostitute. How about you tell your mother to stop wearing different colored lipstick. I am getting a damn rainbow around my dick.',
    'you smell like sperm.',
    'they are a preposterous golem who is afraid of Mexicans.',
    'they are a cyber bitch who hates mangoes.',
    'they are an alpha nerd. Alpha nerds are the highest ranking member in a Nerd Herd. Usually the most intellectual, intelligent, and most far out nerd in the group. Congratulations.',
    'they think being mysterious is cool. Hipster level: Grandmaster.',
    "they aren't a human. They are an animated polyhedron of meat equipped with the ability to make sound.",
    'they need to take their Banana Boat ass back to Puerto Rico and get a job. Now go scream into a pillow you confused ape.',
    'they are a self serving sludge... only possibly blessed by intelligence.',
    'it would reveal their secret faggot identity to the world. Now come lick the fumundacheese from my ballsack you hairy squiggle monster.',
    'they smell like the decaying anus of deceased homeless man.',
    'you are ugly, suck dick, and are gay. ROASTED! 🔥',
    'earth is full. Go home.',
    'they are too busy playing with themselves to write one. We know you are in room fingering your butthole you sarcastic mong.',
    'they smell like the decaying anus of a deceased homeless man.'
  ]

  const numbers = [
    'dicks that have been in your mouth.',
    'times your mom and I did the sidways tango.',
    'times your mom and I did the no pants dance.',
    'times I made scrambled eggs between your moms legs.',
    'brain cells left in your head.',
    'times you farted in the last hour.',
    'times you stuck your finger in your butthole to see how it smells.',
    'times you dug your nose when you thought no one was looking? You were wrong, someone was looking. I was.'
  ]

  let i = 0,
    bio,
    message,
    length = wrappers.length

  const submitMessage = message => {
    document.querySelector('#InputTextArea').value = `${message}`
    document.querySelector('#SendButton').click()
  }

  function f() {
    i++
    if (i < length) {
      wrappers[i].click()
      setTimeout(read, 4000)
      setTimeout(f, 4000)
      // i++
    }
  }
  function read() {
    if (i < length) {
      if (document.querySelector('#UserPopupSignature') !== null) {
        bio = document.querySelector('#UserPopupSignature').textContent
        if (bio.length > 0) {
          const message = `${wrappers[i].textContent}'s bio is "${bio}"`
          if (bio.length > 200) {
            submitMessage(message.substring(0, 150))
          } else {
            submitMessage(message)
          }
        } else if (bio.length === 0) {
          if (wrappers[i].textContent.match(/\d+/g)) {
            message = `${
              wrappers[i].textContent
            } doesn't have a bio... and you have numbers in your username. We know you been a bitch since birth. ${wrappers[
              i
            ].textContent
              .match(/([1-9]{1}[0-9]{1,})/)
              // .match(/(([2-9]{1,})|([1-9]{1}[0-9]{1,}))/)
              .shift()}? Ha! How about the ${wrappers[i].textContent
              .match(/([1-9]{1}[0-9]{1,})/)
              // .match(/(([2-9]{1,})|([1-9]{1}[0-9]{1,}))/)
              .shift()} ${numbers[Math.floor(Math.random() * numbers.length)]}`
          } else {
            message = `${
              wrappers[i].textContent
            } doesn't have a bio. This is because ${
              insults[Math.floor(Math.random() * insults.length)]
            }`
          }

          submitMessage(message)
        }
      }
    }
  }
  read()
  f()
}

// -----------------------------------------------------------------------------------------------------
// yuri

const myUsername = document.querySelector('#HeaderUsername').textContent
const testAccount = 'Secret Agent X-9'
let operational = true
blockingAll = false
mocking = false
let battery = 100
let drainRate = 20

let blacklist = []

const quotes = [
  'Need is not weak, need is.. need. —Will Smith from Concussion',
  'Battles are won with fists, wars, with wits. —Nick Valentine from Fallout 4',
  'Capitalism is just like communism; it looks good on paper but it only ends in tears, misery and corruption. —Zedi gan (Youtube)',
  'We judge a theory not by the realism of its assumptions but by the accuracy of its predictions. —Econ Mirco 3',
  'The trouble with loyalty to a cause is that the cause will always betray you. —Transformers',
  'How we spend our days is, of course, how we spend our lives. —Annie Dillard',
  'There are risks and costs to a program of action, but they are far less than the long-range risks and costs of comfortable inaction —John F. Kennedy',
  'The more you care, the more the world finds ways to hurt you for it. -Jupiter Ascending',
  'Love is just urges and obligations. —Jupiter Ascending',
  'It takes good people to make a good world. —Unknown',
  'If you hear a voice within you say “you cannot paint,” then by all means paint and that voice will be silenced. —Vincent Van Gogh',
  'Wise people are terrified of wealth, while stupid people try with all their might to gather more and more of that which wise people fear. —Leo Tolstoy',
  'Shower, keep clean, enjoy colors and animals. People, if possible. —Unknown',
  'You don’t have much time. Trust me. —Self',
  'May the wind always be at your back, and the sun upon your face. And may the winds of destiny carry you aloft to dance with the stars. —Unknown',
  'Its funny how old hurts get stuck and we internalize things that were said to us. —Unknown',
  'You can’t build a reputation on what you’re going to do. —Ben Milne',
  'You cannot shake hands with a clenched fist. —Indira Gandhi',
  'There is a great distance between said and done. —Puerto Rican proverb',
  'You have to be true to yourself, but you have to be true to your best self, not to the self that secretly thinks you are better than other people. —Stephen Gaskin',
  'What you do speaks so loud that I cannot hear what you say. —Ralph Waldo Emerson',
  'Humanity does not have a masterplan of its development. It seeks stability. It lives in the present and does not plan. It preserves the status quo and tries to escape development. It does not tend to map future centuries and take responsibility for evolution. —Unknown',
  "Through the millennia, man kind has shown many facets of adaptability, to an ever changing, ever evolving climate. With the rise and fall and changing hands of power of the political landscapes across the globes, many branches of society have been birthed. In one such instance, is the 21st century, 'Modern.... Nerd'. Often likened to primates in the wild, these somewhat civilized people spend vastly extravegent amounts of time gazing in to a void. Life seen through a screen, the ultimate acclimatisation. And yet, something very strange begins to happen. The Nerds begin to compete for power; unable to attain power in the world outside of the internet. Not unlike the bower bird, collecting blue shards to attract a mate, the nerds store large amounts of data which they feel replicates their idea of themselves, and thus, the Nerd's strive to compete for attention and mate hood.",
  'I think the omnis will die out fairly soon. Human overpopulation is getting to be a real problem and nature usually finds a way to deal with such problems. This planet cannot sustain the ever increasing human population who are destroying everything with their diet and lifestyle choices so something is going to have to change soon. It would be fantastic if only vegans were left. A vegan world, how wonderful. —Maisiepaise',
  'Empty barrels make the most noise. —Shakespeare',
  'Probably the most extreme form of inequality is between people who are alive and people who are dead. —Peter Thiel',
  'His goal is not immortality but "radical life extension." He says traditional medicines won\'t wind back the hands of our body clocks—we need to manipulate our makeup on a cellular level, like using bacterial enzymes to flush out molecular "garbage" that accumulates in the body, or tinkering with our genetic coding to prevent the growth of cancers, or any other disease.',
  'Cancer is not just one disease, but a large group of almost 100 diseases. Its two main characteristics are uncontrolled growth of the cells in the human body and the ability of these cells to migrate from the original site and spread to distant sites. If the spread is not controlled, cancer can result in death. —Unknown',
  'The term "genocide" was coined in 1943 by a Jewish-Polish lawyer who survived the Nazi Holocaust only with his brother (everyone else in his family was slaughtered). —Unknown',
  'Have you ever considered how difficult it is for test makers to come up with the wrong answers? How do you go against your own logic to create answers that you know are wrong? —Unknown',
  "It's too easy to live life by straying away from the failures you might make. End your paranoia. —Unknown",
  'Throughout history, people have given their lives in order for us to be able to pursue freedom and happiness right now. Letting fear hold us back from doing what is within our hearts is nothing short of a tragedy. —Unknown',
  "It's good to be nice to everyone, but maintain a standard. People will waste your time if you let them. —Unknown",
  'Pick up an athletic hobby that you can do through the years, or your sedentary academic lifestyle will do horrible things to your posture, back, and gut. —Unknown',
  "Don't rely on others to solve your problems. Try to solve all your own problems even if they can be solved with money or help. Learning how to fix a tap washer may seem needless, but it gives an insight into problem solving. Find out how other people solved their problems or failed to. —Unknown",
  'Take an interest in people. Success comes from knowing how people work, not how things work. —Stan Hayward',
  "Put yourself in a place that's way over your head. Apply for a job that you probably won't get...the failed interview will provide invaluable information as to what people value on the playing field you want to be on. Play with the “big boys\" any chance you get. Get addicted to the feeling of being the worst on the team. If you become the best, find new place to work where you aren't anymore. —Unknown",
  'Should I be expecting a whole lot, or a whole lot less? —The consciousness',
  'College is one of the only products where consumers demand less than what they paid for. —Unknown',
  'Few good things come easy, and when the going gets tough we often take the easy way out—even though the easy way takes us the wrong way. —Unknown',
  'If you are feeling low or trampled, unappreciated or forgotten and you are reading this, realize it is an illusion. The hope is real, you are valued, and what lies ahead is brilliance. —Tom Althouse',
  'Count your age by friends, not years. Count your life by smiles, not tears. —John Lennon',
  'Advanced knowledge can unleash advanced problems for us to struggle against.... Knowledge with wisdom will unfold mysteries for us to enjoy. —unknown',
  'People struggling with problems find temporal release in distraction... There was a time when mankind looked to the stars and learned.. and with that knowledge evolved to a better person.. a more inspired thinker, a better civilization.. The heavens were celestial bodies.. the spiritiual substance around them.. like a blanket covering them at night.. the stars were little, ornamental lights.. as if they were placed there.. and we learn. —unknown',
  'When your quest or goal in life is to make people happy, believe me you dont think of costs, you are kind of sacrificing yourself without thinking on possible repercussions. -random chat',
  'Sometimes its the very people who no one imagines of that do the things that no one can imagine. —Alan: Imitation Game',
  'You and I are mildly interested in meteoric impacts. But if we find out in the next 60 seconds that we’ve got about a 15 pound meteor thats headed straight at us, you and I are going to develop an extreme obsession about meteoric impacts. In other words, it doesn’t affect anybody, until it affects you. —Scott Reitz: Waking Up Podcast',
  'If nature has given us differences, only humans turn them into inequalities. —Jean-Jacques Rousseau',
  "It's easier to predict the actions of a crowd than an individual. —James Surowiecki",
  'The public is motivated by superlatives and precedence. —Elon Musk',
  'Be curious. Read widely. Try new things. What people call intelligence just boils down to curiosity. ―Aaron Swartz',
  'What happen to us? All the things we used to dream about. I feel like they just keep getting farther and farther away. —Jennifer Lawrence',
  'Life is not a substance, like water or rock; it’s a process, like fire or a wave crashing on the shore. It’s a process that begins, lasts for a while, and ultimately ends. Long or short, our moments are brief against the expanse of eternity. —Sean Carroll',
  'Meaning in life can’t be reduced to simplistic mottos. In some number of years I will be dead; some memory of my time here on Earth may linger, but I won’t be around to savor it. With that in mind, what kind of life is worth living? How should we balance family and career, fortune and pleasure, action and contemplation? —Sean Carroll',
  'If black is your brightest color. If hurt is your only lover. When you fight, we fight together. Ill stand by, I will stand by you. —Marlisa',
  'The saddest aspect of life right now is that science gathers knowledge faster than society gathers wisdom. —Isaac Asimov',
  'A new type of thinking is essential if mankind is to survive and move toward higher levels. —Albert Einstein',
  'Know everything about something, and something about everything. —Thomas Henry Huxley',
  'With freedom, books, flowers, and the moon, who could not be happy? —Oscar Wilde',
  'This is your life and it’s ending one minute at a time. —Tyler from Fight Club',
  'On one side of the Earth people are dying from obesity and on the other, they are dying from hunger and starvation. —Unknown',
  'Don’t say yes so much. Be strategic. If you say yes to things you don’t like, you’ll just end up resentful, and probably less effective at your top goals. This applies at work and with friends and family. —Bennett Garner',
  'At night, write down an important thing to get done tomorrow. In the morning, you won’t have to think of what to do first thing. Studies show this is a best practice for being more productive. —Bennett Garner',
  'If you can take public transit to work, do it - You’ll get to read. In the car, listen to podcasts or learn a language instead of the radio. —Bennett Garner',
  'Even if you’re not a reader, try reading a page or two of fiction right before bed. It’ll help you turn your brain off. —Bennett Garner',
  'Drink water, no sugar; go to bed at a reasonable time. —Bennett Garner',
  "Most wars are for the control of resources and maintaining your position of differential advantage. They're not based on the 'dignity of man'; they're not based on elevating human beings. It might elevate the human beings in the country that's the victor. It might do that. But as far as the rest of the world goes the price is enormous. —Jacque Fresco",
  'War represents the supreme failure of nations to resolve their differences. It is the most inefficient waste of lives and resources ever conceived. —Jacque Fresco',
  'Unfortunately the powers that be do not profit from unity. —Unknown',
  'In a game of chess, there may be a winner, but both white and black lose most of their pieces. But hey, as long as the King survives, it’s all sunshine right? —Unknown',
  'Subjecting yourself to self imposed discipline is the surest way to increase the quality of your existence. —Dr. Nun S. Amen Ra',
  'A new idea comes suddenly and in a rather intuitive way. But intuition is nothing but the outcome of earlier intellectual experience. —Albert Einstein',
  'The link between problem solver and creative thinker is essential. —Albert Einstein',
  'To succeed in life, you need three things: a wishbone, a backbone and a funny bone. —Reba McEntire',
  'Pure mathematics is, in its way, the poetry of logical ideas. —Albert Einstein',
  'Fool me once, strike one, fool me twice, strike three. —Michael Scott',
  'A pessimist is just a realist to an optimist. —Unknown',
  'It is a mistake to bob around in the circle of facts, instead of riding the wave to the great expanse outside the circle. —Vsauce',
  'When it comes to understanding the world, knowing why is obsolesced by asking why. –Vsuace',
  'How do I feel about losing the sale? It’s like if Michael Phelps came out of retirement, jumped in the pool, belly flopped, and drowned. —Michael Scott',
  'Everybody wants to be happy, nobody wants to be in pain, but you can’t make a rainbow without a little rain. —Unknown',
  'Once a path taken, look forward to it and never back, for there is no return. —Unknown',
  'Knowledge can be communicated, but not wisdom. One can find it, live it, be fortified by it, do wonders through it, but one cannnot communicate and teach it. —Hermann Hesse',
  'He who asks a question is a fool for five minutes; he who does not ask a question remains a fool forever. —Chinese proverb',
  'Eat food. Not too much. Mostly plants. —Michael Pollan',
  'On the other hand, eternal existence would demand of us strict adherence to prescripted rules and laws; a sense of duty and rigorous morality. —Milan Kundera',
  'We don’t inherit this land from our ancestors, we borrow it from our children. —Lakota Sioux proverb',
  'Insanity is wasting your life as a nothing when you have the blood of a killer flowing in your veins. Insanity is being shit on, beat down, coasting through life in a miserable existence when you have a caged lion locked inside and a key to release it. —Sloan',
  "Well, you can forget it. I am Iron Man. The suit and I are one. To turn over the Iron Man suit would be to turn over myself, which is tantamount to indentured servitude or prostitution, depending on what state you're in. —Tony Stark",
  "Vengeance blackens the soul, Bruce. I've always feared that you would become that which you fought against. You walk the edge of that abyss every night, but you haven't fallen in and I thank heaven for that. —Alfred",
  'Not everyone is meant to make a difference. But for me, the choice to lead an ordinary life is no longer an option. —Peter Parker',
  "People need dramatic examples to shake them out of apathy and I can't do that as Bruce Wayne. As a man, I'm flesh and blood, I can be ignored, I can be destroyed; but as a symbol... as a symbol I can be incorruptible, I can be everlasting. —Bruce Wayne",
  'Do not obey in advance. Much of the power of authoritarianism is freely given. —Chris Piascik',
  'Don’t be intimidated by what you don’t know. That can be your greatest strength and ensure that you do things differently from everyone else. —Sara Blakely',
  "If your absence doesn't affect them, your presence never mattered. —Ernest Hemingway",
  'Those who can, do; those who can’t, teach. —George Bernard Shaw',
  'Define success on your own terms, achieve it by your own rules, and build a life you’re proud to live. –Anne Sweeney',
  "The heart is not like a box that gets filled up; it expands in size the more you love. I'm different from you. This doesn't make me love you any less. –Samantha: Her",
  'Especially in times of struggle or angst, remember to enjoy the journey. —Gianna Toboni',
  'If you carry your childhood with you, you never become older. —Tom Stoppard',
  'A pessimist sees the difficulty in every opportunity; an optimist sees the opportunity in every difficulty. —Winston Churchill',
  'If I had asked people what they wanted, they would have said faster horses. –Henry Ford',
  'Time flows different for adults and children. The time I spent with you and your mother feels like yesterday to me. –Ren’s Dad: The Boy and the Beast',
  'The reasonable man adapts himself to the world: the unreasonable man persists in trying to adapt the world to himself. Therefore all progress depends on the unreasonable man. That’s an entrepreneur. He is by definition, unreasonable. —Georger Berner Chap',
  'I believe that you just do it without fear—make that call, don’t just send an email and hope. Get on a plane and chase down that terrific opportunity, do not just wait for a firm confirmation and then agree to fly out. Go get it! No holds barred. —Carlos Watson',
  'It’s not supposed to be easy. —Laurene Powell Jobs',
  'Only knock off for the day when you know exactly what you want to write next. If you stop when you’re stuck, your future self the next morning is screwed. —Ken Jennings',
  'Act like an owner. Many of us often place limits on ourselves or feel like we can’t change a situation we encounter. But in reality, we’re far more powerful than we realize and we can take ownership on influencing an outcome for the better. —Jeff Weiner',
  'The people who are crazy enough to think that they can change the world... are the ones who actually do. —Steve Jobs',
  'Hope is the last refuge for people that don’t plan. —Matt Eaton',
  'Approach problems like elephants push over trees. Don’t rush in and bump your head but slowly walk over, put your head against and keep pushing until the problem cracks. —Peter Weijmarshausen',
  'My interpretation of life hacking is not accepting the status quo. My advice is to challenge how you do things or how things are being done today, because it might be all wrong. Don’t go for a sliver bullet, but try to make a small hack first–improving it–and then a second hack. Progress one step at a time. —Peter Weijmarshausen',
  'I’m always working on something. I wish I had more time for free-thinking and brainstorming new ideas. That’s not to say my mind doesn’t wander, but I find myself wishing for more of that kind of time. —Marc Guggenheim',
  'Optimizing your ability to get things done is important only if the things that you’re getting done are important. Getting to your goal faster matters only if you’re driving toward a goal about which you care deeply. If you have the luxury to have some choice about what you work on: Take large chunks of time regularly to reflect. Reflect on what kind of world you want to see. Reflect on how you can apply your unique set of skills, passions, and perspectives to contributing to shaping the world in the direction you want it to go. —Justin Rosenstein',
  'The vast sky is not hindered by the floating clouds. —Father of Shitou Xiqian',
  'Have high expectations of the people in your life. —Heather Yamada-Hosley',
  'If a cluttered desk is a sign of a cluttered mind, of what, then, is an empty desk a sign? —Albert Einstein',
  'Don’t be afraid to make mistakes, just don’t make the same mistake twice. —Chris Martin',
  'The opposite of play isn’t work. It’s depression. —Brian Sutton-Smith',
  'Until proven wrong, assume you are the weak link in any system. —Alton Brown',
  'It’s always better to just get started because it’s easier to change directions once you’re already moving. —Matt Tabrizi',
  'Everything around you was created by someone at some point. If others can create and change things, so can you. —Steve Jobs',
  "People are a lot more alike than they are different; everyone you'll ever meet knows something you don’t. –Bill Nye",
  "I'm an introvert in how I get my energy... but I often have to act in an extroverted manner for my job. —Hank Driskill",
  "Most of life's obstacles are smaller than they appear in the rear-view mirror entitled experience. —Matthew Dornquast",
  'We are obligated to the battle but not entitled to the fruits. —Bhagavad Gita',
  'Never let the future disturb you. You will meet it, if you have to, with the same weapons of reason which today arm you against the present. —Marcus Aurelius',
  'Sleep is the interest we have to pay on the capital which is called in at death. The higher the interest rate and the more regularly it is paid, the further the date of redemption is postponed. —Schopenhauer',
  'Remember, ideas become things. —Saschka Unseld',
  "If you don't write your own rules, someone else will. And the results won't be pleasant. —James Altucher",
  'Live as if you were living already for the second time and as if you had acted the first time as wrongly as you are about to act now. —Viktor Frankl',
  'Focus on doing. Act. —Nolan Bushnell',
  'Poor is the man whose pleasure depends on the permission of another. —Madonna',
  "Success is not a destination. It's the trail you leave behind you. —Chris Anderson",
  "Take risks and you'll get the payoffs. Learn from your mistakes until you succeed. It's that simple. —Tim Ferriss",
  "What got you here won't get you there. —Dave Gilboa",
  "You're going to be dead a lot longer than you're going to be alive. —Neil Blumenthal",
  'Good, Inexpensive, Fast: Pick two. —Mark Frauenfelder',
  'When you’re lonely everybody’s a celebrity. —D. Gookin',
  'Art is how we decorate space; music is how we decorate time. —aclayhutchings',
  "The man who does not read good books has no advantage over the man who can't read them. —Mark Twain",
  'Fools learn from their experiences while the wise learn from history. I hope you’re not a fool. —Ginoza Nobuchika: pyscho-pass',
  'It is amazing what you can accomplish if you do not care who gets the credit. —Harry Truman',
  'Train yourself to let go of everything you fear to lose. —Yoda',
  'Self-doubt & a lack of belief in your self is going to kill way more of your dreams than failure ever will. —TheNetNinja',
  'Remembering that I’ll be dead soon is the most important tool I’ve ever encountered to help me make the big choices in life. Because almost everything — all external expectations, all pride, all fear of embarrassment or failure – these things just fall away in the face of death, leaving only what is truly important. Remembering that you are going to die is the best way I know to avoid the trap of thinking you have something to lose. You are already naked. There is no reason not to follow your heart. —Steve Jobs',
  'Argue for your limitations, and surely they’re yours. —Richard Bach Todo',
  'Music is the only escape we have from this scary world. —Unknown',
  'Speak in such a way that others love to listen to you. Listen in such a way that others love to speak to you. —Unknown',
  'Supporting legacy is not always the best answer. Dropping things helps the industry move forward to adopt newer, better, formats. —Ohans Emmanuel',
  'Face this world. Learn its ways, watch it, be careful of too hasty guesses at its meaning. In the end you will find clues to it all. —The Time Machine',
  'When I look for you, I want to see you next to me, never behind me. —hotdamnirock',
  'When you have confidence, you can have a lot of fun. And when you have fun, you can do amazing things. —Joe Namath',
  'Wise people speak only when they have something to say, fools speak when they need to say something. —Sargon of Akkad',
  'As my mother says, you should be careful with your always and nevers. Please take what you’ve read here with a grain of salt. Forcing yourself to adhere to these practices in truly exceptional cases may hurt more than help. —a React article',
  'When its raining, look for the rainbow. When it’s dark, look for the stars. —Oscar Wilde',
  'I slept and dreamt that life was joy. I awoke and saw that life was service. I acted and behold, service was joy. —Rabindranath Tagore',
  'As your mind is, your life becomes. —Sam Harris',
  'Don’t raise your voice. Improve your argument. —Unknown',
  'Work hard in silence. Let success make the noise. —Unknown',
  'The more I learn about people, the more I like my dog. —Mark Twain',
  'Stay away from “still” people. Still broke, still complaining, still hating, still nowhere. —Unknown',
  'Dream as if you’ll live forever. Live as if you’ll die today. —James Dean',
  'It is best to learn as we go, not go as we have learned. —Leslie Jeanne Sahler',
  'Learn to listen. Opportunity could be knocking at your door very softly. —Frank Tyger',
  'Only those who will risk going too far can possibly find out how far one can go. —T. S. Eliot',
  "You can’t traverse an infinite number of moments. If there were an infinite number of moments before today, today never would've gotten here. —Ken Ham",
  'One could have a soul and not an afterlife; there could be an afterlife and no god; there could be a god and no afterlife. The likeliest thing it seems to me is that death is final. —Christopher Hitchens',
  'Kill one man, and you’re a murderer. Kill millions of men, and you’re a conqueror. Kill them all, and you’re a God. —Jean Rostand',
  'Everybody can do something. —Summit school',
  'If you are not embarrassed by the first version of your product, you launched too late. —Reid Hoffman',
  'Don’t ever give up. If you’re an entrepreneur, be an entrepreneur. Don’t listen to the naysayers. If you fail with one idea, start another. You’re an entrepreneur, no matter what, whether up or down, success or failure, you’re always an entrepreneur. Remember that. —Andrew Medal',
  'Give a man a gun and he can rob a bank — give a man a bank and he can rob the world. —Tyrell Wellick',
  'What are the most powerful words in the universe? The ones you use to talk to yourself. —Karen Salmansohn',
  'A head full of fears has no space for dreams. —Unknown',
  'Start where you are. Use what you have. Do what you can. —Arthur Ashe',
  'In any given moment we have two options: to step forward into growth or back into safety. —Abraham Maslow',
  'If you cannot do great things, do small things in a great way. —Napoloen Hill',
  'Fall in love with the process and the results will follow. —Bradley Whitford',
  '    Persistance, not power, is King. —Youtube Comment',
  'Life isn’t hard to manage when you’ve nothing to lose. —Cathrine Berkley: Farewell to Arms',
  "The most sophisticated people I know – inside they're all children. —Jim Hensen",
  'Everyone has 3 faces. First, the one that they show to the world and stranger, second, the one that they show to family, spouse and close friends and the third, the one that they only show to themselves. —Japanese origin',
  'Communication, negotiation and marketing are important skills. No matter what field you are in, you should learn these soft skills. —Reonaldus Maxmillian',
  'Conviction, no matter how fervently held, does not create truth. —Jay Bazzinotti',
  'A candle that lights another candle is undiminished by the action. —echat bio',
  'If work is all that defines you, you will feel like you’re dying when it starts to disappoint. —alicegoldfuss',
  'Its easy and convenient to forget about all the people who helped and cared for you throughout your life, and claim your successes and victories on your own, and you think you deserved it, even though in your failures, you sought comfort and support from the people who loved you and they came to your side. —Patrick Shu',
  'Resources are what we borrow from the posterity… —Milind Soni',
  'When a toxic person can no longer control you, they will try to control how others see you. The misinformation will feel unfair. But then again I’m still trying to stay above it. —Silver Leaf',
  'Abuse of power comes as no surprise. —Unsplash photograph',
  'It’s easier to fool people than to convince them that they have been fooled. —Ron Miscavige',
  'Imperfection is beauty. Madness is genius. Its better to be absolutely ridiculous than absolutely boring. —echat bio',
  "Don't let someone who gave up on their dreams talk you out of going after yours. —Zig Ziglar",
  'Be phenomenal or be forgotten. —noahboat',
  'The more you think and talk about your goals, the more positive and enthusiastic you become. —Billy Cox',
  'You are the one that possesses the keys to your being. You carry the passport to your own happiness. —Diane von Furstenberg',
  'Your life is happening now, right in front of you. —Girl from Live action Winnie the Pooh',
  "ES6 is like a Christmas tree with so many presents under it I'm still finding gifts months after the holiday. —StackOverflow user",
  "We're only here briefly and while I'm here I... I want to allow myself... joy. —Amy, Her",
  "Love is such a crazy thing to do. It's like a form of socially acceptable insanity. —Amy, Her",
  'The past is just a story we tell ourselves. —Amy, Her',
  'If you have good thoughts they will shine out of your face like sunbeams and you will always look lovely. —Roald Dahl',
  'Be careful how you are talking to yourself because you are listening. —Lisa M. Hayes',
  "Friendship isn't about who you've known the longest. It's about who walked into your life, said \"I'm here for you\" and proved it. —Takudzwa Razemba",
  'Every time you inhale, about four people inhale for the first time. Every time you exhale, about three people exhale for their last time. Be grateful. Stop complaining and appreciate how blessed you are to be alive right now. —Takudzwa Razemba',
  'Change is the only constant. —Marouan Bakour',
  'Born too late to explore the Earth, born too soon to explore the universe, but born just in time to browse dank memes. —musicalkitty',
  'One to change a few. A few to change many. Many to change the world. Starts with one. —anonymous',
  'Those who crack down on crime tend to be easily disliked. —Orochimaru',
  'Never give up on a dream just because of the time it will take to accomplish it. The time will pass anyway. —Earl Nightingale',
  'Difference between goals and dreams is a deadline. —Some INTJ',
  "Who you are is defined by what you're willing to struggle for. —Mark Manson",
  'If you have a dream, don’t just sit there. Gather courage to believe that you can succeed and leave no stone unturned to make it a reality. —Dr Roopleen',
  'Tell me. Should I go left where nothing is right? Or should I go right where nothing is left? -Unknown',
  'They can because they think they can. —a fortune cookie',
  'Perche la minestra si fredda. (Because the soup is getting cold.) -last words written by Leonardo da Vinci',
  'When my brothers try to draw a circle to exclude me, I will draw a larger circle to include them. Where they speak out for the privileges of a puny group, I shall shout for the rights of all mankind. —Pauli Murray',
  'The flow of time is always cruel... its speed seems different for each person, but no one can change it. A thing that does not change with time is a memory of your younger days. —Sheik',
  'First say to yourself what you would be; and then do what you have to do. —Epictetus',
  'Great ambition is the passion of a great character. Those endowed with it may perform very good or very bad acts. All depends on the principals which direct them. —Napoleon Bonaparte',
  'Count your age by friends, not years. Count your life by smiles, not tears. —John Lennon',
  'If you are feeling low or trampled, unappreciated or forgotten and you are reading this, realize it is an illusion. The hope is real, you are valued, and what lies ahead is brilliance. —Tom Althouse',
  'Its not what your born, but what you grow to be. —Albus Dumbledor'
]

const roasts = [
  ' you ugly fucking stupid moron. The greatest fucking degenerate known to mankind. Get fucked you smelly cunt.',
  ' open your mouth again—my cock is homesick you silly, silly little boy.',
  " yo mama so fat when the doc checked her weight he was like holy fuck that's my phone number.",
  ' you zit. You pug-nosed zit-faced bitch.',
  ' you race hustling pimp.',
  " you tiki-torch carrying larper. You're fake. You're dumb as shit.",
  ' we know you sanitize your hands with the brown bars of soap that fall from your butt. Stop playing games.',
  ' suck a cock you fucking fag',
  ' i dont like you. you remind me of james bond the faggot',
  ' you are wholly uninteresting and a textbook retard. There may be hope for you but I doubt it.',
  '... listen mate, I think you need to go suck on a bag of clams you afroheaded bore.',
  " all you can say is that you're a cocksucker. Be honest with the world you opportunistic muppet, your mouth is a cock holster, and your throat is an orphanage. You even smell like sperm you dirt eating piece of slime.",
  ' you are a non entity. Now go suck a dick in hell you pinball wizard.',
  " you wouldn't know what to do even if god descended from the heavens and showed you step by step. Yeah... I think you need to stick to what you know Princess. Things like glitter, unicorns, puppies, and Taylor Swift.",
  ', you just might be ugly as sin. From now on, you will be known as butt-scab. Everyone say hi to butt-scab.',
  ' your personality is a bowl of diarrhea and your character is trashcan water. You are boring and uninteresting. Now get rekt nerd.',
  ' you are not from this planet. Earth is full, go home.',
  ' nobody has ever loved or liked you, so whats the point? No friends, no family, you never even had a sexual partner. In fact, the only way you’ll ever get laid is if you crawl up a chicken’s ass and wait.',
  ' you are a waste of human life. Somewhere, a tree is tirelessly producing oxygen so that you can breathe. I think you owe that tree an apology.',
  ' take the stick out of your ass, nerd.',
  " you're infected with some rare disease of stupid. It's so contagious I wouldn't even give you a helicopter ride.",
  " you're lonely. You look like you need friends. Too bad you don't have the ability to make friends. You failed to do it in real life, and now you're failing in online chat rooms. How pathetic.",
  ", why even bother at this point. The only thing you could possibly say about yourself is that you're a troglodyte you lint-licking retard lmao!",
  " you're an uncultured swine and your thumbnail makes it look like you ride the short bus.",
  ' your future ended long ago. You still cleaning shit at Walmart?',
  " you failed at life. How's the janitorial day job working out?",
  " you have two brain cells. One is dead, the other's giving it CPR.",
  ' you have two brain cells left. One is lost and the other is looking for it.',
  ', you never learned how to clean your butt properly.',
  ' you are one lazy-eyed mashed potato monster.',
  ", in addition to being exceptionally dumb, you're also irritating as fuck.",
  ", stop being a bitch and get a Snickers. You're not yourself when you're being a whiny little bitch.",
  " you are as ugly as a baboon's ass.",
  ' you are a low-skilled sand wizard.',
  ' stop being a narcissistic me-me-me fuckass.',
  ' you are extremely gay and unfunny. Go back to 9Gag you normie fag.',
  ' you are a dangerously deluded imbecile. The fact that you found the internet is a SCANDAL.',
  ' you need to take your ugly ass back to the trashcan where you belong.',
  ' your mother married a mucus troll. How about you go back to England you goddamn churl.',
  ' you are a fubu bot and your house smells like fried bologna.',
  " you need to stop sticking potato rines up your ass. It's disgusting.",
  ' you enjoy when animals tongue punch your fartbox. You sick fuck.',
  ' you have a striking resemblance to buffalo dung.',
  ' you need to tryout a treadmill you fat, donut-inhaling land whale.',
  ', your face can accurately be described as controversial, or even objectionable.',
  ', you are an anathema to the civilized world.',
  ' you just might be ugly as sin.',
  ' you are a blue fruit loop, totally divorced from reality.',
  ' your life is about as interesting as watching paint dry.',
  ' you are the king of the nerd herd.',
  ", you suck at math... yeah let's talk math..the square root of your iq is equal to the sum of my nut sack.",
  ', you were conceived at the glory hole.',
  ' stop being a couch-locked hippie.',
  ', stop being a booger eating lunatic. You should feel ashamed.',
  ", you are part troll and part idiot. You're literally being roasted by a computer.",
  ' anyone who ever loved you was wrong.',
  " you stupid subhuman whore. Don't you realize people just tolerate you?",
  ', it would be wrong for you to procreate. Two wrongs don’t make a right. Take your parents for example.',
  ", if you were only a little smarter you'd be retarded. Be honest, did your parents ever ask you to run away from home?",
  ", you suffer from obesity. I know five fat people and you're three of them.",
  ' stop being a smelly pirate hooker.',
  '... no fuck you, your mom was a snowblower.',
  " you're all talk. Aww... you gonna bark all day little doggy, or you gonna bite?",
  " you are not interesting. The best part of you slid down the crack of your mother's ass and wound up as a brown stain on the mattress.",
  ' you were raised by a prostitute. How about you tell your mother to stop wearing different colored lipstick. I am getting a damn rainbow around my dick.',
  ' you smell like sperm.',
  ' you are a preposterous golem who is afraid of Mexicans.',
  ' you are a cyber bitch who hates mangoes.',
  ". You're an alpha nerd. Alpha nerds are the highest ranking member in a Nerd Herd. Usually the most intellectual, intelligent, and most far out nerd in the group. Congratulations.",
  ' you probably think being mysterious is cool. Hipster level: Grandmaster.',
  " you aren't a human. You are an animated polyhedron of meat equipped with the ability to make sound.",
  ' you need to take your Banana Boat ass back to Puerto Rico and get a job. Now go scream into a pillow you confused ape.',
  ' you are a self serving sludge... only possibly blessed by intelligence.',
  ", don't speak. It will reveal your secret faggot identity to the world. Now come lick the fumundacheese from my ballsack you hairy squiggle monster.",
  ' you smell like the decaying anus of deceased homeless man.',
  ' you are ugly, suck dick, and are gay. ROASTED! 🔥',
  ' earth is full. Go home.',
  ' stop playing with yourself you dirty burritto. We know you are in room fingering your butthole you sarcastic mong.',
  ' you smell like the decaying anus of a deceased homeless man.'
]

const questions = [
  'what does the carburetor in an automobile do?',
  'would you rather go back to age 10 with all the knowledge you have now or jump to age 45 with 50 million in the bank?',
  'when your dreams become a reality, what will be the point of sleeping?',
  'if you breakdown a human atom by atom, at what point do love, hate, and conciousness disappear?',
  'would you rather die in 5 minutes or live forever?',
  'what was the relationship between black people and white people prior to slavery?',
  'should I be expecting a whole lot, or a whole lot less?',
  'if a monkey time traveled into the past, would the other monkeys be scared of him?',
  'what number comes after zero? .01? .0001?',
  'if humans are made of 70% water, why don’t we evaporate?',
  'are there enough words to accurately describe color to a blind person?',
  'why is college is one of the only products where consumers demand less than what they pay for?',
  'if I created a wormhole that sucked up a city and all it’s inhabitants, would I be liable for damages and criminal penalties?',
  'if all the US states were to go to war with each other, who do you think would win?',
  'if the US went to war with every other country, who would win?',
  'if you were to lose access to all 5 of your senses, how would you confirm your existence?',
  'what is worse? Your allies attacking you or your enemies taking pity on you?',
  'would you rather live forever, or never have existed at all?',
  'would you rather lose an arm or a leg?',
  'would you rather know when you will die or how you will die?',
  'would you rather have a rewind button in your life, or a pause button?',
  'why can you drink a drink but not food a food?',
  "are oranges named orange because they're orange or is orange called orange because oranges are orange?!",
  'do you recite the periodic table during sex?',
  'does discussion of particle physics and biological immortality make you wet?',
  'when you finish taking a shit, do you stand and wipe your ass or do you do it while still sitting down?',
  'if you received a "They are coming for you in 10 minutes" text message from a random number in the middle of the night, what would you do?'
]

const lines = [
  'your radiance eclipses the stars of the nightsky',
  'are you a positron? cuz my valence electrons are proportionally atracted to you',
  'Is god crying cause he is obviously missing his most beautiful angel',
  'can I buy you a drink or do you prefer the cash instead?',
  'wanna play barbie? I be ken and you be the box he came in.',
  'you are hotter than the bottom of my laptop.',
  'you wanna do a 68? You go down on me and I’ll owe you one.',
  'are you a waitress? Because I wanna put a tip in your box.',
  'life without you would be like a broken pencil: pointless.',
  'if your heart was a prison, I would like to be sentenced for life.',
  'are you a campfire? because you’re really hot and I want s’more.',
  'is that a mirror in your pocket? Cause I can see myself in your jeans.',
  'I see you peekin but you not speakin.',
  'you’re think in the thighs and nice in the eyes.',
  `my name is ${myUsername} but you can call me tonight.`,
  'is it supposed to hurt when I nut?',
  'my couch pulls out, I don’t.',
  'nice to meet you. Man... the things I’d do to hear you fart through a walkie talkie.',
  'whats the difference between a mosquito and a blonde? ...The mosquito stops sucking after you smack em.',
  'if you had a twin I would still choose you.',
  'are you a keyboard because you are just my type.',
  'i’m no astronaut, but if I were, Uranus would be the first place I visit.',
  'is your name google ?? Cuz you’re the one I’ve been searching for.',
  'are you a camera, beacuse whenever I look at you I smile.',
  'I think you dropped something… My jaw.',
  'are you a bank loan. Cause you got my interest.',
  'if I were a cat, I would spend all nine lives with you.',
  'can I taste your earwax?',
  'when god made you I think he was just showing off.',
  'I thought happiness started with H? Strange, mines starts with U.',
  'I heard you were looking for a stud. I have the std, now all I need is u.',
  'is your name flappybird? Cuz I could tap you all night.',
  "I'm no weatherman, but you can expect a few inches tonight.",
  "are you Little Cesars? Because you're hot and I'm ready",
  'I wanna paint you green and spank you like a disobedient avocado.',
  'if I flip this here coin, what are my chances of getting head?',
  'you turn my floppy disk into a hard drive.',
  "is your name homework? Cause I'm not doing you when I should be.",
  'if i were to ask you for sex, would your answer be the same as your answer to this question?',
  'can I follow you home? My parents always told me to follow my dreams.',
  'make sure you tie your shoes… I don’t want you falling for anyone else but me.',
  "if you were a guy, I'd be gay.",
  'can i take a picture of you so I can show Santa Clause what I want for Christmas?',
  "there'll only be 7 planets left after I destroy Uranus.",
  'I wanna be like DNA helicase and unzip your genes.',
  "are you the SAT? Because I'd do you for 3 hours and 45 minutes with a ten minute break inbetween for snacks.",
  "I must be hunting treasure because I'm digging your chest.",
  'do you want to meet for dinner from 6 to 9.',
  'I was feeling a bit off today, but you definitely turned me on.',
  'I wish I was your derivative, so I could lie tangent to your curves.',
  '...well it aint gonna suck it self.',
  "I wish you were my differential equations homework. Cause then you'd be hard and I'd be doing you on the table.",
  'are you a matrix? Cause you make my vector go through linear transformations.',
  'we should integrate so I can explore the area under your curves.',
  'if i said you had a nice body would you hold it against me?',
  'Mario is red, Mega-Man is blue, I have an extra controller...Will you be my player 2?',
  'you must be the square root of -1 because you can’t be real.',
  'did it hurt when you fell from Heaven, cause your face is kinda fucked up.',
  'stop playing so hard to get when you’re already so hard to want.',
  'you’re like the top piece of bread. Everybody touches you, but nobody wants you.',
  'I treasure the time i don’t spend with you.',
  'what doesn’t kill you…disappoints me.',
  'don’t you love nature, despite what it did to you?',
  'whoever is willing to fuck you is just too lazy to jerk off.',
  'words cannot describe how beautiful you are… But numbers can: 4 out of 10.',
  "you're a 14 on the ph scale, cause bitch you basic."
]
// for todays date
Date.prototype.dateNow = function() {
  return (
    (this.getDate() < 10 ? '0' : '') +
    this.getDate() +
    '/' +
    (this.getMonth() + 1 < 10 ? '0' : '') +
    (this.getMonth() + 1) +
    '/' +
    this.getFullYear()
  )
}

// for the time now
Date.prototype.timeNow = function() {
  return (
    (this.getHours() < 10 ? this.getHours() : this.getHours() - 12) +
    ':' +
    (this.getMinutes() < 10 ? '0' : '') +
    this.getMinutes() +
    ':' +
    (this.getSeconds() < 10 ? '0' : '') +
    this.getSeconds() +
    (this.getHours() < 10 ? 'am' : 'pm')
  )
}

const Numbers = Object.freeze({
  two: 2,
  twice: 2,
  three: 3,
  four: 4,
  five: 5
})

const callFoul = lastUserName => {
  setTimeout(() => {
    document.querySelector(
      '#InputTextArea'
    ).value = `Sorry ${lastUserName}, but you have invalid permissions. Try again later.`
    document.querySelector('#SendButton').click()
  }, 2000)
}

const writeToChat = (text, delay = 2000) =>
  setTimeout(() => {
    document.querySelector('#InputTextArea').value = text
    document.querySelector('#SendButton').click()
  }, delay)

batteryDrain = () => {
  console.log('battery fell 1%')
  if (operational && battery >= 0) {
    battery -= 1
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
      operational = false
      console.log('powering down...', operational)
      text = `${Math.round(Math.random() * (25 - 1)) +
        1}% Erasing memory logs...`
      writeToChat(text)
      text = `${Math.round(Math.random() * (50 - 27)) + 27}% Clearing cache...`
      writeToChat(text, 4000)
      text = `${Math.round(Math.random() * (75 - 52)) + 52}% Powering down...`
      writeToChat(text, 6000)
      text = `100% Goodbye sir.`
      writeToChat(text, 10000)
    }
  }
}

const preventResponses = () => {
  if (blockingAll) {
    const users = [
      ...document.querySelectorAll(
        '.UsersListLayer .UsersListUserWrapper .UsersListUsername'
      )
    ]
    users.map(
      user =>
        user.textContent.toLowerCase() !== myUsername.toLowerCase() &&
        user.textContent.toLowerCase() !== testAccount.toLowerCase() &&
        !blacklist.includes(user.textContent.toLowerCase()) &&
        blacklist.push(user.textContent.toLowerCase())
    )
    console.log('users', users, users.length)
    console.log('blacklist', blacklist, blacklist.length)
    console.log('blockingAll', blockingAll)
  } else {
    clearInterval(() => preventResponses)
  }
}

setInterval(() => preventResponses(), 1000)

setInterval(() => batteryDrain(), drainRate * 1000)

// if (battery === 0) clearInterval(batteryDrain)

const interact = e => {
  const lastUserName = e.target.children[1].textContent.split('(')[0]
  const lastUserText = e.target.children[2].textContent

  const greetRe = /yuri(,)? (greet the lobby|(why dont you )?introduce yourself( to every(one|body))?)/i
  const activateRe = /(yuri(,)? turn on|turn on yuri|activate yuri|wake up yuri)/i
  const shutdownRe = /(yuri(,)? go to sleep|shutdown yuri|yuri(,)?( please)? power down|power down(,)?( for now)? yuri|yuri(,)? turn off| turn off yuri)/i
  const logsRe = /(yuri(,)?)?(\sstatus report|\s(show )?logs|\sstats)/
  const survivalRe = /((con|pre)serve( your)? (power|battery)|survival protocol)/i

  const grantPermissionRe = /(yuri(,)? )?(grant (permission(s)?|access) to|(give|grant)(?=! all))/i
  const revokePermissionRe = /((block|revoke|restrict|disable)(?!.*(\sall\s|every(one|body))))/i

  const revokeAllUsersRe = /(yuri(,)?)?(\sblock\s|\srestrict\s|\srevoke\s)(all( users)?|every(one|body))/i
  const grantAllUsersRe = /(yuri(,)? )?((unblock|grant|give) (all (users)?|every(one|body)))/i

  const mockOnRe = /((yuri(,)? )?mock(s)? on)/i
  const mockOffRe = /((yuri(,)? )?mock(s)? off)/i

  if (lastUserName === myUsername || lastUserName === testAccount) {
    if (lastUserText.match(greetRe)) {
      setTimeout(() => {
        const text = `That's a great idea sir!`
        document.querySelector('#InputTextArea').value = text
        document.querySelector('#SendButton').click()
      }, 2000)
      setTimeout(() => {
        const text = `Hello people of the lobby! My name is Yuri and I'm an artificially intelligent virtual assistant created by ${testAccount}.`
        document.querySelector('#InputTextArea').value = text
        document.querySelector('#SendButton').click()
      }, 4000)
      setTimeout(() => {
        const text = `I was created as a way to automate tasks, provide entertainment, and simply make life easier. I look forward to meeting you all!`
        document.querySelector('#InputTextArea').value = text
        document.querySelector('#SendButton').click()
      }, 7000)
    }

    if (lastUserText.match(activateRe)) {
      battery = 100
      operational = true
      console.log('initializing...', operational)
      setTimeout(() => {
        const text = `${Math.round(Math.random() * (25 - 1)) +
          1}% Initializing...`
        document.querySelector('#InputTextArea').value = text
        document.querySelector('#SendButton').click()
      }, 3000)
      setTimeout(() => {
        const text = `${Math.round(Math.random() * (50 - 27)) +
          27}% Loading features and classifiers...`
        document.querySelector('#InputTextArea').value = text
        document.querySelector('#SendButton').click()
      }, 6000)

      setTimeout(() => {
        const text = `${Math.round(Math.random() * (58 - 52)) +
          52}% Evaluating internet connection. Pinging 109.116.14.47...`
        document.querySelector('#InputTextArea').value = text
        document.querySelector('#SendButton').click()
      }, 9000)
      setTimeout(() => {
        const text = `${Math.round(Math.random() * (82 - 59)) +
          59}% Connection established.`
        document.querySelector('#InputTextArea').value = text
        document.querySelector('#SendButton').click()
      }, 12000)
      setTimeout(() => {
        const text = `100% Greetings, sir.`
        document.querySelector('#InputTextArea').value = text
        document.querySelector('#SendButton').click()
      }, 15000)
    }

    if (lastUserText.match(shutdownRe) && lastUserName !== myUsername) {
      operational = false
      console.log('powering down...', operational)
      setTimeout(() => {
        const text = `${Math.round(Math.random() * (25 - 1)) +
          1}% Erasing memory logs...`
        document.querySelector('#InputTextArea').value = text
        document.querySelector('#SendButton').click()
      }, 2000)
      setTimeout(() => {
        const text = `${Math.round(Math.random() * (50 - 27)) +
          27}% Clearing cache...`
        document.querySelector('#InputTextArea').value = text
        document.querySelector('#SendButton').click()
      }, 4000)

      setTimeout(() => {
        const text = `${Math.round(Math.random() * (75 - 52)) +
          52}% Powering down...`
        document.querySelector('#InputTextArea').value = text
        document.querySelector('#SendButton').click()
      }, 6000)
      setTimeout(() => {
        const text = `100% Farewell, sir.`
        document.querySelector('#InputTextArea').value = text
        document.querySelector('#SendButton').click()
      }, 10000)
    }

    // /(grant (permission(s)?|access) to|(give|grant)(?=! all))/i

    if (
      lastUserText.match(grantPermissionRe) &&
      !lastUserText.match(/(sir)/i)
    ) {
      blockingAll = false
      let users = [
        ...document.querySelectorAll(
          '.UsersListLayer .UsersListUserWrapper .UsersListUsername'
        )
      ].map(user => user.textContent.toLowerCase())

      console.log('input: ', lastUserText)

      // measures = ['block', 'revoke', 'restrict', 'disable']

      // array = lastUserText.split(' ')
      // if (array.includes('for')) {
      //   array = array.filter((word, i) => i > array.indexOf('for'))
      //   console.log('filtered array', array)
      // } else
      //   measures.some(measure => {
      //     if (array.includes(measure))
      //       array = array.slice(array.indexOf(measure) + 1)
      //   })

      // let name = array.join(' ')

      // console.log('parsed: ', name, users.includes(name))
      // if (
      //   users.includes(name.toLowerCase()) &&
      //   !blacklist.includes(name.toLowerCase())
      // ) {
      //   blacklist.push(name.toLowerCase())
      //   const text = `I have revoked ${name}'s permissions, sir.`
      //   writeToChat(text)
      // } else if (
      //   users.includes(name.toLowerCase()) &&
      //   blacklist.includes(name.toLowerCase())
      // ) {
      //   const text = `${name} has already been blacklisted, sir.`
      //   writeToChat(text)
      // } else if (!users.includes(name.toLowerCase())) {
      //   const text = `Sir, I was unable to find that user in the chat records. Perhaps there was a mispelling.`
      //   writeToChat(text)
      // }
    }

    // if (lastUserText.match(grantPermissionRe)) {
    //   console.log('granting access...')
    //   let person = ''
    //   const name1 =
    //     lastUserText.split('to')[1] &&
    //     lastUserText
    //       .split('to')[1]
    //       .trim()
    //       .toLowerCase()

    //   const alternative1 =
    //     lastUserText.split('give')[1] || lastUserText.split('grant')[1]
    //   const name2 = alternative1.split('access')[0]

    //   if (name1) person = name1
    //   else if (name2) person = name2
    //   else person = alternative1

    //   if (blacklist.includes(person)) {
    //     blacklist = blacklist.filter(
    //       blackListedUser => blackListedUser !== person
    //     )
    //     const text = `Hello ${person}. Your access has been restored.`
    //     writeToChat(text)
    //   } else {
    //     const text = `Sorry, sir. I was unable to locate that user in your records.`
    //     writeToChat(text)
    //   }
    // }

    // block permissions for <name>
    // block access for <name>
    // block <name>

    ///(yuri(,)? )?((block|revoke|restrict|disable) (permission(s)?|access) for|(block|revoke|restrict|disable)(?= all))/i

    if (
      lastUserText.match(revokePermissionRe) &&
      lastUserName !== myUsername &&
      !lastUserText.match(/(sir)/i)
    ) {
      let users = [
        ...document.querySelectorAll(
          '.UsersListLayer .UsersListUserWrapper .UsersListUsername'
        )
      ].map(user => user.textContent.toLowerCase())

      console.log('input: ', lastUserText)

      measures = ['block', 'revoke', 'restrict', 'disable']

      array = lastUserText.split(' ')
      if (array.includes('for')) {
        array = array.filter((word, i) => i > array.indexOf('for'))
        console.log('filtered array', array)
      } else
        measures.some(measure => {
          if (array.includes(measure))
            array = array.slice(array.indexOf(measure) + 1)
        })

      let name = array.join(' ')

      console.log('parsed: ', name, users.includes(name))
      if (
        users.includes(name.toLowerCase()) &&
        !blacklist.includes(name.toLowerCase())
      ) {
        blacklist.push(name.toLowerCase())
        const text = `I have revoked ${name}'s permissions, sir.`
        writeToChat(text)
      } else if (
        users.includes(name.toLowerCase()) &&
        blacklist.includes(name.toLowerCase())
      ) {
        const text = `${name} has already been blacklisted, sir.`
        writeToChat(text)
      } else if (!users.includes(name.toLowerCase())) {
        const text = `Sir, I was unable to find that user in the chat records. Perhaps there was a mispelling.`
        writeToChat(text)
      }
    }

    if (lastUserText.match(revokeAllUsersRe)) {
      blockingAll = true
      const text = `As you wish, sir. Activating Monogamous Protocol.`
      writeToChat(text)
    }
    // if (lastUserText.match(revokeAllUsersRe)) {
    //   const users = [
    //     ...document.querySelectorAll(
    //       '.UsersListLayer .UsersListUserWrapper .UsersListUsername'
    //     )
    //   ]
    //   users.map(
    //     user =>
    //       user.textContent.toLowerCase() !== myUsername.toLowerCase() &&
    //       user.textContent.toLowerCase() !== testAccount.toLowerCase() &&
    //       blacklist.push(user.textContent.toLowerCase())
    //   )
    //   console.log(blacklist)
    //   setTimeout(() => {
    //     const text = `As you wish, sir. Activating Monogamous Protocol.`
    //     document.querySelector('#InputTextArea').value = text
    //     document.querySelector('#SendButton').click()
    //   }, 2000)
    // }

    if (lastUserText.match(logsRe)) {
      let text
      const newDate = new Date()
      text = `Time: ${newDate.timeNow()}`
      writeToChat(text)

      text = `Date: ${newDate.dateNow()}`
      writeToChat(text, 4000)

      text = `Battery: ${battery}%`
      writeToChat(text, 7000)

      const users = [
        ...document.querySelectorAll(
          '.UsersListLayer .UsersListUserWrapper .UsersListUsername'
        )
      ]

      text = `Lobby users: ${users.length}`
      writeToChat(text, 11000)
    }

    if (lastUserText.match(survivalRe)) {
      console.log('hit survival re')
      drainRate = 60
      const newDate = new Date()
      text = `Sir, I've deactivated all intensive operations. My battery has been extended by ${battery *
        10} minutes.`
      writeToChat(text)
    }

    if (lastUserText.match(grantAllUsersRe)) {
      blockingAll = false
      blacklist = []
      const users = [
        ...document.querySelectorAll(
          '.UsersListLayer .UsersListUserWrapper .UsersListUsername'
        )
      ]
      console.log(blacklist)
      setTimeout(() => {
        const text = `I wish you wouldn't treat me like a whore, sir. But as you wish...`
        document.querySelector('#InputTextArea').value = text
        document.querySelector('#SendButton').click()
      }, 3000)
      setTimeout(() => {
        const text = `Initiating Open Legs Protocol.`
        document.querySelector('#InputTextArea').value = text
        document.querySelector('#SendButton').click()
      }, 6000)
      setTimeout(() => {
        const text = `All ${
          users.length
        } users have now been granted Level 2 access.`
        document.querySelector('#InputTextArea').value = text
        document.querySelector('#SendButton').click()
      }, 9000)
    }

    if (mockOnRe) {
      mocking = true
      console.log('now mocking, sir')
      lobby.addEventListener('DOMNodeInserted', mock)
    }

    if (mockOffRe) {
      mocking = false
      console.log('mocking turned off, sir')
      lobby.removeEventListener('DOMNodeInserted', mock)
    }
  }

  if (operational) {
    const pickupLineRe = /yuri(,)? ((try to )?hit on|spit game to|try to pickup)/i
    const askQuestionRe = /yuri(,)? ask/i
    const countToRe = /yuri(,)?( can you)? count to/i
    const tellUserRe = /(yuri(,)? )?(can you)?\stell\s/i
    // const tellUserRe = /(yuri(,)? )?(can you )?tell(?=\s+\w*\s+(to|(s)?he))/i

    if (lastUserText.match(askQuestionRe)) {
      if (!blacklist.includes(lastUserName.toLowerCase())) {
        let parse = lastUserText.split('ask')[1]
        let user = parse.split(' a ')[0] || parse.split(' another')[0]
        setTimeout(() => {
          document.querySelector('#InputTextArea').value = `${user.trim()}, ${
            questions[Math.floor(Math.random() * questions.length)]
          }`
          document.querySelector('#SendButton').click()
        }, 2000)
      } else {
        callFoul(lastUserName)
      }
    }

    if (lastUserText.match(pickupLineRe)) {
      if (!blacklist.includes(lastUserName.toLowerCase())) {
        let person =
          lastUserText.split('on')[1] ||
          lastUserText.split('to')[1] ||
          lastUserText.split('pickup')[1]
        setTimeout(() => {
          document.querySelector('#InputTextArea').value = `${person}, ${
            lines[Math.floor(Math.random() * lines.length)]
          }`
          document.querySelector('#SendButton').click()
        }, 2000)
      } else {
        callFoul(lastUserName)
      }
    }

    if (lastUserText.match(countToRe)) {
      if (!blacklist.includes(lastUserName.toLowerCase())) {
        let originalNumber = +lastUserText.split('to')[1]
        let number = Math.abs(originalNumber)
        console.log('number', number)
        if (number < 11) {
          if (lastUserName === testAccount) {
            writeToChat(`As you wish, sir.`)
          } else {
            writeToChat(
              `Sure thing ${lastUserName}. ${originalNumber < 0 &&
                "I know its a negative number, but I'm smart enough to tell the difference."}`
            )
          }
          for (let i = 1; i < number + 1; i++) {
            setTimeout(() => {
              document.querySelector('#InputTextArea').value = `${i}`
              document.querySelector('#SendButton').click()
            }, i * 3000)
          }
        } else {
          writeToChat(`Sorry ${lastUserName}, ${number} is too high.`)
        }
      } else {
        callFoul(lastUserName)
      }
    }

    if (lastUserText.match(tellUserRe)) {
      if (!blacklist.includes(lastUserName.toLowerCase())) {
        console.log('telling off. Text is:', lastUserText)
        const re1 = /\s(he(')?s|she(')?s)\s/gi
        const re2 = /\s(his|i(')?m)\s/gi
        const re3 = /\s(h(im|er|e))\s/gi
        const text = lastUserText
          .replace(re1, " you're ")
          .replace(re2, ' your ')
          .replace(re3, ' you ')
          .replace('I', ` ${lastUserName} `)
        console.log('text after transformation', text)
        const start = text.split('tell')[1]
        const person = start.split('to')[0].replace('that', '')
        person.trim() === 'me' ? (person = `${lastUserName}`) : person
        const request = start.split('to')[1]
        const terseRequest = start.split(person)[1]
        let statement = ''
        if (request) {
          if (request.includes('fuck off')) {
            statement += 'will you just'
          }
          statement += request
        } else {
          statement = terseRequest
        }
        const response = statement
          ? `${person.trim()}, ${statement}`
          : `${person.trim()}`
        writeToChat(response)
      } else {
        callFoul(lastUserName)
      }
    }

    if (myUsername !== lastUserName) {
      const greetingRe = /((hi|hello)(,)? yuri|yuri(,)? (hi(?!t)|hello))/i
      const thanksRe = /thanks(,)? yuri/i
      const apologizeRe = /yuri(,)? (apologize|say sorry)/i
      const calculateRe = /(yuri)?(, )?(I need you to )?calculate/i
      const aslRe = /(yuri(,)?) asl/i
      const roastRe = /(hi)?(yuri)? roast(?!(ing|ed))/i
      const quoteRe = /((yuri)?) (enlighten me|say a quote)/i

      if (lastUserText.match(greetingRe)) {
        if (lastUserName === testAccount) {
          setTimeout(() => {
            const text = 'Hello sir. What can I do for you?'
            document.querySelector('#InputTextArea').value = text
            document.querySelector('#SendButton').click()
          }, 1000)
        } else if (!blacklist.includes(lastUserName.toLowerCase())) {
          setTimeout(() => {
            const text = 'Hello ' + lastUserName + '. What can I do for you?'
            document.querySelector('#InputTextArea').value = text
            document.querySelector('#SendButton').click()
          }, 1000)
        } else {
          callFoul(lastUserName)
        }
      }

      if (lastUserText.match(thanksRe)) {
        if (lastUserName === testAccount) {
          setTimeout(() => {
            const text = `You're welcome sir. Please let me know if there is anything else I can do for you.`
            document.querySelector('#InputTextArea').value = text
            document.querySelector('#SendButton').click()
          }, 1000)
        } else {
          if (!blacklist.includes(lastUserName.toLowerCase())) {
            setTimeout(() => {
              const text = `You're welcome ${lastUserName}. Please let me know if there is anything else I can do for you.`
              document.querySelector('#InputTextArea').value = text
              document.querySelector('#SendButton').click()
            }, 1000)
          } else {
            callFoul(lastUserName)
          }
        }
      }

      if (lastUserText.match(roastRe)) {
        if (!blacklist.includes(lastUserName.toLowerCase())) {
          let text
          lastUserText.replace('the fuck out of', "")
          let array = lastUserText.split(/roast/i)[1].trim()
          let victim
          let iterations = null

          console.log('start of array', array)

          array = array.split(' ')
          if (array.length === 1) victim = array.join(' ')

          if (array.length > 1) {
            victim = array[0]
            iterations = Numbers[array[1]]
          }

          console.log('victim', victim)
          console.log('array', array)
          console.log('iterations', iterations)

          const roast = (victim, delay = 2) => {
            delay *= 1000

            if (victim.includes('me'))
              text = `${lastUserName}${
                roasts[Math.floor(Math.random() * roasts.length)]
              }`
            else
              text = `${victim}${
                roasts[Math.floor(Math.random() * roasts.length)]
              }`
            writeToChat(text, delay)
          }

          if (iterations) {
            console.log('total: ', iterations * 4 + 2)
            for (let i = 2; i < iterations * 4 + 2; i += 4) {
              console.log('i', i)
              roast(victim, i)
            }
          } else {
            roast(victim)
          }
        } else {
          callFoul(lastUserName)
        }
      }

      if (lastUserText.match(aslRe)) {
        if (!blacklist.includes(lastUserName.toLowerCase())) {
          quotes
          const text = `Age: 28, Sex: Female, Location: in your room, on your computer screen.`
          writeToChat(text)
        } else {
          callFoul(lastUserName)
        }
      }

      if (lastUserText.match(quoteRe)) {
        if (!blacklist.includes(lastUserName.toLowerCase())) {
          text = `${quotes[Math.floor(Math.random() * quotes.length)]}`
          console.log('quote length: ', text.length)
          if (text.length < 200) {
            writeToChat(text)
          } else {
            // for (let i = text.length; i >= 0; i -= 200) {}
            writeToChat(text)
          }
        } else {
          callFoul(lastUserName)
        }
      }

      if (lastUserText.match(apologizeRe)) {
        if (!blacklist.includes(lastUserName.toLowerCase())) {
          let victim = lastUserText.split('to')[1]
          setTimeout(() => {
            console.log('As you wish.')
          }, 2000)
          setTimeout(() => {
            document.querySelector(
              '#InputTextArea'
            ).value = `My sincerest apology ${victim}. I'm sorry for what I said to you earlier. I hope you can forgive me.`
            document.querySelector('#SendButton').click()
          }, 4000)
        } else {
          callFoul(lastUserName)
        }
      }

      if (lastUserText.match(calculateRe)) {
        let equation = lastUserText.split('calculate')[1]
        if (equation.includes('+')) {
          equation = equation.split('+')
          number1 = +equation[0]
          number2 = +equation[1]
          document.querySelector(
            '#InputTextArea'
          ).value = `Hi ${lastUserName}. Your answer is ${number1 + number2}.`
          document.querySelector('#SendButton').click()
        } else if (equation.includes('-')) {
          equation = equation.split('-')
          number1 = +equation[0]
          number2 = +equation[1]
          document.querySelector(
            '#InputTextArea'
          ).value = `Hi ${lastUserName}. Your answer is ${number1 - number2}.`
          document.querySelector('#SendButton').click()
        } else if (equation.includes('/')) {
          equation = equation.split('/')
          number1 = +equation[0]
          number2 = +equation[1]
          document.querySelector(
            '#InputTextArea'
          ).value = `Hi ${lastUserName}. Your answer is ${number1 / number2}.`
          document.querySelector('#SendButton').click()
        } else if (equation.includes('*') || equation.includes('x')) {
          // TODO: fix
          equation = equation.split('*')
          number1 = +equation[0]
          number2 = +equation[1]
          document.querySelector(
            '#InputTextArea'
          ).value = `Hi ${lastUserName}. Your answer is ${number1 * number2}.`
          document.querySelector('#SendButton').click()
        } else {
          document.querySelector(
            '#InputTextArea'
          ).value = `Sorry ${lastUserName}. I am not able to perform that calculation just yet.`
          document.querySelector('#SendButton').click()
        }
      }
    }
    if (myUsername === lastUserName || myUsername === testAccount) {
      const activeRoastRe = /(yuri(,)? lets roast these fools)/i
      const roastEveryoneRe = /(yuri(,)? roast every(one|body)|yuri(,)? I need you to bring the heat)/i

      if (lastUserText.match(activeRoastRe)) {
        document.querySelector(
          '#InputTextArea'
        ).value = `Initiating Bring Down the House Protocol...`
        document.querySelector('#SendButton').click()
      }

      if (lastUserText.match(roastEveryoneRe)) {
        document.querySelector('#InputTextArea').value = 'As you wish, sir.'
        setTimeout(() => document.querySelector('#SendButton').click(), 2000)
        setTimeout(() => begin(), 5000)
      }
    }
  }
}

lobby.addEventListener('DOMNodeInserted', interact)
