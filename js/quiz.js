// Classes
class Question {
    constructor(object) {
        this.category = object.category;
        this.type = object.type;
        this.question = object.question;
        this.difficulty = object.difficulty;
        this.answers = [object.correct_answer, ...object.incorrect_answers];
        this.correctAnswer = object.correct_answer;
        shuffleArray(this.answers);
    }

    view() {
        category.innerHTML = this.category;
        question.innerHTML = this.question;
        difficulty.innerHTML = this.difficulty;
        difficulty.classList.remove('text-success', 'text-warning', 'text-danger');
        difficulty.classList.add(this.#color);
        answersSection.innerHTML = this.answers.map(item => `
        <div class="${this.#columns}">
            <div
                class="answer bg-body-tertiary px-5 h-100 text-center py-3 rounded d-flex justify-content-center align-items-center">
                <p class="mb-0">${item}</p>
                </div>
        </div>
        `).join('');
    }

    get #color() {
        switch (this.difficulty.toLowerCase()) {
            case 'easy':
                return 'text-success';

            case 'medium':
                return 'text-warning';

            default:
                return 'text-danger';
        }
    }

    get #columns() {
        if (this.answers.length == 2) {
            return 'col-md-6';
        }
        return 'col-lg-3 col-md-6';
    }
}

// HTML Elements
const category = document.querySelector('h3#category');
const question = document.querySelector('h3#question');
const answersSection = document.querySelector('div#answers');
const difficulty = document.querySelector('h2#difficulty');
const progress = document.querySelector('span#progress');
const preventClick = document.querySelector('div#prevent-click');
const scoreText = document.querySelector('span#score');
const confettiCanvas = document.querySelector('canvas#canvas');
const finishScore = document.querySelector('span#finish-score');
const newQuizButton = document.querySelector('button#new-quiz-button');
let questions = [];
let answers;

// Variables
const data = JSON.parse(sessionStorage.getItem('questions'));
let index = 0;
let score = 0;

// Events
newQuizButton.addEventListener('click', function () {
    location.replace('../index.html');
});

// Functions
function setQuestionData() {
    questions = data.map(item => new Question(item));
    questions[index].view();
    progress.innerHTML = `${index + 1}/${questions.length}`;
    handleAnswers();
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

function handleAnswers() {
    answers = document.querySelectorAll('div.answer');
    for (const answer of answers) {
        answer.addEventListener('click', function () {
            if (this.querySelector('p').innerHTML == questions[index].correctAnswer) {
                this.classList.replace('bg-body-tertiary', 'bg-success');
                score++;
                scoreText.innerHTML = score;
            } else {
                this.classList.replace('bg-body-tertiary', 'bg-danger');
            }
            preventClick.classList.remove('d-none');
            index++;
            if (index >= questions.length) {
                finishScore.innerHTML = score;
                confettiCanvas.classList.replace('d-none', 'd-block');
                if (score > questions.length / 2) {
                    finishScore.classList.add('text-success');
                    initConfetti();
                    render();
                }
                showResults();
                return;
            }
            setTimeout(() => {
                setQuestionData();
                preventClick.classList.add('d-none');
            }, 1000);
        });
    }
}

function showResults() {
    document.querySelector('div#finish-overlay').classList.replace('d-none', 'd-flex');
    for (opacity = 0; opacity <= 1.0; opacity = opacity + 0.1) {
        setTimeout(function () { document.querySelector('div#finish-overlay').style.opacity = opacity; }, 100);
    }
}

(function () { setQuestionData(); })();