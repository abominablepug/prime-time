export default function primeFactorization(n) {
	if (n === 1 || n === 0) return ["No Prime Factors"];
	let factors = [];
	let i = 2;
	while (i * i <= n) {
		while (n % i === 0) {
			factors.push(i);
			n /= i;
		}
		i++;
	}
	if (n > 1) factors.push(n);
	return factors;
}
