
let secretNumber = Math.floor((Math.random()) * 20) + 1;
let score = 20;
let highScore = 0;

let displayMessage = function(message) {
    document.querySelector(".message").textContent = message;
}



document.querySelector(".check").addEventListener("click", function () {
  
    const userGuess = Number(document.querySelector(".input").value);
    
    if (!userGuess) {
       displayMessage("⛔ No Number!");
    } 
  

    else if (userGuess == secretNumber) {
        document.querySelector(".number").textContent = secretNumber;
        displayMessage("🎉 Correct Number!");
        document.querySelector("body").style.backgroundColor = "#60b347";
        document.querySelector(".number").style.width="160px";
        
        if (score > highScore) {
            highScore = score;
            document.querySelector(".highscore").textContent = highScore;
        }
    }

    else if(userGuess!==secretNumber) {
        if (score > 1) {
            document.querySelector(".message").textContent = userGuess > secretNumber ? "📈 Too High!" : "📉 Too Low!"
            score--;
            document.querySelector(".score").textContent = score;
        } else {displayMessage( "💥 Game Over");
                document.querySelector(".score").textContent = 0;
                document.querySelector(".number").textContent = secretNumber;
    };

    };
});

    // } else if (userGuess > secretNumber) {
    //     document.querySelector(".message").textContent = "📈 Too High!";
    //     if (score > 1) {
    //         score--;
    //         document.querySelector(".score").textContent = score;
    //     } else {document.querySelector(".message").textContent = "💥 Game Over"
    //             document.querySelector(".score").textContent = 0;
    //             document.querySelector(".number").textContent = secretNumber;
    //     };
    // } else if (userGuess < secretNumber) {
    //     document.querySelector(".message").textContent = "📉 Too Low!";
    //     if (score > 1) {
    //         score--;
    //         document.querySelector(".score").textContent = score;
    //     } else {document.querySelector(".message").textContent = "💥 Game Over"
    //             document.querySelector(".score").textContent = 0;
    //             document.querySelector(".number").textContent = secretNumber;
    //     }
        
    // }



document.querySelector(".again").addEventListener("click", function() {
    secretNumber = Math.floor((Math.random()) * 20) + 1;
    score = 20;

    document.querySelector(".number").textContent = "?";
    document.querySelector(".score").textContent = score;
    document.querySelector("input").value = "";
    displayMessage( "Start Guessing..."); 
    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector(".number").style.width = "80px";
   
});

