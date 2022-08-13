//Настройки--------------------------------------------------------
import { languages } from './lang.js';
const settings = {
	currentLang: 'en',
	imagesApi: 'Git',
	apiTag: 'Nature'
};
const languageRadios = document.querySelectorAll('.language-radio');
const languageLabels = document.querySelectorAll('.language-label');
const searchImageApi = document.querySelector('.search');
searchImageApi.addEventListener('keydown', (key) => {
	if (key.keyCode === 13) {
		settings.apiTag = searchImageApi.value;
		setBg();
	}
});
const playerBlock = document.querySelector('.player');
const weatherBlock = document.querySelector('.weather');
const timeBlock = document.querySelector('.time');
const dateBlock = document.querySelector('.date');
const greetingBlock = document.querySelector('.greeting-container');
const quoteBlock = document.querySelector('.footer');
const playerHider = document.querySelector('.player-hider');
const weatherHider = document.querySelector('.weather-hider');
const timeHider = document.querySelector('.time-hider');
const dateHider = document.querySelector('.date-hider');
const greetingHider = document.querySelector('.greeting-hider');
const quoteHider = document.querySelector('.footer-hider');

playerHider.addEventListener('change', () => {
	playerBlock.classList.toggle('disabled');
});
weatherHider.addEventListener('change', () => {
	weatherBlock.classList.toggle('disabled');
});
timeHider.addEventListener('change', () => {
	timeBlock.classList.toggle('disabled');
});
dateHider.addEventListener('change', () => {
	dateBlock.classList.toggle('disabled');
});
greetingHider.addEventListener('change', () => {
	greetingBlock.classList.toggle('disabled');
});
quoteHider.addEventListener('change', () => {
	quoteBlock.classList.toggle('disabled');
});

const setLang = document.querySelector('.set-lang');
const setImage = document.querySelector('.set-image');
const setTag = document.querySelector('.set-tag');
const setShow = document.querySelector('.set-show');
const search = document.querySelector('.search');


function changeLaguage() {
	languageRadios.forEach(radio => {
		if (radio.checked) {
			settings.currentLang = radio.value;
			languageLabels.forEach(label => {
				if (label.classList.contains(radio.id)) {
					label.classList.add('playing');
				} else label.classList.remove('playing');
			});
		}
	});
	yourName.placeholder = languages[settings.currentLang].greetings[4];
	weatherCity.value = languages[settings.currentLang].city[1];
	getWeather();
	getQuote();
	setLang.textContent = languages[settings.currentLang].set[0];
	setImage.textContent = languages[settings.currentLang].set[1];
	setTag.textContent = languages[settings.currentLang].set[2];
	setShow.textContent = languages[settings.currentLang].set[3];
	search.placeholder = languages[settings.currentLang].set[4];
} 
languageRadios.forEach(radio => {
	radio.addEventListener('change', changeLaguage);
});


const apiRadios = document.querySelectorAll('.api-radio');
const apiLabels = document.querySelectorAll('.api-label');
function changeApi() {
	apiRadios.forEach(radio => {
		if (radio.checked) {
			settings.imagesApi = radio.value;
			apiLabels.forEach(label => {
				if (label.classList.contains(radio.id)) {
					label.classList.add('playing');
				} else label.classList.remove('playing');
			});
		}
	});
	setBg();
} 
apiRadios.forEach(radio => {
	radio.addEventListener('change', changeApi);
});

const showSettings = document.querySelector('.show-settings');
const settingsBlock = document.querySelector('.settings');
showSettings.addEventListener('click', () => {
	settingsBlock.classList.toggle('settings-hider');
	showSettings.classList.toggle('active');
});


//Часы и календарь----------------------------------------------
function showTime() {
	const newDate = new Date();
	const currentTime = newDate.toLocaleTimeString(settings.currentLang);
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
	const currentDate = newDate.toLocaleDateString(settings.currentLang, options);
	date.textContent = currentDate;
}

const time = document.querySelector('.time');
const date = document.querySelector('.date');
showTime();


//Приветствие-----------------------------------------------------
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

function showGreeting() {
	const greeting = document.querySelector('.greeting');
	const timeOfDay = getTimeOfDay();
	if (timeOfDay === 'morning') greeting.textContent = languages[settings.currentLang].greetings[0];
	if (timeOfDay === 'day') greeting.textContent = languages[settings.currentLang].greetings[1];
	if (timeOfDay === 'evening') greeting.textContent = languages[settings.currentLang].greetings[2];
	if (timeOfDay === 'night') greeting.textContent = languages[settings.currentLang].greetings[3];
	setTimeout(showGreeting, 1000);
} showGreeting();

