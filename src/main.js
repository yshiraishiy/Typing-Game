const word = document.getElementById("word");
const text = document.getElementById("text");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

let words = ["a", "b", "c"];

async function fetchWords(wordLength) {
  const res = await fetch(
    `https://api.datamuse.com/words?sp=${"?".repeat(wordLength)}&max=50`
  );
  const data = await res.json();
  const word = data.map((item) => {
    return item.word;
  });
  words = word;
}

fetchWords(6);

// 単語を初期化
let randomWord;

// スコアを初期化
let score = 0;

// タイムを初期化
let time = 10;

// 配列からランダムな単語を生成
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// DOMに単語を追加
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// スコアを更新
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

addWordToDOM();

// イベントリスナー
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    e.target.value = "";
  }
});
