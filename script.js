// script.js
document.addEventListener('DOMContentLoaded', () => {
    loadWelcomeScreen();
});

function loadWelcomeScreen() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="text-center">
            <h1 class="text-4xl mb-4">Welcome to Your Health Questions Guide</h1>
            <label for="age">Enter your age:</label>
            <input type="number" id="age" class="border mb-4 p-2">
            <br>
            <label for="sex">Select your sex:</label>
            <select id="sex" class="border mb-4 p-2">
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <br>
            <button class="btn" onclick="loadHealthConditions()">Continue</button>
        </div>
    `;
}

function loadHealthConditions() {
    const age = document.getElementById('age').value;
    const sex = document.getElementById('sex').value;
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="text-center">
            <h2 class="text-2xl mb-4">Select Your Health Conditions</h2>
            <div id="conditions-list">
                <!-- Health conditions will be dynamically loaded here -->
            </div>
            <br>
            <label for="condition-search">Search for conditions:</label>
            <input type="text" id="condition-search" class="border mb-4 p-2" oninput="searchConditions()">
            <br>
            <button class="btn" onclick="loadQuestions()">Continue</button>
        </div>
    `;
    loadTopHealthConditions(age, sex);
}

function loadTopHealthConditions(age, sex) {
    const conditionsList = document.getElementById('conditions-list');
    const conditions = getTopHealthConditions(age, sex);
    conditions.forEach(condition => {
        conditionsList.innerHTML += `
            <div>
                <input type="checkbox" id="${condition}" name="condition" value="${condition}">
                <label for="${condition}">${condition}</label>
            </div>
        `;
    });
}

function getTopHealthConditions(age, sex) {
    // Dummy data, replace with actual logic
    return ['Condition 1', 'Condition 2', 'Condition 3', 'Condition 4', 'Condition 5', 'Condition 6', 'Condition 7', 'Condition 8', 'Condition 9', 'Condition 10'];
}

function searchConditions() {
    const searchValue = document.getElementById('condition-search').value.toLowerCase();
    const conditionsList = document.getElementById('conditions-list');
    conditionsList.querySelectorAll('div').forEach(div => {
        const condition = div.querySelector('label').innerText.toLowerCase();
        if (condition.includes(searchValue)) {
            div.style.display = 'block';
        } else {
            div.style.display = 'none';
        }
    });
}

function loadQuestions() {
    const selectedConditions = Array.from(document.querySelectorAll('input[name="condition"]:checked')).map(checkbox => checkbox.value);
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="text-center">
            <h2 class="text-2xl mb-4">Select Your Questions</h2>
            <div id="questions-list">
                <!-- Questions will be dynamically loaded here -->
            </div>
            <br>
            <button class="btn" onclick="loadSummary()">Continue</button>
        </div>
    `;
    loadQuestionsForConditions(selectedConditions);
}

function loadQuestionsForConditions(conditions) {
    const questionsList = document.getElementById('questions-list');
    conditions.forEach(condition => {
        const questions = getQuestionsForCondition(condition);
        questionsList.innerHTML += `
            <h3 class="text-xl mt-4">${condition}</h3>
            ${questions.map(question => `
                <div>
                    <input type="checkbox" id="${question}" name="question" value="${question}">
                    <label for="${question}">${question}</label>
                </div>
            `).join('')}
        `;
    });
}

function getQuestionsForCondition(condition) {
    // Dummy data, replace with actual logic
    return ['Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5', 'Question 6', 'Question 7', 'Question 8', 'Question 9', 'Question 10'];
}

function loadSummary() {
    const selectedQuestions = Array.from(document.querySelectorAll('input[name="question"]:checked')).map(checkbox => checkbox.value);
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="text-center">
            <h2 class="text-2xl mb-4">Questions for Your Healthcare Provider</h2>
            <div id="summary-list">
                <!-- Summary will be dynamically loaded here -->
            </div>
            <br>
            <button class="btn" onclick="window.print()">Print</button>
        </div>
    `;
    loadSummaryList(selectedQuestions);
}

function loadSummaryList(questions) {
    const summaryList = document.getElementById('summary-list');
    questions.forEach(question => {
        summaryList.innerHTML += `
            <h3 class="text-xl mt-4">${question}</h3>
            <p>____________________________________________________________</p>
            <p>____________________________________________________________</p>
            <p>____________________________________________________________</p>
        `;
    });
}