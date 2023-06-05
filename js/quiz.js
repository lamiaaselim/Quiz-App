

// select elements
let countSpan = document.querySelector(".quiz-info .count span:last-child");

let bulletsContainer = document.querySelector(".bullets .spans");
let qArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let sumbitButton = document.querySelector('.submit');
let bulletsElement = document.querySelector(".bullets");
let resultsContainer = document.querySelector(".results");
let countDownSpans = document.querySelector(".countdown");
let answers;
let choaAswer;


let categoryFile;
let categoryName;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const category = urlParams.get('category')
let language = localStorage.getItem("lang") || "en";

let theme = localStorage.getItem("theme") || "light";
// darkBtn.setAttribute('data-theme', theme)
themeToggle(theme)

function themeToggle(theme) {
    answersQ = document.querySelectorAll(".answers-area .answer");
    console.log(answersQ);
    for (i = 0; i < answersQ.length; ++i) {
        if (theme == 'dark') {
            answersQ[i].classList.add("darkModeDarker")
        }
        else {
            answersQ[i].classList.remove("darkModeDarker")
        }
    }
    if (theme == 'dark') {
        $(document.body).addClass("darkModeLighter");
        $(".quiz-app").addClass("darkModeDarker");
        $(".answers-area").addClass("darkModeLighter");
        $(".quiz-info").addClass("darkModeLighter");
        $(".quiz-area").addClass("darkModeLighter");
        $(".bullets").addClass("darkModeLighter");
        $(".mybtn").addClass("btn-outline-light");
        $(".mybtn").removeClass("btn-outline-dark");
        $("#darkBtn").text('Light Mode')
        $("#darkBtn").removeClass("darkModeDarker");

    }
    else {
        $(document.body).removeClass("darkModeLighter");
        $(".quiz-app").removeClass("darkModeDarker");
        $(".answers-area").removeClass("darkModeLighter");
        $(".quiz-info").removeClass("darkModeLighter");
        $(".quiz-area").removeClass("darkModeLighter");
        $(".bullets").removeClass("darkModeLighter");
        $(".mybtn").removeClass("btn-outline-light");
        $(".mybtn").addClass("btn-outline-dark");
        $("#darkBtn").text('Dark Mode')
        $("#darkBtn").addClass("darkModeDarker");
    }


}

if (category == 'js') {
    if (language == 'en') {
        categoryName = 'JS'
    }
    else if (language == 'ar') {
        categoryName = 'جافا اسكريبت'
    }

    categoryFile = 'data/questionsJs.json'
}
else if (category == 'html') {
    categoryFile = 'data/questionsHtml.json'
}
else if (category == 'css') {
    categoryFile = 'data/questionsCss.json'
}
else if (category == 'jQuery') {
    categoryFile = 'data/questionsjQuery.json'
}
else {
    window.location.href = 'dashboard.html'
}
document.querySelector("#categoryName").textContent = categoryName
const numLatinToAr = n => String(n).replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]).replace(/\./g, "٫");

//settings options
let currentIndex = 0;
let rAnswers = 0;
let countDownInterval;
function getQuestions() {
    let myRepuest = new XMLHttpRequest();
    myRepuest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let myQuestions = JSON.parse(this.responseText);
            let qCount = myQuestions.length;
            const language = localStorage.getItem("lang") || "en";
            //create bullets and set question count

            createBullets(qCount);

            // Adding Data
            addQuestionsData(myQuestions[currentIndex], qCount);
            // Start countDown 
            countDown(5, qCount)

            // click on submit
            sumbitButton.onclick = function () {
                countQ = Object.keys(myQuestions[currentIndex]).length / 2 - 2
                let answer;
                if (language == 'en') {
                    answer = myQuestions[currentIndex]['answer_en']
                }
                else {
                    answer = myQuestions[currentIndex]['answer_ar']
                }
                currentIndex++

                cheackAnswer(answer, qCount)
                qArea.innerHTML = ''
                answersArea.innerHTML = ''
                // Adding Data
                addQuestionsData(myQuestions[currentIndex], qCount);

                // handle bullets class
                handleBullets()

                // Start countDown 
                clearInterval(countDownInterval);
                countDown(5, qCount);

                //Show Result
                showResults(qCount);

            }
        }
    }
    myRepuest.open("GET", categoryFile, true);
    myRepuest.send();
}
getQuestions();

