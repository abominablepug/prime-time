let popupId = null;

function showPopup(text) {
	removePopup();

	let popup = document.createElement("div");
	popupId = `primeTime-${Date.now()}`;
	popup.id = popupId;

	// 1. Create a span for the text (so innerHTML renders the <sup> tags)
	const content = document.createElement("span");
	content.innerHTML = text;
	popup.appendChild(content);

	// 2. Create the button with a Google Icon
	const btn = document.createElement("button");

	// Style the button to look like a clickable icon (remove default borders/gray bg)
	btn.style.background = "transparent";
	btn.style.border = "none";
	btn.style.cursor = "pointer";
	btn.style.marginLeft = "10px";
	btn.style.padding = "4px";
	btn.style.display = "flex";
	btn.style.alignItems = "center";
	btn.title = "Copy to clipboard";
	btn.style.transition = "transform 0.2s ease";
	btn.onmouseenter = () => {
		btn.style.transform = "scale(1.2)";
	};
	btn.onmouseleave = () => {
		btn.style.transform = "scale(1)";
	};

	// Create the icon span
	const icon = document.createElement("img");
	icon.src = chrome.runtime.getURL("../images/copy.png");
	icon.alt = "Copy";
	icon.style.width = "18px";
	icon.style.height = "18px";
	icon.style.display = "block";
	icon.style.pointerEvents = "none";

	btn.appendChild(icon);

	btn.onclick = () => {
		let cleanText;
		cleanText = text.replace(/<sup>/gm, "^");
		cleanText = cleanText.replace(/<\/sup>/gm, '');
		cleanText = cleanText.substring(cleanText.indexOf(":") + 2, cleanText.length);
		copyText(cleanText);
	};

	popup.appendChild(btn);

	// Apply positioning based on cursor location
	popup.style.position = "fixed";
	popup.style.left = `20px`;
	popup.style.top = `20px`;
	popup.style.backgroundColor = "white";
	popup.style.color = "black";
	popup.style.padding = "10px";
	popup.style.border = "1px solid black";
	popup.style.borderRadius = "5px";
	popup.style.zIndex = "999999";
	popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
	popup.style.display = "flex";
	popup.style.justifyContent = "evenly";
	popup.style.alignItems = "center";
	popup.style.fontSize = "16px";
	popup.style.fontFamily = "Arial, sans-serif";

	document.body.appendChild(popup);

	return popup;
}

function removePopup() {
	if (popupId) {
		document.getElementById(popupId)?.remove();
		popupId = null;
	}
}

const copyText = async (text) => {
	console.log(text);
	// 1. Try the modern Clipboard API (Works on HTTPS)
	if (navigator.clipboard && navigator.clipboard.writeText) {
		try {
			await navigator.clipboard.writeText(text);
			return; // Success - exit function
		} catch (err) {
			console.warn('Clipboard API failed, trying fallback...', err);
		}
	}

	// 2. Fallback method (Works on HTTP / older browsers)
	const textArea = document.createElement("textarea");
	textArea.value = text;

	// Ensure the textarea is part of the DOM but invisible
	textArea.style.position = "fixed";
	textArea.style.left = "-9999px";
	textArea.style.top = "0";
	document.body.appendChild(textArea);

	textArea.focus();
	textArea.select();

	try {
		const successful = document.execCommand('copy');
		if (!successful) throw new Error('Copy command failed.');
	} catch (err) {
		alert("Unable to copy: " + err);
	} finally {
		document.body.removeChild(textArea);
	}
};

export { showPopup, removePopup };
