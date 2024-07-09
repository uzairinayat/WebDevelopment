const board = document.querySelector('.board');
    const cells = document.querySelectorAll('.cell');
    const message = document.querySelector('.message');
    const playerXScoreElement = document.getElementById('playerXScore');
    const tieScoreElement = document.getElementById('tieScore');
    const playerOScoreElement = document.getElementById('playerOScore');

    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;
    let playerXScore = 0;
    let tieScore = 0;
    let playerOScore = 0;

    // Winning combinations
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    // Event listener for cell clicks
    cells.forEach(cell => {
      cell.addEventListener('click', handleClick);
    });

    // Handle cell click
    function handleClick(e) {
      const index = parseInt(e.target.dataset.index);

      if (gameBoard[index] === '' && gameActive && currentPlayer === 'X') {
        gameBoard[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        e.target.classList.add(currentPlayer.toLowerCase());

        // Check for a winner
        if (checkWinner()) {
          message.textContent = `Player wins!`;
          updateScore(currentPlayer);
          gameActive = false;
          highlightWinner();
        } else if (checkTie()) {
          message.textContent = 'It\'s a tie!';
          updateScore('Tie');
          gameActive = false;
        } else {
          // Switch to the other player
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          message.textContent = `${currentPlayer}'s turn`;

          // Computer's turn (if playing against computer)
          if (currentPlayer === 'O') {
            setTimeout(computerTurn, 500); // Delay in milliseconds (0.5 second)
          }
        }
      }
    }

    // Check for a winner
    function checkWinner() {
      for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          return true;
        }
      }
      return false;
    }

    // Check for a tie
    function checkTie() {
      return gameBoard.every(cell => cell !== '');
    }

    // Highlight winning cells
    function highlightWinner() {
      winningCombinations.forEach(combination => {
        if (gameBoard[combination[0]] !== '' && 
            gameBoard[combination[0]] === gameBoard[combination[1]] &&
            gameBoard[combination[0]] === gameBoard[combination[2]]) {
          combination.forEach(index => {
            cells[index].classList.add('winner');
          });
        }
      });
    }

    // Computer's turn (using a simple strategy)
    function computerTurn() {
      // 1. Check if the computer can win
      for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (gameBoard[a] === 'O' && gameBoard[b] === 'O' && gameBoard[c] === '') {
          makeMoveWithDelay(c);
          return;
        } else if (gameBoard[a] === 'O' && gameBoard[c] === 'O' && gameBoard[b] === '') {
          makeMoveWithDelay(b);
          return;
        } else if (gameBoard[b] === 'O' && gameBoard[c] === 'O' && gameBoard[a] === '') {
          makeMoveWithDelay(a);
          return;
        }
      }

      // 2. Check if the player can win and block them
      for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (gameBoard[a] === 'X' && gameBoard[b] === 'X' && gameBoard[c] === '') {
          makeMoveWithDelay(c);
          return;
        } else if (gameBoard[a] === 'X' && gameBoard[c] === 'X' && gameBoard[b] === '') {
          makeMoveWithDelay(b);
          return;
        } else if (gameBoard[b] === 'X' && gameBoard[c] === 'X' && gameBoard[a] === '') {
          makeMoveWithDelay(a);
          return;
        }
      }

      // 3. Try to take the center
      if (gameBoard[4] === '') {
        makeMoveWithDelay(4);
        return;
      }

      // 4. Make a random move
      let emptyCells = [];
      for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === '') {
          emptyCells.push(i);
        }
      }
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      makeMoveWithDelay(emptyCells[randomIndex]);
    }

    // Make a move on the board with a delay
    function makeMoveWithDelay(index) {
      setTimeout(() => {
        gameBoard[index] = 'O';
        cells[index].textContent = 'O';
        cells[index].classList.add('o');
        currentPlayer = 'X';
        message.textContent = `${currentPlayer}'s turn`;

        // Check for winner or tie after the computer's move
        if (checkWinner()) {
          message.textContent = `Computer wins!`;
          updateScore('O');
          gameActive = false;
          highlightWinner();
        } else if (checkTie()) {
          message.textContent = 'It\'s a tie!';
          updateScore('Tie');
          gameActive = false;
        }
      }, 500); // Adjust delay time in milliseconds (0.5 second)
    }

    // Update the score
    function updateScore(winner) {
      if (winner === 'X') {
        playerXScore++;
        playerXScoreElement.textContent = playerXScore;
      } else if (winner === 'O') {
        playerOScore++;
        playerOScoreElement.textContent = playerOScore;
      } else if (winner === 'Tie') {
        tieScore++;
        tieScoreElement.textContent = tieScore;
      }
    }

    // Reset the game
    function resetGame() {
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      currentPlayer = 'X';
      gameActive = true;
      message.textContent = `${currentPlayer}'s turn`;
      cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winner');
      });
    }