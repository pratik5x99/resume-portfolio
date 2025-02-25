// script.js
const words = {
  beginner: [
      "apple", "banana", "orange", "grape", "melon", "mango", "peach", "pear", "berry", "plum",
      "table", "chair", "pencil", "paper", "bottle", "window", "flower", "garden", "cloud", "rain",
      "summer", "winter", "spring", "autumn", "happy", "smile", "jump", "run", "walk", "dance",
      "school", "teacher", "student", "classroom", "blackboard", "chalk", "eraser", "homework", "exam", "lesson",
      "family", "mother", "father", "brother", "sister", "cousin", "aunt", "uncle", "grandfather", "grandmother",
      "dog", "cat", "rabbit", "fish", "turtle", "parrot", "elephant", "lion", "tiger", "giraffe",
      "book", "story", "author", "library", "page", "cover", "chapter", "title", "sentence", "word",
      "computer", "mouse", "keyboard", "screen", "monitor", "internet", "website", "email", "password", "login",
      "music", "song", "guitar", "piano", "drum", "violin", "flute", "trumpet", "saxophone", "microphone",
      "food", "bread", "butter", "cheese", "pizza", "burger", "pasta", "rice", "noodle", "salad",
      "city", "village", "country", "road", "bridge", "river", "lake", "mountain", "forest", "desert",
      "friend", "neighbor", "colleague", "boss", "team", "partner", "companion", "group", "club", "community"
  ],
  pro: [
      "algorithm", "javascript", "function", "variable", "developer", "frontend", "backend", "asynchronous", "execution", "framework",
      "database", "server", "client", "architecture", "deployment", "authentication", "authorization", "encryption", "compression", "serialization",
      "optimization", "performance", "scalability", "availability", "latency", "throughput", "debugging", "refactoring", "inheritance", "polymorphism",
      "abstraction", "encapsulation", "interface", "implementation", "dependency", "repository", "iteration", "recursion", "dynamic", "static",
      "protocol", "request", "response", "timeout", "exception", "handler", "middleware", "container", "orchestration", "virtualization",
      "operating", "system", "compiler", "interpreter", "syntax", "semantic", "parsing", "lexical", "transpiler", "bytecode",
      "testing", "integration", "unit", "mocking", "automation", "continuous", "deployment", "pipeline", "repository", "versioning",
      "encryption", "decryption", "hashing", "cipher", "security", "firewall", "authentication", "authorization", "penetration", "audit",
      "networking", "protocol", "tcp", "udp", "http", "https", "dns", "ip", "subnet", "firewall",
      "containerization", "docker", "kubernetes", "load", "balancer", "cloud", "serverless", "database", "nosql", "sql"
  ]
};

let timeLeft = 0;
let wordCount = 0;
let timer;

const timeSelect = document.getElementById("time");
const difficultySelect = document.getElementById("difficulty");
const startBtn = document.getElementById("start-btn");
const wordDisplay = document.getElementById("word-display");
const wordInput = document.getElementById("word-input");
const timeLeftSpan = document.getElementById("time-left");
const wordCountSpan = document.getElementById("word-count");
const wpmSpan = document.getElementById("wpm");
const gameContainer = document.querySelector(".game");

startBtn.addEventListener("click", startGame);
wordInput.addEventListener("input", checkWord);

function startGame() {
  const selectedTime = parseInt(timeSelect.value);
  const difficulty = difficultySelect.value;
  timeLeft = selectedTime;
  wordCount = 0;
  wordInput.value = "";
  wordInput.disabled = false;
  wordInput.focus();
  gameContainer.style.display = "block";
  timeLeftSpan.textContent = timeLeft;
  wordCountSpan.textContent = wordCount;
  wpmSpan.textContent = 0;
  generateWord(difficulty);
  clearInterval(timer);
  timer = setInterval(updateTime, 1000);
}

function generateWord(difficulty) {
  const wordList = words[difficulty];
  const randomIndex = Math.floor(Math.random() * wordList.length);
  wordDisplay.textContent = wordList[randomIndex];
}

function checkWord() {
  if (wordInput.value.trim() === wordDisplay.textContent) {
      wordCount++;
      wordCountSpan.textContent = wordCount;
      wordInput.value = "";
      generateWord(difficultySelect.value);
  }
}

function updateTime() {
  if (timeLeft > 0) {
      timeLeft--;
      timeLeftSpan.textContent = timeLeft;
  } else {
      clearInterval(timer);
      wordInput.disabled = true;
      const wpm = Math.round((wordCount / parseInt(timeSelect.value)) * 60);
      wpmSpan.textContent = wpm;
  }
}
