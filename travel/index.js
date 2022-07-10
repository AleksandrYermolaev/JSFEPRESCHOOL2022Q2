console.log('Вёрстка валидная +10\nВёрстка семантическая +20:\n<header>, <main>, <footer> +3\nчетыре элемента <section> (по количеству секций) +3\nтолько один заголовок <h1> +3\nтри заголовка <h2> +3\nодин элемент <nav> +3\nдва списка ul > li > a (панель навигации, ссылки на соцсети) +3\nчетыре кнопки <button> +2.\nВёрстка соответствует макету +48:\nблок <header> +6\nсекция preview +9\nсекция steps +9\nсекция destinations +9\nсекция stories +9\nблок <footer> +6.\nТребования к css + 12:\nдля построения сетки используются флексы +2\nпри уменьшении масштаба страницы браузера вёрстка размещается по центру, а не сдвигается в сторону +2\nфоновый цвет тянется на всю ширину страницы +2\nиконки добавлены в формате .svg +2\nизображения добавлены в формате .jpg +2\nесть favicon +2.\nИнтерактивность, реализуемая через css +20:\nплавная прокрутка по якорям +5\nиконки соцсетей в футере при нажатии на них ведут на гитхаб автора проекта и доабвлена своя иконка RSSchool +5\nинтерактивность +5\nобязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике не влияющее на соседние элементы +5.');

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
