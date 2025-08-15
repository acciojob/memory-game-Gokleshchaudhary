document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const startBtn = document.getElementById("start-btn");
  const resetBtn = document.getElementById("reset-btn");
  const gameContainer = document.querySelector(".game-container");
  const cellsContainer = document.querySelector(".cells_container");

  // Game Variables
  let attempts = 0;
  let matchesFound = 0;
  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let totalPairs = 0;

  // Event Listeners
  startBtn.addEventListener("click", startGame);
  resetBtn.addEventListener("click", resetGame);

  function startGame() {
    const selectedLevel = document.querySelector(
      'input[name="level"]:checked'
    ).value;

    // Set pairs based on difficulty
    if (selectedLevel === "easy") totalPairs = 4;
    else if (selectedLevel === "normal") totalPairs = 8;
    else totalPairs = 16;

    setupGame(totalPairs);
    document.querySelector(".levels_container").classList.add("hidden");
    gameContainer.classList.remove("hidden");
    attempts = 0;
    matchesFound = 0;
    updateStats();
  }

  function setupGame(pairs) {
    cellsContainer.innerHTML = "";
    let numbers = [];

    // Generate pairs
    for (let i = 1; i <= pairs; i++) {
      numbers.push(i, i);
    }

    // Shuffle numbers
    numbers = numbers.sort(() => Math.random() - 0.5);

    // Set grid size
    const gridSize =
      pairs === 4
        ? "repeat(4, 1fr)"
        : pairs === 8
        ? "repeat(4, 1fr)"
        : "repeat(8, 1fr)";
    cellsContainer.style.gridTemplateColumns = gridSize;

    // Create cards
    numbers.forEach((num, index) => {
      const card = document.createElement("div");
      card.className = "cell";
      card.dataset.number = num;
      card.addEventListener("click", flipCard);
      cellsContainer.appendChild(card);
    });
  }

  function flipCard() {
    if (lockBoard || this === firstCard || this.classList.contains("matched"))
      return;

    this.classList.add("flipped");
    this.textContent = this.dataset.number;

    if (!firstCard) {
      firstCard = this;
      return;
    }

    secondCard = this;
    lockBoard = true;
    attempts++;
    updateStats();

    checkForMatch();
  }

  function checkForMatch() {
    const isMatch = firstCard.dataset.number === secondCard.dataset.number;

    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matchesFound++;
    updateStats();

    if (matchesFound === totalPairs) {
      setTimeout(
        () => alert(`Congratulations! You won in ${attempts} attempts!`),
        500
      );
    }

    resetBoard();
  }

  function unflipCards() {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard.textContent = "";
      secondCard.textContent = "";
      resetBoard();
    }, 1000);
  }

  function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
  }

  function updateStats() {
    document.getElementById("attempts").textContent = attempts;
    document.getElementById("matches").textContent = matchesFound;
  }

  function resetGame() {
    cellsContainer.innerHTML = "";
    gameContainer.classList.add("hidden");
    document.querySelector(".levels_container").classList.remove("hidden");
  }
});