function createBullets(n) {
    const language = localStorage.getItem("lang") || "en";
    if (language == 'ar') {
        countSpan.innerHTML = numLatinToAr(String(n))
    }
    else {
        countSpan.innerHTML = String(n)
    }

    // create bullets
    for (let i = 0; i < n; i++) {
        let bullet = document.createElement("span");
        // color span at first q
        if (i == 0) {
            bullet.className = "on";
        }
        // append bullets
        bulletsContainer.appendChild(bullet);
    }
}
function addQuestionsData(obj, count) {

    if (currentIndex < count) {
        const language = localStorage.getItem("lang") || "en";
        // question title
        let questionTitle = document.createElement("h2");

        // question text
        let questionText = document.createTextNode(obj['title_' + language]);

        //append text to heading
        questionTitle.appendChild(questionText);
        qArea.appendChild(questionTitle);
        theme = localStorage.getItem("theme") || "light";
        // create answers
        for (let i = 0; i < 4; i++) {
            //create main div answers
            let mainDiv = document.createElement("div");
            // add class to div
            mainDiv.className = 'answer';
            if (theme == 'dark') {
                mainDiv.classList.add('darkModeDarker')
            }

            // create radio
            let radioInput = document.createElement("input");
            // add type and name and id and data attribute
            radioInput.type = "radio";
            radioInput.name = "choiceRad";
            radioInput.id = `choice${i + 1}_${language}`;
            radioInput.dataset.answer = obj[`choice${i + 1}_${language}`];

            // create label
            let mylabel = document.createElement("label");

            //add for attribute
            mylabel.htmlFor = `choice${i + 1}_${language}`;
            // create label text
            let labelText = document.createTextNode(obj[`choice${i + 1}_${language}`]);

            //add text to label
            mylabel.appendChild(labelText);

            // append input and label t maindiv
            mainDiv.appendChild(radioInput);
            mainDiv.appendChild(mylabel);

            // append answers to answes area
            answersArea.appendChild(mainDiv);
        }
    }
}

function cheackAnswer(answer, qCount) {
    answers = document.getElementsByName('choiceRad')
    choaAswer;
    for (i = 0; i < answers.length; i++) {
        if (answers[i].checked) {
            choaAswer = answers[i].dataset.answer
        }
    }
    if (choaAswer == answer) {
        rAnswers++
    }
}

function handleBullets() {
    let bulletsSpans = document.querySelectorAll('.bullets .spans span')
    let lastOn;
    for (i = 0; i < bulletsSpans.length - 1; i++) {
        if (bulletsSpans[i].className == 'on') {
            lastOn = i
        }
    }
    bulletsSpans[lastOn + 1].className = 'on'
}
// Create showResults Function
function showResults(count) {
    let theResults;
    if (currentIndex === count) {
        const language = localStorage.getItem("lang") || "en";
        // console.log("Question finished");  // // Try
        qArea.remove();
        answersArea.remove();
        sumbitButton.remove();
        bulletsElement.remove();

        if (rAnswers > (count / 2) && rAnswers < count) {
            if (language == 'en') {
                theResults = `<span class="good"> Good you pass </span>, ${rAnswers} 
                from ${count}`;
            }
            else {
                theResults = `<span class="good"> احسنت , لقدت قمت بحل  </span>, ${rAnswers} 
                من ${count}`;
            }

        } else if (rAnswers === count) {
            if (language == 'en') {
                theResults = `<span class="prefect"> Excellent </span>, 
                All Answers is right`;
            }
            else {
                theResults = `<span class="prefect"> أنت بلا شك الافضل </span>, 
                جميع الاسئلة صحصيحه`;
            }
        } else {
            if (language == 'en') {
                theResults = `<span class="bad"> Sorry you fail </span>, ${rAnswers} 
                from ${count}`;
            }
            else {
                theResults = `<span class="bad"> حاول مره اخري </span>, ${numLatinToAr(rAnswers)} 
                من ${numLatinToAr(count)}`;
            }

        }
        // call Result 
        resultsContainer.innerHTML = theResults;
        resultsContainer.style.padding = '10px';
        resultsContainer.style.backgroundColor = 'white';
        resultsContainer.style.marginTop = '10px';
    }
}
// Timer 
function countDown(duration, count) {
    if (currentIndex < count) {
        let minutes, seconds;
        countDownInterval = setInterval(function () {
            minutes = parseInt(duration / 60);
            seconds = parseInt(duration % 60);
            var language = localStorage.getItem("lang") || "en";
            minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
            seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

            if (language == 'en') {
                countDownSpans.innerHTML = `${minutes} : ${seconds}`
            }
            else {
                countDownSpans.innerHTML = `${numLatinToAr(seconds)} : ${numLatinToAr(minutes)}`
            }
            if (--duration < 0) {
                clearInterval(countDownInterval);
                // console.log("Time finished"); // //Try
                sumbitButton.click()
            }
        }, 1000)
    }
}

$(document).ready(function () {

    $("#darkBtn").click(function () {

        theme = localStorage.getItem('theme');
        if (theme == 'light' || theme == '') {
            theme = 'dark'
            themeToggle(theme)
            localStorage.setItem('theme', 'dark');

        }
        else {
            theme = 'light'
            themeToggle(theme)
            localStorage.setItem('theme', 'light');
        }
    });
})
