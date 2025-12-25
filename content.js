import primeFactorization from "./utils/factor.js";
import { showPopup, removePopup } from "./utils/popup.js";
import formatText from "./utils/format.js";

let timeoutId;

const createPopup = async () => {
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
}

// Main event listener for Ctrl + F
window.addEventListener("keydown", async (event) => {

	const isMatch =
		event.key.toUpperCase() === currentKeybind.key &&
		event.ctrlKey === currentKeybind.ctrlKey &&
		event.shiftKey === currentKeybind.shiftKey &&
		event.altKey === currentKeybind.altKey &&
		event.metaKey === currentKeybind.metaKey;

	if (!isMatch || currentKeybind.key === "ESCAPE") { return }
	else {
		await createPopup();
		// let selectedText = window.getSelection().toString().trim();
		// selectedText = selectedText.replace(/[.,\s\\]/g, "");
		//
		// clearTimeout(timeoutId);
		// removePopup();
		//
		// if (/^\d+$/.test(selectedText)) {
		// 	let num = parseInt(selectedText, 10);
		// 	let factors = primeFactorization(num, await getLimitFromStorage());
		//
		// 	const popupElement = showPopup(
		// 		`Prime Factors of ${selectedText}: ${formatText(factors)}`,
		// 	);
		//
		// 	startHideTimer();
		//
		// 	if (popupElement) {
		// 		popupElement.addEventListener("mouseenter", () => {
		// 			clearInterval(timeoutId);
		// 		});
		//
		// 		popupElement.addEventListener("mouseleave", () => {
		// 			startHideTimer();
		// 		});
		// 	}
		// };
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
	browser.storage.local.get(["keybind"]).then((result) => {
		if (result.keybind) {
			currentKeybind = result.keybind;
		}
	})
}

loadKeybind();

browser.storage.onChanged.addListener((changes, namespace) => {
	if (namespace === "local" && changes.keybind) {
		currentKeybind = changes.keybind.newValue;
	}
})

const getTimeoutFromStorage = async () => {
	const result = await browser.storage.local.get(["timeoutValue"]);
	const seconds = result.timeoutValue || 3000;
	return seconds;
}

const getLimitFromStorage = async () => {
	const result = await browser.storage.local.get(["limitValue"]);
	const seconds = result.limitValue || 3000;
	return seconds;
}

const startHideTimer = async () => {
	clearInterval(timeoutId);

	const duration = await getTimeoutFromStorage();

	timeoutId = setTimeout(() => {
		removePopup();
	}, duration);
}

// Remove popup when selection changes
document.addEventListener("selectionchange", async () => {
	removePopup();
	if (currentKeybind.key === "ESCAPE") {
		await createPopup();
	}
});

