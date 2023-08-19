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
        const response = await fetch('https://opentdb.com/api.php?' + new URLSearchParams({
            amount: numberOfQuestions.value,
            category: categoriesDropdown.value,
            difficulty: difficultyDropdown.value,
            type: typeDropdown.value,
        }));
        sessionStorage.setItem('questions', JSON.stringify(await response.json()));
        location.replace('./html/quiz.html');
    } catch (error) {
        console.log('error');
    }
});