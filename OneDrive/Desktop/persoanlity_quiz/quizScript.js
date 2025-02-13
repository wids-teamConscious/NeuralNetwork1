const cells = document.querySelectorAll(".cell");
const question = document.querySelector("#question");
const restartBtn = document.querySelector("#restartBtn");
const startBtn = document.querySelector("#startBtn");
const startClass = document.querySelector("#startContainer");
const gameClass = document.querySelector("#quizContainer");
const loadClass = document.querySelector("#loadContainer");
const confessionClass = document.querySelector("#confessionContainer");
var audio1 = new Audio("sound/button_click.mp3");
var audio2 = new Audio("sound/keyboard.mp3");

const questions = [
    { 
        question: "How do you like to spend your weekends?", 
        options: ["Watching movies", "Going on adventures", "Reading a book"] 
    },
    { 
        question: "Would you rather explore space or the deep ocean?", 
        options: ["Explore Space", "Explore the Deep Ocean", "Neither, I'll stay on land"] 
    },
    { 
        question: "What's your love language?", 
        options: ["Quality time", "Acts of service", "Physical touch"] 
    },
    { 
        question: "What kind of weather best matches your personality?", 
        options: ["Sunny & Warm", "Cozy Rainy Day", "Breezy & Cloudy"] 
    },
    { 
        question: "What's your go-to comfort food?", 
        options: ["A warm bowl of ramen", "Chocolate or ice cream", "Pizza"] 
    },
    { 
        question: "If your life was a movie, what genre would it be?", 
        options: ["Wholesome Coming-of-Age", "Comedy with a Bit of Chaos", "Sci-Fi/Mystery"] 
    }
];


let currentQuestionIndex = 0;

document.addEventListener("click", function(event) {
    if(event.target.id != 'startBtn' && event.target.id != 'option' ){
        let heart = document.createElement("div");
        heart.innerHTML = "🩷";
        heart.classList.add("heart");
        document.body.appendChild(heart);

        heart.style.left = `${event.clientX}px`;
        heart.style.top = `${event.clientY}px`;

        setTimeout(() => heart.remove(), 700); 
    }
  });

function startGame(){
    audio1.play();
    startClass.classList.add("hidden");
    gameClass.classList.remove("hidden");
    showQuestion();
}


function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const q = questions[currentQuestionIndex];
        const question = document.getElementById("question"); 
        const cells = document.querySelectorAll("#cellContainer button"); 
        const image = document.getElementById("questionImage");
        questionImage.src = `img/${currentQuestionIndex+1}.png`; 
        question.textContent = q.question; 
        
        let i = 0;
        cells.forEach(cell => { 
            cell.textContent = q.options[i]; 
            i++;
        });
        cells.forEach((cell, index) => { 
            cell.textContent = q.options[index];
            cell.onclick = nextQuestion; 
            audio1.play();
        });
    } else {
        audio1.play();
        showConfession();
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

function showConfession() {
    gameClass.classList.add("hidden");
    document.getElementById("loadContainer").style.display = "block";
    setTimeout(() => {
        document.getElementById("loadContainer").style.display = "none";
        document.getElementById("confessionContainer").style.display = "block";
        typeConfession("oops srry, this is not a quiz...I want to tell you... **I LIKE YOU!**");
    }, 1500);
}

function typeConfession(text) {
    let i = 0;
    confessionText.textContent = ""; 
    let typingInterval = setInterval(() => {
        if (i >= 54) { 
            let span = document.createElement("span");
            span.style.color = "#f679b6";  
            span.textContent = text.charAt(i);
            confessionText.appendChild(span);
        } 
        else{
            confessionText.textContent += text.charAt(i);
        }
        let cursor = document.createElement("span");
        cursor.classList.add("cursor");
        confessionText.appendChild(cursor);

        audio2.play(); 
        i++;

        if (i === text.length) {
            clearInterval(typingInterval); 
            setTimeout(() => cursor.remove(), 500);
            audio2.pause();
        }
    }, 150); 
}