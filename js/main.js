// HTML Elements
const numberOfQuestions = document.querySelector('input#number-of-questions');
const categoriesDropdown = document.querySelector('select#category');
const difficultyDropdown = document.querySelector('select#difficulty');
const typeDropdown = document.querySelector('select#type');

// Events
document.querySelector('button#start-button').addEventListener('click', function () {
    // TODO: handle starting quiz logic
    location.replace('./html/quiz.html');
});