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

// ゲームの開始時に'input'要素にフォーカス
text.focus();

// カウントダウンを開始
const timeInterval = setInterval(updateTime, 1000);

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

// 時間を更新
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    // ゲームを終了
    gameOver();
  }
}

// ゲームを終了し画面を表示
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = "flex";
}

addWordToDOM();

// イベントリスナー
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    e.target.value = "";

    time += 5;

    updateTime();
  }
});
