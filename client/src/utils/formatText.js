// export default function(inputText) {
// 	return true;
// }
function formatText(inputText) {
	let formattedText =
		'<p>' +
		inputText.replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br>') +
		'</p>';
}

function linkify(urlText) {
	return `<a href='${urlText}' target='_blank'>${urlText}</a>`;
	// or alternatively
	// return text.replace(urlRegex, '<a href="$1">$1</a>')
}

console.log(
	linkify(
		'https://www.dropbox.com/sh/pfr7rvfi2c47u5n/AABEhFYr4urqFLAhmpF2MPQNa?dl=0'
	)
);
