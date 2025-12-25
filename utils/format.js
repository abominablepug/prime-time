function formatText(factors) {
	if (factors.length === 0) return "";
	if (factors[0] === "No Prime Factors") return factors[0];
	if (factors[0] === "Time Limit Exceeded") return factors[0];

	const counts = {};
	for (let factor of factors) {
		counts[factor] = (counts[factor] || 0) + 1;
	}

	// 2. Format into "Base^Power" string
	const parts = [];
	for (let base in counts) {
		const power = counts[base];
		if (power === 1) {
			parts.push(base);
		} else {
			parts.push(`${base}<sup>${power}</sup>`);
		}
	}

	// 3. Join with multiplication sign
	return parts.join(" \u00D7 ");
}

export default formatText;