const yourName = document.querySelector('.name');
yourName.placeholder = languages[settings.currentLang].greetings[4];
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);

//Local storage------------------------------------------------------------------------------
function setLocalStorage() {
	localStorage.setItem('name', yourName.value);
	localStorage.setItem('city', weatherCity.value);
	localStorage.setItem('language', settings.currentLang);
	localStorage.setItem('api', settings.imagesApi);
	localStorage.setItem('player', playerHider.checked);
	localStorage.setItem('weather', weatherHider.checked);
	localStorage.setItem('time', timeHider.checked);
	localStorage.setItem('date', dateHider.checked);
	localStorage.setItem('greeting', greetingHider.checked);
	localStorage.setItem('quote', quoteHider.checked);

}
	searchImageApi.addEventListener('input', () => {
		const valueApi = searchImageApi.value;
		localStorage.setItem('tag', valueApi);
	});

function getLocalStorage() {
	if (localStorage.getItem('name')) {
		yourName.value = localStorage.getItem('name');
	}
	if (localStorage.getItem('city')) {
		weatherCity.value = localStorage.getItem('city');
		getWeather();
	}
	if (localStorage.getItem('language')) {
		settings.currentLang = localStorage.getItem('language');
		languageRadios.forEach(radio => radio.checked = radio.value === settings.currentLang ? true : false);
		changeLaguage();
	}
	if (localStorage.getItem('tag')) {
		searchImageApi.value = localStorage.getItem('tag');
	}
	if (localStorage.getItem('api')) {
		settings.imagesApi = localStorage.getItem('api');
		apiRadios.forEach(radio => radio.checked = radio.value === settings.imagesApi ? true : false);
		changeApi();
	}
	if (localStorage.getItem('player')) {	
		if (localStorage.getItem('player') === 'true') {
			playerHider.checked = true;
			playerBlock.classList.remove('disabled');
		} else {
			playerHider.checked = false;
			playerBlock.classList.add('disabled');
		}
	}
	if (localStorage.getItem('weather')) {
		if (localStorage.getItem('weather') === 'true') {
		weatherHider.checked = true;
		weatherBlock.classList.remove('disabled');
		} else {
			weatherHider.checked = false;
			weatherBlock.classList.add('disabled');
		}
	}
	if (localStorage.getItem('time')) {	
		if (localStorage.getItem('time') === 'true') {
			timeHider.checked = true;
			timeBlock.classList.remove('disabled');
		} else {
			timeHider.checked = false;
			timeBlock.classList.add('disabled');
		}
	}
	if (localStorage.getItem('date')) {
		if (localStorage.getItem('date') === 'true') {
			dateHider.checked = true;
			dateBlock.classList.remove('disabled');
		} else {
			dateHider.checked = false;
			dateBlock.classList.add('disabled');
		}
	}
	if(localStorage.getItem('greeting')) {
		if (localStorage.getItem('greeting') === 'true') {
			greetingHider.checked = true;
			greetingBlock.classList.remove('disabled');
		} else {
			greetingHider.checked = false;
			greetingBlock.classList.add('disabled');
		}
	}
	if(localStorage.getItem('quote')) {	
		if (localStorage.getItem('quote') === 'true') {
			quoteHider.checked = true;
			quoteBlock.classList.remove('disabled');
		} else {
			quoteHider.checked = false;
			quoteBlock.classList.add('disabled');
		}
	}
}

