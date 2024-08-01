// script.js
document.addEventListener('DOMContentLoaded', () => {
    checkForUpdates();
    loadWelcomeScreen();
});

function checkForUpdates() {
    const lastUpdate = localStorage.getItem('lastUpdate');
    const now = new Date().getTime();
    const threeMonths = 1000 * 60 * 60 * 24 * 90;

    if (!lastUpdate || (now - lastUpdate) > threeMonths) {
        localStorage.setItem('lastUpdate', now);
        fetchNewData();
    }
}

function fetchNewData() {
    // Replace this with actual data fetching logic
    console.log('Fetching new data...');
}

function loadWelcomeScreen() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="text-center">
            <h1 class="text-4xl mb-4 text-blue-600">Welcome to Your Health Questions Guide</h1>
            <div class="mb-4">
                <label for="age" class="block mb-2">Enter your age:</label>
                <input type="number" id="age" class="border border-gray-300 rounded p-2 w-full">
            </div>
            <div class="mb-4">
                <label for="sex" class="block mb-2">Select your sex:</label>
                <select id="sex" class="border border-gray-300 rounded p-2 w-full">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <button class="btn w-full" onclick="loadHealthConditions()">Continue</button>
        </div>
    `;
}

function loadHealthConditions() {
    const age = document.getElementById('age').value;
    const sex = document.getElementById('sex').value;
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="text-center">
            <h2 class="text-2xl mb-4 text-blue-600">Select Your Health Conditions</h2>
            <div id="conditions-list" class="mb-4">
                <!-- Health conditions will be dynamically loaded here -->
            </div>
            <div class="mb-4">
                <label for="condition-search" class="block mb-2">Search for conditions:</label>
                <input type="text" id="condition-search" class="border border-gray-300 rounded p-2 w-full" oninput="searchConditions()">
            </div>
            <button class="btn w-full" onclick="loadQuestions()">Continue</button>
        </div>
    `;
    loadTopHealthConditions(age, sex);
}

function loadTopHealthConditions(age, sex) {
    const conditionsList = document.getElementById('conditions-list');
    fetchTopHealthConditions(age, sex).then(conditions => {
        conditionsList.innerHTML = ''; // Clear any existing content
        conditions.forEach(condition => {
            const conditionElement = document.createElement('div');
            conditionElement.innerHTML = `
                <input type="checkbox" id="${condition}" name="condition" value="${condition}" class="mr-2">
                <label for="${condition}">${condition}</label>
            `;
            conditionsList.appendChild(conditionElement);
        });
    });
}

function fetchTopHealthConditions(age, sex) {
    // Replace with actual API call or logic to fetch top health conditions
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                'Diabetes', 'Hypertension', 'Asthma', 'Arthritis', 
                'Heart Disease', 'Chronic Pain', 'Depression', 'Anxiety', 
                'Obesity', 'COPD'
            ]);
        }, 1000);
    });
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
            <h2 class="text-2xl mb-4 text-blue-600">Select Your Questions</h2>
            <div id="questions-list" class="mb-4">
                <!-- Questions will be dynamically loaded here -->
            </div>
            <button class="btn w-full" onclick="loadSummary()">Continue</button>
        </div>
    `;
    loadQuestionsForConditions(selectedConditions);
}

function loadQuestionsForConditions(conditions) {
    const questionsList = document.getElementById('questions-list');
    questionsList.innerHTML = ''; // Clear any existing content
    conditions.forEach(condition => {
        fetchQuestionsForCondition(condition).then(questions => {
            const conditionHeader = document.createElement('h3');
            conditionHeader.className = 'text-xl mt-4 text-blue-600';
            conditionHeader.innerText = condition;
            questionsList.appendChild(conditionHeader);
            questions.forEach(question => {
                const questionElement = document.createElement('div');
                questionElement.innerHTML = `
                    <input type="checkbox" id="${question}" name="question" value="${question}" class="mr-2">
                    <label for="${question}">${question}</label>
                `;
                questionsList.appendChild(questionElement);
            });
        });
    });
}

function fetchQuestionsForCondition(condition) {
    // Replace with actual API call or logic to fetch questions for each condition
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                `What are the symptoms of ${condition}?`,
                `What are the treatment options for ${condition}?`,
                `How can I manage ${condition} with lifestyle changes?`,
                `Are there any medications for ${condition}?`,
                `What are the side effects of the medications for ${condition}?`,
                `How often should I have check-ups for ${condition}?`,
                `Are there any support groups for ${condition}?`,
                `What should I do if my condition worsens?`,
                `What are the risk factors for ${condition}?`,
                `Can ${condition} affect other parts of my health?`
            ]);
        }, 1000);
    });
}

function loadSummary() {
    const selectedQuestions = Array.from(document.querySelectorAll('input[name="question"]:checked')).map(checkbox => checkbox.value);
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="text-center">
            <h2 class="text-2xl mb-4 text-blue-600">Questions for Your Healthcare Provider</h2>
            <div