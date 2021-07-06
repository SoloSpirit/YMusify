// ### TESTS

const spotifyAPI = new SpotifyAPI();
const spotifyAuthCode = new URL(location.href).hash;
console.log(spotifyAuthCode);


document.addEventListener('DOMContentLoaded', () => {
	const spotifyConnectBtn = document.querySelector('.connect_spotify');

	spotifyConnectBtn.addEventListener('click', () => {
		// if (!spotifyAuthCode) {
		// 	spotifyAPI.openLoginWindow();
		// } else {
		// 	console.log(spotifyAuthCode);
		// }

		spotifyAPI.openLoginWindow();
	});
});