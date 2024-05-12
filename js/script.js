const settings = document.querySelector('.settings');
const settingsBtn = document.querySelector('.settings-btn');
const imageSection = document.querySelector('.image-section');

const eventNameInput = document.querySelector('#event-name');
const eventDayInput = document.querySelector('#event-day');
const eventMonthInput = document.querySelector('#event-month');
const eventYearInput = document.querySelector('#event-year');
const eventImgInput = document.querySelector('#event-image');

const daysCount = document.querySelector('.days-count');
const hoursCount = document.querySelector('.hours-count');
const minutesCount = document.querySelector('.minutes-count');
const secondsCount = document.querySelector('.seconds-count');

const saveBtn = document.querySelector('.save');
const eventSpan = document.querySelector('.event');
const errorInfo = document.querySelector('.error');

let usersTime;

const setTime = () => {
	const currentTime = new Date();
	const result = usersTime - currentTime;
	const days = Math.floor(result / 1000 / 60 / 60 / 24);
	const hours = Math.floor((result / 1000 / 60 / 60) % 24);
	const minutes = Math.floor((result / 1000 / 60) % 60);
	const seconds = Math.floor((result / 1000) % 60);

	daysCount.textContent = days;
	hoursCount.textContent = hours;
	minutesCount.textContent = minutes;
	secondsCount.textContent = seconds;
};

const settingActive = () => {
	settings.classList.toggle('active');
};
const appUpdate = () => {
	eventSpan.textContent = eventNameInput.value;
	usersTime = new Date(
		`${eventMonthInput.value} ${eventDayInput.value} ${eventYearInput.value}`
	);
	imageSection.style.backgroundImage = `url('${eventImgInput.value}')`;
	setTime();
};

const isValidDate = (day, month, year) => {
	const date = new Date(year, month - 1, day);
	return (
		date.getFullYear() === year &&
		date.getMonth() === month - 1 &&
		date.getDate() === day
	);
};
const checkValidDate = () => {
	const currentTime = new Date();
	const day = parseInt(eventDayInput.value);
	const month = parseInt(eventMonthInput.value);
	const year = parseInt(eventYearInput.value);
	if (!isValidDate(day, month, year)) {
		eventDayInput.value = Math.max(1, Math.min(31, day));
		eventMonthInput.value = Math.max(1, Math.min(12, month));
		return false;
	} else {
		return true;
	}
};

const count = () => {
	if (checkValidDate()) {
		appUpdate();
		errorInfo.textContent = '';
	} else {
		errorInfo.textContent = 'Fill correct date';
	}
};

[eventDayInput, eventMonthInput].forEach(input => {
	input.addEventListener('input', checkValidDate);
});
settingsBtn.addEventListener('click', settingActive);
saveBtn.addEventListener('click', count);
appUpdate();
setInterval(setTime, 1000);
