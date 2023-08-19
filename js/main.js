// HTML Elements
const numberOfQuestions = document.querySelector('input#number-of-questions');
const categoriesDropdown = document.querySelector('select#category');
const difficultyDropdown = document.querySelector('select#difficulty');
const typeDropdown = document.querySelector('select#type');

// Events
document.querySelector('button#start-button').addEventListener('click', async function () {
    if (Number(numberOfQuestions.value) < 1) {
        return;
    }
    try {
        let params = { amount: numberOfQuestions.value };
        if (categoriesDropdown.value != 'any') {
            params.category = categoriesDropdown.value;
        }
        if (difficultyDropdown.value != 'any') {
            params.difficulty = difficultyDropdown.value;
        }
        if (typeDropdown.value != 'any') {
            params.type = typeDropdown.value;
        }
        const response = await fetch('https://opentdb.com/api.php?' + new URLSearchParams(params));
        const data = await response.json();
        sessionStorage.setItem('questions', JSON.stringify(data.results));
        location.replace('./html/quiz.html');
    } catch (error) {
        console.log('error');
    }
});