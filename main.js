// ### TESTS

const spotifyAPI = new SpotifyAPI();
const spotifyAuthCode = new URL(location.href).searchParams.get('code');

if(!spotifyAuthCode) {
	spotifyAPI.getAuthCode();
} else {
	console.log(spotifyAuthCode);
}