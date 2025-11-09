document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementById("game-board");
  const grid = document.querySelector(".game");
  const template = document.getElementById("cell-template");
  for (let i = 0; i < 9; i++) grid.appendChild(template.content.cloneNode(true));

  const buttons = document.querySelectorAll(".btn");
  const msgContainer = document.querySelector(".msg-container");
  const msg = document.querySelector(".msg");
  const newGamebtn = document.querySelector(".new-btn");
  const resetGamebtn = document.querySelector(".reset-btn");
  const turnIndicator = document.getElementById("turn-indicator");
  const themeBtn = document.getElementById("theme-toggle");
  const playerModal = document.getElementById("player-modal");
  const modalBox = document.getElementById("modal-box");
  const startBtn = document.getElementById("start-game");
  const p1Input = document.getElementById("player1");
  const p2Input = document.getElementById("player2");

  let player1Name = "", player2Name = "", turnO = true, count = 0;
  const winpttrns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

  const disabledbtns = () => buttons.forEach(b => b.disabled = true);
  const enabledbtns = () => buttons.forEach(b => {
    b.disabled = false;
    b.innerText = "";
    b.classList.remove("bg-green-400", "shadow-[0_0_20px_6px_rgba(72,255,0,0.6)]", "text-blue-600", "text-red-600");
  });

  const updateTurnIndicator = () => {
    turnIndicator.classList.remove("hidden");
    if (turnO) {
      turnIndicator.textContent = `Turn: ${player1Name}`;
      turnIndicator.className = "text-2xl mb-5 font-semibold text-blue-400 animate-pulse";
    } else {
      turnIndicator.textContent = `Turn: ${player2Name}`;
      turnIndicator.className = "text-2xl mb-5 font-semibold text-red-400 animate-pulse";
    }
  };

  const highlightWinningCells = pattern => pattern.forEach(i => 
    buttons[i].classList.add("bg-green-400", "shadow-[0_0_20px_6px_rgba(72,255,0,0.6)]")
  );
  
  const showWinner = (winner, pattern) => {
    msg.innerText = `🎉 ${winner} Wins!`;
    msgContainer.classList.remove("hidden");
    highlightWinningCells(pattern);
    disabledbtns();
    turnIndicator.textContent = `${winner} Won 🏆`;
    turnIndicator.className = "text-2xl mb-5 font-semibold text-green-400";
  };

  const gameDraw = () => {
    msg.innerText = "😐 It's a Draw!";
    msgContainer.classList.remove("hidden");
    disabledbtns();
    turnIndicator.textContent = "It's a Draw!";
    turnIndicator.className = "text-2xl mb-5 font-semibold text-yellow-300";
  };

  const checkWinner = () => {
    for (let pattern of winpttrns) {
      const [a,b,c] = pattern;
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
    turnO = true; count = 0; enabledbtns(); msgContainer.classList.add("hidden"); updateTurnIndicator();
  };

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (turnO) { btn.innerText = "O"; btn.classList.add("text-blue-600"); turnO = false; }
      else { btn.innerText = "X"; btn.classList.add("text-red-600"); turnO = true; }
      btn.disabled = true; count++;
      const isWinner = checkWinner();
      if (count === 9 && !isWinner) gameDraw();
      if (!isWinner) updateTurnIndicator();
    });
  });

  newGamebtn.addEventListener("click", resetgame);
  resetGamebtn.addEventListener("click", resetgame);

  themeBtn.addEventListener("click", () => {
    const body = document.body;
    const isDark = body.classList.toggle("bg-white");
    body.classList.toggle("bg-gradient-to-br");
    body.classList.toggle("from-gray-800");
    body.classList.toggle("via-gray-900");
    body.classList.toggle("to-black");
    body.classList.toggle("text-black");
    themeBtn.textContent = isDark ? "☀️" : "🌙";
  });

  const startGame = () => {
    const p1 = p1Input.value.trim();
    const p2 = p2Input.value.trim();
    if (!p1 || !p2) return alert("Please enter both player names!");

    player1Name = p1; player2Name = p2;
    modalBox.classList.add("opacity-0", "translate-y-10", "scale-95");
    setTimeout(() => { playerModal.classList.add("hidden"); gameBoard.classList.remove("opacity-0"); }, 400);
    updateTurnIndicator();
  };

  startBtn.addEventListener("click", startGame);
  [p1Input, p2Input].forEach(input => input.addEventListener("keydown", e => { if (e.key === "Enter") startGame(); }));
});
