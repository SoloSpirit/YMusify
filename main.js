// ### TESTS

const spotifyAPI = new SpotifyAPI();
const spotifyAuthCode = new URL(location.href).searchParams.get('code');

const spotifyConnectBtn = document.querySelector('.connect_spotify');

spotifyConnectBtn.addEventListener('click', () => {
	// if (!spotifyAuthCode) {
	// 	spotifyAPI.openLoginWindow();
	// } else {
	// 	console.log(spotifyAuthCode);
	// }

	spotifyAPI.getUser('04jcyi71zk6szw13n26wcipa1');
});