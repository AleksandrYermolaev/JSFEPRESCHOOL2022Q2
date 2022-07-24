console.log('Слайдер изображений в секции destinations +50:\nна десктоп варианте при клике на урезанную картинку слева или справа изображение меняется по принципу карусели (например если нажать правую картинку та что была в центре на уезжает налево, а та что была видна наполовину оказывается справа). Слайдер может быть как конечным так и бесконечным - данный критерий не должен влиять на оценку + 20\nТри точки внизу отображают "номер слайда", то есть каждому слайду соответствует свой кружочек, который становится активным при нахождении соответствующего ему слайда в центре. На мобильном варианте картинка одна, но поверх нее появляются стрелочки навигации (можно сделать как карусель или же затемнять кнопку если слайдер достиг края) +20\nАнимации плавного перемещения для слайдера +10\nНажатие на кнопку Login (кнопка Account в мобильной версии) показывает сверстанный логин попап + 50\nлогин попап соответствует верстке его закрытие происходит при клике вне попапа +25\nлогин попап имеет 2 инпута (email и пароль) при нажатии на кнопку Sign In показывается браузерный алерт с введенными данными (для реализации можно использовать тег ) +25\nНажатие на кнопку Register на Login попапе меняет разметку попапа на разметку Sign Up попапа согласно макету (То есть нажатие не закрывает модал а просто меняет его наполнение). +25');

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
const submitButtons = document.querySelectorAll('.submit');
for (let submitButton of submitButtons) {
	submitButton.addEventListener('click', () => {
		const emailData = document.querySelector('.email').value;
		const passData = document.querySelector('.pass').value;
		alert('Your E-mail: ' + emailData + '\n' + 'Your password: ' + passData);
	});
}

// Логика работы слайдера
function slider() {

	// Слайдер для десктопной версии
	if (document.documentElement.clientWidth > 767) {
		const slider = document.querySelector('.destinations__slider');
		const radioButton = document.querySelectorAll('.radio');
		slider.addEventListener('click', (event) => {
			if (event.target.classList.contains('spain')) {
				slider.style = 'transform: translateX(33.5%)';
				radioButton[0].checked = true;
			}
			if (event.target.classList.contains('japan')) {
				slider.style = 'transform: translateX(0%)';
				radioButton[1].checked = true;
			}
			if (event.target.classList.contains('usa')) {
				slider.style = 'transform: translateX(-33.5%)';
				radioButton[2].checked = true;
			}
		});
		radioButton[0].addEventListener('click', () => {
				slider.style = 'transform: translateX(33.5%)';
		});
		radioButton[1].addEventListener('click', () => {
			slider.style = 'transform: translateX(0%)';
		});
		radioButton[2].addEventListener('click', () => {
			slider.style = 'transform: translateX(-33.5%)';
		});
	}

	// Слайдер для мобильной версии
	// Переключение по кнопкам-стрелкам
	if (document.documentElement.clientWidth < 768) {
		const slider = document.querySelector('.destinations__slider');
		const radioButton = document.querySelectorAll('.radio');
		const nextSlide = document.querySelector('.slider-rightbar');
		const prevSlide = document.querySelector('.slider-leftbar');
		let count = 1;
		nextSlide.addEventListener('click', () => {
			if (count === 1) {
				slider.style.transform = 'translateX(-100%)';
				radioButton[count + 1].checked = true;
				nextSlide.style = 'opacity: 0.2';
				prevSlide.style = 'opacity: 1';
				count += 1;
			}
			if (count === 0) {
				slider.style.transform = 'translateX(0%)';
				radioButton[count + 1].checked = true;
				nextSlide.style = 'opacity: 1';
				prevSlide.style = 'opacity: 1';
				count += 1;
			}
		});
		prevSlide.addEventListener('click', () => {
			if (count === 1) {
				slider.style.transform = 'translateX(100%)';
				radioButton[count - 1].checked = true;
				prevSlide.style = 'opacity: 0.2';
				nextSlide.style = 'opacity: 1';
				count -= 1;
			}
			if (count === 2) {
				slider.style.transform = 'translateX(0%)';
				radioButton[count - 1].checked = true;
				prevSlide.style = 'opacity: 1';
				nextSlide.style = 'opacity: 1';
				count -= 1;
			}
		});

		// Переключение по свайпу
		slider.addEventListener('touchstart', getTouchStart);
		slider.addEventListener('touchmove', getTouchMove);
		let x1;
		function getTouchStart(event) {
			x1 = event.touches[0].clientX;
		}
		function getTouchMove(event) {
			if (x1) {
				let x2 = event.touches[0].clientX;
				if (x2 > x1) {
					slider.addEventListener('touchend', () => {
						if (count === 1) {
							slider.style.transform = 'translateX(100%)';
							radioButton[count - 1].checked = true;
							prevSlide.style = 'opacity: 0.2';
							nextSlide.style = 'opacity: 1';
							count -= 1;
						}
						if (count === 2) {
							slider.style.transform = 'translateX(0%)';
							radioButton[count - 1].checked = true;
							prevSlide.style = 'opacity: 1';
							nextSlide.style = 'opacity: 1';
							count -= 1;
						}
					})
				} else {
					slider.addEventListener('touchend', () => {
					if (count === 1) {
						slider.style.transform = 'translateX(-100%)';
						radioButton[count + 1].checked = true;
						nextSlide.style = 'opacity: 0.2';
						prevSlide.style = 'opacity: 1';
						count += 1;
					}
					if (count === 0) {
						slider.style.transform = 'translateX(0%)';
						radioButton[count + 1].checked = true;
						nextSlide.style = 'opacity: 1';
						prevSlide.style = 'opacity: 1';
						count += 1;
					}
				});
				}
			}
			x1 = null;
		}
		 
		// Переключение по чекбоксам
		radioButton[0].addEventListener('click', () => {
			slider.style = 'transform: translateX(100%)';
			prevSlide.style = 'opacity: 0.2';
			nextSlide.style = 'opacity: 1';
			count = 0;
		});
		radioButton[1].addEventListener('click', () => {
			slider.style = 'transform: translateX(0%)';
			prevSlide.style = 'opacity: 1';
			nextSlide.style = 'opacity: 1';
			count = 1;
		});
		radioButton[2].addEventListener('click', () => {
			slider.style = 'transform: translateX(-100%)';
			nextSlide.style = 'opacity: 0.2';
			prevSlide.style = 'opacity: 1';
			count = 2;
		});
	}
}
slider();
window.addEventListener('resize', slider);
