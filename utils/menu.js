import primeFactorization from "./factor.js"
import formatText from "./format.js";

const factorInput = () => {
	const input = document.querySelector(".menuInput");
	const button = document.querySelector(".menuBtn");
	const output = document.querySelector(".menuOutput");

	button.addEventListener("click", () => {

		const inputValue = input.value;

		const factors = primeFactorization(inputValue)

		output.textContent = formatText(factors);
	});
}

const secondText = (num) => {
	return num === 1 ? `1 second` : `${num} seconds`;
}

const timeoutRange = () => {
	const input = document.querySelector(".timeoutRange");
	const output = document.querySelector(".timeoutOutput");

	chrome.storage.local.get(["timeoutValue"], (result) => {
		if (result.timeoutValue) {
			input.value = result.timeoutValue / 1000;
			output.textContent = secondText(input.value);
		}
	});

	output.textContent = secondText(input.value);

	input.addEventListener("input", () => {
		output.textContent = secondText(input.value);

		chrome.storage.local.set({ timeoutValue: input.value * 1000 });
	})
}

const limitRange = () => {
	const input = document.querySelector(".limitRange");
	const output = document.querySelector(".limitOutput");

	chrome.storage.local.get(["limitValue"], (result) => {
		if (result.limitValue) {
			input.value = result.limitValue / 1000;
			output.textContent = secondText(input.value);
		}
	});

	output.textContent = secondText(input.value);

	input.addEventListener("input", () => {
		output.textContent = secondText(input.value);

		chrome.storage.local.set({ limitValue: input.value * 1000 });
	})
}

const setupInputs = () => {
	factorInput();
	timeoutRange();
	limitRange();
}

setupInputs();

