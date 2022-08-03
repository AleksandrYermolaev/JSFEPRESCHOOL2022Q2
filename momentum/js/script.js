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
	localStorage.setItem('city', weatherCity.value);
}

function getLocalStorage() {
	if (localStorage.getItem('name')) {
		yourName.value = localStorage.getItem('name');
	}
	if (localStorage.getItem('city')) {
		weatherCity.value = localStorage.getItem('city');
		getWeather();
	}
}

function showGreeting() {
	const greeting = document.querySelector('.greeting');
	const timeOfDay = getTimeOfDay();
	greeting.textContent = `Good ${timeOfDay}, `;
	setTimeout(showGreeting, 1000);
} showGreeting();

const yourName = document.querySelector('.name');
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

//Слайдер изображений
function setBg() {
	const linksTemlates = {
		'morning': 'https://raw.githubusercontent.com/AleksandrYermolaev/tasks-assets/assets/images/morning/',
		'day': 'https://raw.githubusercontent.com/AleksandrYermolaev/tasks-assets/assets/images/afternoon/',
		'evening': 'https://raw.githubusercontent.com/AleksandrYermolaev/tasks-assets/assets/images/evening/',
		'night': 'https://raw.githubusercontent.com/AleksandrYermolaev/tasks-assets/assets/images/night/',
	};
	const imageUrl = `${linksTemlates[getTimeOfDay()]}${String(randomImageNumber).padStart(2, '0')}.jpg`;
	const img = new Image();
	img.src = imageUrl;
	img.addEventListener('load', () => {
		body.style.backgroundImage = `url('${imageUrl}')`;
	});
}

function getNextSlide() {
	if (randomImageNumber < 20) {
		randomImageNumber += 1;
	} else randomImageNumber = 1;
	setBg();
}

function getPrevSlide() {
	if (randomImageNumber > 1) {
		randomImageNumber -= 1;
	} else randomImageNumber = 20;
	setBg();
}

let randomImageNumber = Math.floor(Math.random() * 20 + 1);
const body = document.querySelector('body');
setBg();
const nextSlide = document.querySelector('.slide-next');
const prevSlide = document.querySelector('.slide-prev');
nextSlide.addEventListener('click', getNextSlide);
prevSlide.addEventListener('click', getPrevSlide);

// Погода
const weatherCity = document.querySelector('.city');
weatherCity.value = 'Minsk';
const weatherIcon = document.querySelector('.weather-icon');
const weatherTemp = document.querySelector('.temperature');
const weatherDesc = document.querySelector('.weather-description');
const weatherWind = document.querySelector('.wind');
const weatherHumi = document.querySelector('.humidity');
const windDirections = {
	'north': [337.5, 22.5],
	'northeast': [22.5, 67.5],
	'east': [67.5, 112.5],
	'southeast': [112.5, 157.5],
	'south': [157.5, 202.5],
	'southwest': [202.5, 247.5],
	'west': [247.5, 292.5],
	'northwest': [292.5, 337.5]
};
let direction;
weatherCity.addEventListener('change', () => {
	getWeather();
	weatherCity.blur();
});

async function getWeather() {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCity.value}&lang=en&appid=e1fc18dd49c14287ed9de7cdafd21b6a&units=metric`;
	const errorData = document.querySelector('.weather-error');
	try {
		const res = await fetch(url);
		const weatherData = await res.json();
		weatherIcon.className = 'weather-icon owf';
		weatherIcon.classList.add(`owf-${weatherData.weather[0].id}`);
		weatherTemp.textContent = `${Math.round(weatherData.main.temp)}℃,`;
		weatherDesc.textContent = weatherData.weather[0].description;
		for (let windDirection in windDirections) {
			if (weatherData.wind.deg >= windDirections[windDirection][0] && weatherData.wind.deg < windDirections[windDirection][1]) {
				direction = windDirection; 
			}
		}
		weatherWind.textContent = `Wind: ${direction}, ${Math.round(weatherData.wind.speed)} m/s`;
		weatherHumi.textContent = `Humidity: ${weatherData.main.humidity}%`
		errorData.textContent = '';
	} catch (error) {
		errorData.textContent = 'An error has occurred! Check the spelling of the city and your internet connection!';
		weatherIcon.textContent = '';
		weatherTemp.textContent = '';
		weatherDesc.textContent = '';
		weatherWind.textContent = '';
		weatherHumi.textContent = '';
	}
} getWeather();

// Виджет цитат
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const qouteChange = document.querySelector('.change-quote');
qouteChange.addEventListener('click', () => {
	qouteChange.classList.toggle('active');
	getQuote();
});


async function getQuote() {
	let randomQuoteNumber = Math.floor(Math.random() * 19);
	const res = await fetch ('../assets/quotes.json');
	const quoteText = await res.json();
	quote.textContent = `"${quoteText[randomQuoteNumber].text}"`;
	author.textContent = quoteText[randomQuoteNumber].author;
} getQuote();

// Аудиоплеер
const audio = document.querySelector('.audio');
const play = document.querySelector('.play');
const nextSong = document.querySelector('.play-next');
const prevSong = document.querySelector('.play-prev');

let isPlay = false;
let playNumber = 0;
import { playList } from 'playList.js';
audio.src = playList[playNumber].src;

function playAudio() {
  audio.play();
  isPlay = true;
  play.classList.add('pause');
}

function pauseAudio() {
  audio.pause();
  isPlay = false;
  play.classList.remove('pause');
}

function nextAudio() {
  playNumber += 1;
  if (playNumber > playList.length - 1) {
    playNumber = 0;
  }
  // console.log(audio.src);
}

play.addEventListener('click', () => {
  if (isPlay) {
    pauseAudio();
  } else {
    playAudio();
  }
});
nextSong.addEventListener('click', nextAudio);

