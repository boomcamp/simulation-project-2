export default function DateToday() {
	let calendar = new Date();
	let date = calendar.getUTCDate();
	let month = calendar.getUTCMonth();
	let hours = calendar.getHours();
	let min = calendar.getUTCMinutes();
	let sec = calendar.getUTCSeconds();
	let year = calendar.getUTCFullYear();

	let today = `${month}/${date}/${year}  ${hours}:${min}:${sec}`;
	return { today };
}
