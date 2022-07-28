//Часы и календарь
const time = document.querySelector('.time');
const date = document.querySelector('.date');

function showTime() {
	const newDate = new Date();
	const currentTime = newDate.toLocaleTimeString();
	time.textContent = currentTime;
	showDate();
	setTimeout(showTime, 1000);
} showTime();

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