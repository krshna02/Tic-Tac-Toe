document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn");
  const msgContainer = document.querySelector(".msg-container");
  const msg = document.querySelector(".msg");
  const newGamebtn = document.querySelector(".new-btn");
  const resetGamebtn = document.querySelector(".reset-btn");
  const turnIndicator = document.getElementById("turn-indicator");
  const playerModal = document.getElementById("player-modal");
  const modalBox = document.getElementById("modal-box");
  const startBtn = document.getElementById("start-game");
  const p1Input = document.getElementById("player1");
  const p2Input = document.getElementById("player2");
  const themeBtn = document.getElementById("theme-toggle");
  const gameBoard = document.getElementById("game-board");

  let player1Name = "", player2Name = "", turnO = true, count = 0;
  const winpttrns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const disabledbtns = () => buttons.forEach(b => b.disabled = true);
  const enabledbtns = () => buttons.forEach(b => {
    b.disabled = false;
    b.innerText = "";
    b.style.background = "#f5c542";
  });

  const updateTurnIndicator = () => {
    turnIndicator.classList.remove("hidden");
    turnIndicator.textContent = turnO ? `Turn: ${player1Name}` : `Turn: ${player2Name}`;
    turnIndicator.style.color = turnO ? "#4da6ff" : "#ff4d4d";
  };

  const highlightWinningCells = (pattern) => {
    pattern.forEach(i => {
      buttons[i].style.background = "#00e676";
      buttons[i].style.boxShadow = "0 0 15px #00e676";
    });
  };

  const showWinner = (winner, pattern) => {
    msg.innerText = `🎉 ${winner} Wins!`;
    msgContainer.classList.remove("hidden");
    highlightWinningCells(pattern);
    disabledbtns();
    turnIndicator.textContent = `${winner} Won 🏆`;
  };

  const gameDraw = () => {
    msg.innerText = "😐 It's a Draw!";
    msgContainer.classList.remove("hidden");
    disabledbtns();
    turnIndicator.textContent = "It's a Draw!";
  };

  const checkWinner = () => {
    for (let pattern of winpttrns) {
      const [a, b, c] = pattern;
      const val1 = buttons[a].innerText, val2 = buttons[b].innerText, val3 = buttons[c].innerText;
      if (val1 && val1 === val2 && val2 === val3) {
        const winner = val1 === "O" ? player1Name : player2Name;
        showWinner(winner, pattern);
        return true;
      }
    }
    return false;
  };

  const resetgame = () => {
    turnO = true;
    count = 0;
    enabledbtns();
    msgContainer.classList.add("hidden");
    updateTurnIndicator();
  };

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.innerText = turnO ? "O" : "X";
      btn.style.color = turnO ? "#4da6ff" : "#ff4d4d";
      btn.disabled = true;
      turnO = !turnO;
      count++;
      const isWinner = checkWinner();
      if (count === 9 && !isWinner) gameDraw();
      if (!isWinner) updateTurnIndicator();
    });
  });

  newGamebtn.addEventListener("click", resetgame);
  resetGamebtn.addEventListener("click", resetgame);

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    themeBtn.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
  });

  const startGame = () => {
    const p1 = p1Input.value.trim();
    const p2 = p2Input.value.trim();
    if (!p1 || !p2) return alert("Please enter both player names!");
    player1Name = p1;
    player2Name = p2;
    playerModal.classList.add("hidden");
    gameBoard.classList.remove("hidden");
    updateTurnIndicator();
  };

  startBtn.addEventListener("click", startGame);
  [p1Input, p2Input].forEach(input => {
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") startGame();
    });
  });
});
