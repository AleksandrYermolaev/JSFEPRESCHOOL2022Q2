console.log('Вёрстка соответствует макету. Ширина экрана 390px +48:\nблок <header> +6\nсекция preview +9\nсекция steps +9\nсекция destinations +9\nсекция stories +9\nблок <footer> +6\nНи на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15:\nнет полосы прокрутки при ширине страницы от 1440рх до 390px +7\nнет полосы прокрутки при ширине страницы от 390px до 320рх +8\nНа ширине экрана 390рх и меньше реализовано адаптивное меню +22:\nпри ширине страницы 390рх панель навигации скрывается, появляется бургер-иконка +2\nпри нажатии на бургер-иконку плавно появляется адаптивное меню +4\nадаптивное меню соответствует макету +4\nпри нажатии на крестик адаптивное меню плавно скрывается уезжая за экран +4\nссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +4 (все кроме Account, она пока что просто закрывает меню)\nпри клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна +4');

// Прокрутка при клике на ссылки бургер меню
const burgerItems = document.querySelectorAll('.burger__link[data-goto]');
if (burgerItems.length > 0) {
	burgerItems.forEach(burgerItem => {
		burgerItem.addEventListener("click", onBurgerLinkClick);
	})
	function onBurgerLinkClick(link) {
		const burgerItem = link.target;
		if (burgerItem.dataset.goto && document.querySelector(burgerItem.dataset.goto)) {
			const goSection = document.querySelector(burgerItem.dataset.goto);
			const goSectionValue = goSection.getBoundingClientRect().top + scrollY;
			window.scrollTo({
				top: goSectionValue, 
				behavior: "smooth"
			});
			link.preventDefault();
		}
	}
}

// Появление бургер меню
const burgerIcon = document.querySelector('.burger__icon');
if (burgerIcon) {
	const burgerMenu = document.querySelector('.burger__menu');
	const body = document.querySelector('.body-filter');
	burgerIcon.addEventListener("click", function(e) {
		document.body.classList.toggle('_lock');
		burgerMenu.classList.toggle('_active');
		body.classList.toggle('_active');
	});
}
const burgerIconClose = document.querySelector('.burger__list');
if (burgerIconClose) {
	const burgerMenu = document.querySelector('.burger__menu');
	const body = document.querySelector('.body-filter');
	burgerIconClose.addEventListener("click", function(e) {
		document.body.classList.toggle('_lock');
		burgerMenu.classList.toggle('_active');
		body.classList.toggle('_active');
	});
}
const burgerBodyClose = document.querySelector('.body-filter');
if (burgerBodyClose) {
	const burgerMenu = document.querySelector('.burger__menu');
	const body = document.querySelector('.body-filter');
	burgerBodyClose.addEventListener("click", function(e) {
		document.body.classList.toggle('_lock');
		burgerMenu.classList.toggle('_active');
		body.classList.toggle('_active');
	});
}

//Появление Log In popup

const popup = document.querySelector('.popup');
const popupBody = document.querySelector('.popup__body');
const popupOpenLinks = document.querySelectorAll('.popup__open-link');	
	if (popupOpenLinks) {
		for (let openLink of popupOpenLinks) {
			openLink.addEventListener('click', () => {
				document.body.classList.toggle('_lock');
				popup.classList.toggle('visible');
				popupBody.classList.toggle('visible');
			});
		}

	}
//Скрытие popup
popup.addEventListener('click', (event) => {
	if (event.target.classList.contains('popup')) {
		document.body.classList.toggle('_lock');
		popup.classList.toggle('visible');
		popupBody.classList.toggle('visible');
	}
});

//Смена Log in popup на Sign In popup
const loginFields = document.querySelectorAll('.login');
const signupFields = document.querySelectorAll('.signup');
const changePopupToSignin = document.querySelector('.register__link');
const changePopupToLogin = document.querySelector('.login__link');
changePopupToSignin.addEventListener('click', () => {
	for (let logField of loginFields) {
		logField.classList.toggle('popup__switch');
	}
	for (let signField of signupFields) {
		signField.classList.toggle('popup__switch');
	}
});
changePopupToLogin.addEventListener('click', () => {
	for (let logField of loginFields) {
		logField.classList.toggle('popup__switch');
	}
	for (let signField of signupFields) {
		signField.classList.toggle('popup__switch');
	}
});

// Вывод даннх из полей E-mail и Password в браузерный alert
const emailData = document.querySelector('.email');
const passData = document.querySelector('.pass')
const submitButton = document.querySelector('.submit.login');
console.log(emailData);
console.log(emailData.value);
submitButton.addEventListener('click', (emailData, passData) => {
	const emailText = emailData.value;
	alert(emailText);
})
