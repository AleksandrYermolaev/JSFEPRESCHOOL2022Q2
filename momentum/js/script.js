//Часы и календарь
function showTime() {
	const newDate = new Date();
	const currentTime = newDate.toLocaleTimeString();
	time.textContent = currentTime;
	showDate();
	setTimeout(showTime, 1000);
}

function showDate() {
	const newDate = new Date();
	const options = {
		weekday: 'long',
		month: 'long', 
		day: 'numeric',
	};
	const currentDate = newDate.toLocaleDateString('en', options);
	date.textContent = currentDate;
}

const time = document.querySelector('.time');
const date = document.querySelector('.date');
showTime();


//Приветствие	
function getTimeOfDay() {
	const newDate = new Date();
	const currentHours = newDate.getHours();
	const timesForHours = {
		'morning': [6, 7, 8, 9, 10, 11],
		'day': [12, 13, 14, 15, 16, 17],
		'evening': [18, 19, 20, 21, 22, 23],
		'night': [0, 1, 2, 3, 4, 5],
	};
	for (let timeForHour in timesForHours) {
		if (timesForHours[timeForHour].includes(currentHours)) {
			return timeForHour;
		}
	}
}

function setLocalStorage() {
	localStorage.setItem('name', yourName.value);
}

function getLocalStorage() {
	if (localStorage.getItem('name')) {
		yourName.value = localStorage.getItem('name');
	}
}

const greeting = document.querySelector('.greeting');
const timeOfDay = getTimeOfDay();
greeting.textContent = `Good ${timeOfDay}, `;
const yourName = document.querySelector('.name');
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);



 