//Слайдер изображений------------------------------------------------------------------
async function setBg() {
	if (settings.imagesApi === 'Git') {
		searchImageApi.disabled = true;
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
	if (settings.imagesApi === 'Unsplash') {
		searchImageApi.disabled = false;
		const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${settings.apiTag}&client_id=MMol-SmcJ1splQ5_Ix6HvUkeDdTX0YT90JcNRRJ0KVs`;
		const resolve = await fetch(url);
		const result = await resolve.json();
		const imageUrl = result.urls.regular;
		const img = new Image();
		img.src = imageUrl;
		img.addEventListener('load', () => {
			body.style.backgroundImage = `url('${imageUrl}')`;
		});
	}
	if (settings.imagesApi === 'Flickr') {
		searchImageApi.disabled = false;
		const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=c61b16741f2cc297ca086aab66e44795&tags=${settings.apiTag}&extras=url_l&format=json&nojsoncallback=1`;
		const resolve = await fetch(url);
		const result = await resolve.json();
		let imageUrl
		for (let i = 0; i < result.photos.photo.length; i++) {
			if (result.photos.photo[flickrCount].url_l && result.photos.photo[flickrCount].height_l && result.photos.photo[flickrCount].height_l < result.photos.photo[flickrCount].width_l) {
				imageUrl = result.photos.photo[flickrCount].url_l;
				break;
			} else {
				getNextSlide();
			}
		}
		const img = new Image();
		img.src = imageUrl;
		img.addEventListener('load', () => {
			body.style.backgroundImage = `url('${imageUrl}')`;
		});
	}
}

function getNextSlide() {
	if (randomImageNumber < 20) {
		randomImageNumber += 1;
	} else randomImageNumber = 1;
	if (flickrCount < 100) {
		flickrCount += 1;
	} else flickrCount = 1;
	setBg();
}

function getPrevSlide() {
	if (randomImageNumber > 1) {
		randomImageNumber -= 1;
	} else randomImageNumber = 20;
	if (flickrCount > 1) {
		flickrCount -= 1;
	} else flickrCount = 100;
	setBg();
}


let flickrCount = Math.floor(Math.random() * 100 + 1);;
let randomImageNumber = Math.floor(Math.random() * 20 + 1);
const body = document.querySelector('body');
setBg();
const nextSlide = document.querySelector('.slide-next');
const prevSlide = document.querySelector('.slide-prev');
nextSlide.addEventListener('click', getNextSlide);
prevSlide.addEventListener('click', getPrevSlide);

// Погода---------------------------------------------------------------------
const weatherCity = document.querySelector('.city');
weatherCity.placeholder = languages[settings.currentLang].city[0];
weatherCity.value = languages[settings.currentLang].city[1];
const weatherIcon = document.querySelector('.weather-icon');
const weatherTemp = document.querySelector('.temperature');
const weatherDesc = document.querySelector('.weather-description');
const weatherWind = document.querySelector('.wind');
const weatherHumi = document.querySelector('.humidity');
weatherCity.addEventListener('change', () => {
	getWeather();
	weatherCity.blur();
});

async function getWeather() {
	const windDirections = {
		[languages[settings.currentLang].wind[0]]: [337.5, 360],
		[languages[settings.currentLang].wind[0]]: [0, 22.5],
		[languages[settings.currentLang].wind[1]]: [22.5, 67.5],
		[languages[settings.currentLang].wind[2]]: [67.5, 112.5],
		[languages[settings.currentLang].wind[3]]: [112.5, 157.5],
		[languages[settings.currentLang].wind[4]]: [157.5, 202.5],
		[languages[settings.currentLang].wind[5]]: [202.5, 247.5],
		[languages[settings.currentLang].wind[6]]: [247.5, 292.5],
		[languages[settings.currentLang].wind[7]]: [292.5, 337.5]
	};
	let direction;
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCity.value}&lang=${settings.currentLang}&appid=e1fc18dd49c14287ed9de7cdafd21b6a&units=metric`;
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
		weatherWind.textContent = `${languages[settings.currentLang].weather[0]}: ${direction}, ${Math.round(weatherData.wind.speed)} ${languages[settings.currentLang].weather[1]}`;
		weatherHumi.textContent = `${languages[settings.currentLang].weather[2]}: ${weatherData.main.humidity}%`
		errorData.textContent = '';
	} catch (error) {
		errorData.textContent = languages[settings.currentLang].error;
		weatherIcon.textContent = '';
		weatherTemp.textContent = '';
		weatherDesc.textContent = '';
		weatherWind.textContent = '';
		weatherHumi.textContent = '';
	}
} getWeather();

// Виджет цитат------------------------------------------------------------------
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const qouteChange = document.querySelector('.change-quote');
qouteChange.addEventListener('click', () => {
	qouteChange.classList.toggle('active');
	getQuote();
});


async function getQuote() {
	let randomQuoteNumber = Math.floor(Math.random() * 19);
	const res = await fetch (`../assets/quotes-${settings.currentLang}.json`);
	const quoteText = await res.json();
	quote.textContent = `"${quoteText[randomQuoteNumber].text}"`;
	author.textContent = quoteText[randomQuoteNumber].author;
} getQuote();

// Аудиоплеер--------------------------------------------------------------------------
const audio = document.querySelector('.audio');
const play = document.querySelector('.play');
const nextSong = document.querySelector('.play-next');
const prevSong = document.querySelector('.play-prev');
const playListContainer = document.querySelector('.play-list');
const audioName = document.querySelector('.track-name');
const audioProgressBar = document.querySelector('.progress-bar');
const audioProgressContainer = document.querySelector('.progress-container');
const audioTime = document.querySelector('.audio-time');
const audioMute = document.querySelector('.mute');
const volume = document.querySelector('.volume-progress');

let isPlay = false;
let isMuted = false;
let playNumber = 0;
import { playList } from './playList.js';
audio.src = playList[playNumber].src;
audio.volume = 0.25;
playList.forEach((value) => {
	const li = document.createElement('li');
	li.classList.add('play-item');
	li.textContent = value.title;
	playListContainer.append(li);
});

const items = document.querySelectorAll('.play-item');

function playAudio() {
  audio.play();
  isPlay = true;
  play.classList.add('pause');
  glowAudioNumber();
  showAudioName();
}

function pauseAudio() {
  audio.pause();
  isPlay = false;
  play.classList.remove('pause');
  glowAudioNumber();
  showAudioName();
}

function nextAudio() {
  playNumber += 1;
  if (playNumber > playList.length - 1) {
    playNumber = 0;
  }
  audio.src = playList[playNumber].src;
  if (isPlay) {
	audio.play();
	glowAudioNumber();
	showAudioName();
  } else {
	playAudio();
  }
}

function prevAudio() {
	playNumber -= 1;
	if (playNumber < 0) {
	  playNumber = playList.length - 1;
	}
	audio.src = playList[playNumber].src;
	if (isPlay) {
	  audio.play();
	  glowAudioNumber();
	  showAudioName();
	} else {
	  playAudio();
	}
}

function glowAudioNumber() {
	playList.forEach((value, index) => {
		if (isPlay && index === playNumber) {
			items[index].classList.add('playing');
		} else {
			items[index].classList.remove('playing');
		}
	});
}

function showAudioName() {
	if (isPlay) {
		audioName.textContent = playList[playNumber].title;
	}
}

function updateAudioProgress() {
	const progressPercent = (audio.currentTime / audio.duration) * 100;
	audioProgressBar.style.width = `${progressPercent}%`
	if (isPlay) {
		const alreadyPlaySecond = String(Math.round(audio.currentTime % 60)).padStart(2, '0');
		const alreadyPlayMinutes = String(Math.trunc(audio.currentTime / 60)).padStart(2, '0');
		let durationSeconds = String(Math.round(audio.duration % 60)).padStart(2, '0');
		if (isNaN(durationSeconds)) {
			durationSeconds = '00';
		}
		let durationMinutes = String(Math.trunc(audio.duration / 60)).padStart(2, '0');
		if (isNaN(durationMinutes)) {
			durationMinutes = '00';
		}
		audioTime.textContent = `${alreadyPlayMinutes}:${alreadyPlaySecond}/${durationMinutes}:${durationSeconds}`;
	} 
}

function setProgress(click) {
	const width = this.clientWidth;
	const clickX = click.offsetX;
	audio.currentTime = clickX / width * audio.duration;
	playAudio();
} 

function setVolume() {
	const volumePercent = this.value / 100;
	audio.volume = volumePercent;
}

function muteAudio() {
	if (isMuted) {
		audio.muted = false;
		audioMute.classList.remove('unmute');
		isMuted = false;
	} else {
		audio.muted = true;
		audioMute.classList.add('unmute');
		isMuted = true;
	}
}


items.forEach((value, index) => {
	value.addEventListener('click', () => {
		if (isPlay && playNumber === index) {
			pauseAudio();
		} else {
			playNumber = index;
			audio.src = playList[playNumber].src;
			playAudio();
		}
	});
});

play.addEventListener('click', () => {
  if (isPlay) {
    pauseAudio();
  } else {
    playAudio();
  }
});
nextSong.addEventListener('click', nextAudio);
prevSong.addEventListener('click', prevAudio);
audio.addEventListener('ended', nextAudio);
audio.addEventListener('timeupdate', updateAudioProgress);
audioProgressContainer.addEventListener('click', setProgress);
volume.addEventListener('change', setVolume);
audioMute.addEventListener('click', muteAudio);
