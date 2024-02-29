 // Array of symbols
const symbols = ['😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾','🐏', '🐑', '🐐', '🐹', '🐰', '🐇'];

 // Duplicate symbols to create pairs
const allSymbols = symbols.concat(symbols);

 // Shuffle function
    function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
     const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
    }

    let moves = 0;
    let flippedCards = [];
    let startTime = null;
    let timerInterval = null;

 // Create shuffled cards
    const shuffledSymbols = shuffle(allSymbols);
    const container = document.getElementById('card-container');

 // Generate cards
    shuffledSymbols.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.innerHTML = `
        <div class="card-face card-front">
        <h1></h1>
        </div>
        <div class="card-face card-back">
        <h1>${symbol}</h1>
        </div>
    `;
    container.appendChild(card);
    });

 // Event listener for card clicks
    container.addEventListener('click', function(event) {
    const clickedCard = event.target.closest('.card');
    if (!clickedCard || flippedCards.length === 2 || clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) return;

    clickedCard.classList.add('flipped');
    flippedCards.push(clickedCard);
    moves++;
    document.getElementById("move-counter").innerText = "Moves: " + moves;

    if (flippedCards.length === 2) {
        const symbol1 = flippedCards[0].dataset.symbol;
        const symbol2 = flippedCards[1].dataset.symbol;

        if (symbol1 === symbol2) {
        setTimeout(() => {
            flippedCards.forEach(card => card.classList.add('matched'));
            flippedCards = [];
            if (document.querySelectorAll('.matched').length === allSymbols.length) {
            stopTimer();
            calculateScore();
            }
        }, 1000);
        } else {
        setTimeout(() => {
            flippedCards.forEach(card => card.classList.remove('flipped'));
            flippedCards = [];
        }, 1000);
        }
    }
    });

 // Reset function
    function resetGame() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('flipped', 'matched');
    });
    flippedCards = [];
    moves = 0;
    document.getElementById("move-counter").innerText = "Moves: 0";
    document.getElementById("score").innerText = "Score: 0";
    stopTimer();
    startTimer();
    
    }

    function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(function() {
        var elapsedTime = Date.now() - startTime;
        var minutes = Math.floor(elapsedTime / 60000);
        var seconds = Math.floor((elapsedTime % 60000) / 1000);
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        document.getElementById("timer").innerText = minutes + ":" + seconds;
    }, 1000);
    }

    function stopTimer() {
    clearInterval(timerInterval);
    }

    function calculateScore() {
    var elapsedTime = Date.now() - startTime;
    var seconds = Math.floor(elapsedTime / 1000);
   var score = 10000 - (seconds * 10) - (moves * 50);
    score = Math.max(score, 0);
    document.getElementById("score").innerText = "Score: " + score;
    }

 // Event listener for reset button
    const resetButton = document.getElementById('reset-btn');
    resetButton.addEventListener('click', resetGame);

 startTimer(); // Start the timer when the page loads