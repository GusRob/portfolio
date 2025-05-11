const svg = document.getElementById("overlay-svg");
const hexTemplate = svg.querySelector("#overlay-hexagon");
console.debug(hexTemplate);
const numHexesHorizontal = 15;
const numHexesVertical = 7;
const spacing = 0.866025;
const wipe = false;

for (let j = 0; j < numHexesVertical; j++) {
	for (let i = 0; i < numHexesHorizontal; i++) {
		let MinOpacity = 0.5*Math.abs((i+1)-(numHexesHorizontal/2))/numHexesHorizontal;
		let StartInterval = 5 * Math.random();
		let Speed = 4 + Math.random();
		const clone = hexTemplate.cloneNode(true);
		clone.setAttribute("transform", `scale(10) translate(${i*spacing}, ${(2*j + (i%2))*1.5})`);
		clone.setAttribute("opacity", `${MinOpacity}`);
		const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
		animate.setAttribute("attributeName", "opacity");
		animate.setAttribute("dur", `${Speed}s`);
		animate.setAttribute("values", `${MinOpacity};${2*MinOpacity};${MinOpacity}`);
		animate.setAttribute("begin", `${StartInterval}s`); // Staggered start
		animate.setAttribute("repeatCount", "indefinite");
		clone.appendChild(animate);
		svg.appendChild(clone);
	}
}
