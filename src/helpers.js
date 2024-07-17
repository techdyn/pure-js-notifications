import { cleanHTML } from './htmlSanitizer';

export const partial = (fn, ...presetArgs) => (...laterArgs) => fn(...presetArgs, ...laterArgs);

export const append = (el, ...children) => children.forEach(child => el.appendChild(child));

export const isString = input => typeof input === 'string';

export const createElement = (elementType, ...classNames) => {
	const element = document.createElement(elementType);

	if(classNames.length) {
		classNames.forEach(currentClass => element.classList.add(currentClass));
	}

	return element;
};

const setInnerText = (element, text) => {
	element.innerText = text;
	return element;
};

const setInnerHTML = (element, html) => {
	element.innerHTML = cleanHTML(html, false);
	return element;
};

const createTextElement = (elementType, ...classNames) => partial(setInnerText, createElement(elementType, ...classNames));

const createHTMLElement = (elementType, ...classNames) => partial(setInnerHTML, createElement(elementType, ...classNames));

export const createParagraph = (...classNames) => createTextElement('p', ...classNames);

export const createParagraphHTML = (...classNames) => createHTMLElement('p', ...classNames);