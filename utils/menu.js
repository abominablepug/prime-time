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

const formatKeyString = (kb) => {
	let parts = [];
	if (kb.ctrlKey) parts.push("Ctrl");
	if (kb.metaKey) parts.push("Cmd");
	if (kb.altKey) parts.push("Alt");
	if (kb.shiftKey) parts.push("Shift");
	parts.push(kb.key);
	return parts.join(" + ");
}

const setupKeybindInput = () => {
	const input = document.querySelector(".keybindInput");
	const output = document.querySelector(".keybindOutput");
	output.style.opacity = "0";

	chrome.storage.local.get(["keybind"], (result) => {
		if (result.keybind) {
			input.value = formatKeyString(result.keybind);
		} else {
			input.value = "Ctrl + Shift + F";
		}
	});

	input.addEventListener("keydown", (e) => {
		e.preventDefault();

		if (["Control", "Shift", "Alt", "Meta"].includes(e.key)) return;

		const newKeybind = {
			key: e.key.toUpperCase(),
			ctrlKey: e.ctrlKey,
			shiftKey: e.shiftKey,
			altKey: e.altKey,
			metaKey: e.metaKey
		};

		input.value = formatKeyString(newKeybind);

		chrome.storage.local.set({ keybind: newKeybind }, () => {
			output.style.opacity = "1";
			setTimeout(() => { output.style.opacity = "0"; }, 1000);
		})
	})

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
	setupKeybindInput();
	timeoutRange();
	limitRange();
}

setupInputs();

