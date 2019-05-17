/*
com.echat.shared.chatroom.Controller
  .isModerator
  .countUsers()                     // 173
  .getChatroomStub()
    .ownerUuid()                    // ie: 91fa549a-898e-4619-9cd6-a6b871707c70
  .modifyUserContextIfModerator()   // ?
*/

// let imgs = $(`#divImage p img`)
// imgs = [...imgs]
// let containers = $(`#divImage p`)

// let anchors = imgs.map((i, img) => {
//   console.log('img', img)
//   let link = document.createElement('a')
//   link.href = `${img.src}`
//   link.download = `true`
//   console.log('link', link)
//   containers[i].appendChild(link)
// })

// mock user
let mock = false;
let append = "";
const writeToChat = (text, delay = 500) =>
  setTimeout(() => {
    document.querySelector("#InputTextArea").value = text;
    document.querySelector("#SendButton").click();
  }, delay);

const mockUser = e => {
  const me = document.querySelector("#HeaderUsername").textContent;
  const username = e.target.children[1].textContent.split("(")[0];
  let text = append + e.target.children[2].textContent;
  if (username !== me && text.includes("append")) {
    const intro = text.split("append")[1];
    append = intro;
  }
  if (username === me && text.match(/\bon/)) {
    mock = true;
    console.log("mock set to true.");
  }
  if (username === me && text.match(/\boff/)) {
    mock = false;
    console.log("mock set to false.");
  }
  if (username !== me && mock) writeToChat(text);
};

const lobby = document.querySelector("#ChatroomChatBox");
lobby.addEventListener("DOMNodeInserted", mockUser);

// --------------

// reverse user text
let mock = false;
let append = "";
const writeToChat = (text, delay = 500) =>
  setTimeout(() => {
    document.querySelector("#InputTextArea").value = text;
    document.querySelector("#SendButton").click();
  }, delay);

const mockUser = e => {
  const me = document.querySelector("#HeaderUsername").textContent;
  const username = e.target.children[1].textContent.split("(")[0];
  let string = e.target.children[2].textContent.split(" ");
  let text = string.reverse().join(" ");
  if (username === me && text.match(/\bon/)) mock = true;
  if (username === me && text.match(/\boff/)) mock = false;
  if (username !== me && mock) writeToChat(text);
};

const lobby = document.querySelector("#ChatroomChatBox");
lobby.addEventListener("DOMNodeInserted", mockUser);

// -----------

// lindros bot
let mock = false;
let append = "";
const writeToChat = (text, delay = 2000) =>
  setTimeout(() => {
    document.querySelector("#InputTextArea").value = text;
    document.querySelector("#SendButton").click();
  }, delay);

const mockUser = e => {
  const me = document.querySelector("#HeaderUsername").textContent;
  const username = e.target.children[1].textContent.split("(")[0];
  let text = e.target.children[2].textContent;

  console.log("word count: ", text.split(" ").length);

  if (username === me && text.match(/\bon/)) mock = true;
  if (username === me && text.match(/\boff/)) mock = false;
  // if (username !== me && mock) writeToChat(text)
  if (username === "Lindros" && !text.includes("?"))
    text = `I agree... ${text}`;
  if (username === "Lindros" && text.match(/\?$/gi))
    text = "That's a good question.";
  if (username === "Lindros" && text.split(" ").length > 5) writeToChat(text);
};

const lobby = document.querySelector("#ChatroomChatBox");
lobby.addEventListener("DOMNodeInserted", mockUser);

// -----------

const bot = async () => {
  // compromise.js
  await $.getScript(
    "https://unpkg.com/compromise@latest/builds/compromise.min.js"
  );

  // contrarian bot
  let mock = false;
  let append = "";
  const writeToChat = (text, delay = 1000) =>
    setTimeout(() => {
      document.querySelector("#InputTextArea").value = text;
      document.querySelector("#SendButton").click();
    }, delay);

  const mockUser = e => {
    const me = document.querySelector("#HeaderUsername").textContent;
    const username = e.target.children[1].textContent.split("(")[0];
    let text = e.target.children[2].textContent;
    console.log("text", text);
    text = nlp(text)
      .sentences(0)
      .toNegative()
      .out("text");

    console.log("negation", text);
    // console.log('word count: ', text.split(' ').length)

    if (username === me && text.match(/\bon/)) mock = true;
    if (username === me && text.match(/\boff/)) mock = false;
    if (username !== me && mock) writeToChat(text);
    // if (username === 'Lindros' && !text.includes('?')) text = `I agree... ${text}`
    // if (username === 'Lindros' && text.match(/\?$/ig)) text = 'That\'s a good question.'
    // if (username === 'Lindros' && text.split(' ').length > 5) writeToChat(text)
  };

  const lobby = document.querySelector("#ChatroomChatBox");
  lobby.addEventListener("DOMNodeInserted", mockUser);
};
bot();
