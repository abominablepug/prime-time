import primeFactorization from "./utils/factor.js";
import { showPopup, removePopup } from "./utils/popup.js";
import formatText from "./utils/format.js";

let timeoutId;

// Main event listener for Ctrl + F
window.addEventListener("keydown", async (event) => {

	const isMatch =
		event.key.toUpperCase() === currentKeybind.key &&
		event.ctrlKey === currentKeybind.ctrlKey &&
		event.shiftKey === currentKeybind.shiftKey &&
		event.altKey === currentKeybind.altKey &&
		event.metaKey === currentKeybind.metaKey;

	if (!isMatch) { return }
	else {
		let selectedText = window.getSelection().toString().trim();
		selectedText = selectedText.replace(/[.,\s\\]/g, "");

		clearTimeout(timeoutId);
		removePopup();

		if (/^\d+$/.test(selectedText)) {
			let num = parseInt(selectedText, 10);
			let factors = primeFactorization(num, await getLimitFromStorage());

			const popupElement = showPopup(
				`Prime Factors of ${selectedText}: ${formatText(factors)}`,
			);

			startHideTimer();

			if (popupElement) {
				popupElement.addEventListener("mouseenter", () => {
					clearInterval(timeoutId);
				});

				popupElement.addEventListener("mouseleave", () => {
					startHideTimer();
				});
			}
		};
	};
});

let currentKeybind = {
	key: "F",
	ctrlKey: true,
	shiftKey: true,
	altKey: false,
	metaKey: false,
}

const loadKeybind = () => {
	chrome.storage.local.get(["keybind"], (result) => {
		if (result.keybind) {
			currentKeybind = result.keybind;
		}
	})
}

loadKeybind();

chrome.storage.onChanged.addListener((changes, namespace) => {
	if (namespace === "local" && changes.keybind) {
		currentKeybind = changes.keybind.newValue;
	}
})

const getTimeoutFromStorage = () => {
	return new Promise((resolve) => {
		chrome.storage.local.get(["timeoutValue"], (result) => {
			const seconds = result.timeoutValue || 3000;
			resolve(seconds);
		});
	});
}

const getLimitFromStorage = () => {
	return new Promise((resolve) => {
		chrome.storage.local.get(["limitValue"], (result) => {
			const seconds = result.limitValue || 3000;
			resolve(seconds);
		});
	});
}

const startHideTimer = async () => {
	clearInterval(timeoutId);

	const duration = await getTimeoutFromStorage();

	timeoutId = setTimeout(() => {
		removePopup();
	}, duration);
}

// Remove popup when selection changes
window.addEventListener("selectionchange", function() {
	let selectedText = document.getSelection().toString().trim();
	if (!/^\d+$/.test(selectedText)) {
		removePopup();
	}
});

