// Constants for YMusify API
const SPOTIFY_CLIENT_ID = '8469a359cbb048ee8cb53dbbb255f17f';
const REDIRECT_URI = 'https://solospirit.github.io/YMusify/redirect.html';

// Create main API instance
const yMusify = new YMusify(SPOTIFY_CLIENT_ID, REDIRECT_URI);

document.addEventListener('DOMContentLoaded', () => {
	const app = document.querySelector('.app');

	// The architecture of the application is simple, so let's use event delegation
	app.addEventListener('click', async event => {
		const action = event.target.dataset.action;
		const toScreen = event.target.dataset.to_screen;

		switch (action) {
			// Get Spotify access token
			case 'get_spotify_token':
				yMusify.spotifyGetAccessToken();

				break;
			// Set Spotify access token
			case 'set_spotify_token':
				const spotifyAccessTokenInput = document.querySelector('[name="spotify_access_token"]');

				if (spotifyAccessTokenInput.value.length < 20) {
					spotifyAccessTokenInput.parentElement.classList.add('error');
					return alert('Token is invalid');
				} else {
					const tokenIsSet = await yMusify.spotifySetAccessToken(spotifyAccessTokenInput.value);

					if (tokenIsSet) {
						spotifyAccessTokenInput.parentElement.classList.remove('error');
					} else {
						spotifyAccessTokenInput.parentElement.classList.add('error');
						return alert('Token is invalid');
					}
				}

				break;
			// Set Yandex.Music access token
			case 'set_ymusic_token':
				const yMusicLoginInput = document.querySelector('[name="ymusic_login"]');
				const yMusicPasswordInput = document.querySelector('[name="ymusic_password"]');

				if (yMusicLoginInput.value.length < 8) {
					yMusicLoginInput.parentElement.classList.add('error');
					return alert('Yandex login is invalid')
				} else {
					yMusicLoginInput.parentElement.classList.remove('error');
				}

				if (yMusicPasswordInput.value.length < 4) {
					yMusicPasswordInput.parentElement.classList.add('error');
					return alert('Yandex password is invalid')
				} else {
					yMusicPasswordInput.parentElement.classList.remove('error');
				}

				const yMusicAccessToken = await yMusify.yMusicGetAccessToken(yMusicLoginInput.value, yMusicPasswordInput.value);
				if (!yMusicAccessToken) {
					yMusicLoginInput.parentElement.classList.add('error');
					yMusicPasswordInput.parentElement.classList.add('error');
					return alert('Yandex login / password is invalid');
				} else {
					yMusify.yMusicSetAccessToken(yMusicAccessToken);
					yMusicLoginInput.parentElement.classList.remove('error');
					yMusicPasswordInput.parentElement.classList.remove('error');
				}

				break;
			//	Start music transfer in chosen way
			case 'start_music_transfer':
				app.classList.add('processing');
				event.target.parentNode.style.opacity = '0';

				const transferType = document.querySelector('[name="transfer_type"]:checked').value;
				const result = await yMusify.startMusicTransfer(transferType);

				app.classList.remove('processing');
				if(!result) return alert('Something went wrong. Please, try again later');
		}

		if(toScreen) goToScreen(toScreen);
	});
});

// Show the desired application screen depending on the step number
function goToScreen(appScreenNumber) {
	const app = document.querySelector('.app');
	appScreenNumber *= 1;

	// Set application start class
	if(appScreenNumber <= 1) app.classList.add('app_start');

	// Screen animation
	const animationDuration = 300;
	const appScreens = document.querySelectorAll('[data-screen]');
	const appScreenActive = document.querySelector(`[data-screen="${appScreenNumber}"]`);

	appScreens.forEach(screen => screen.style.opacity = '0');
	setTimeout(() => {
		appScreens.forEach(screen => screen.classList.add('hidden'));
		appScreenActive.classList.remove('hidden');
	}, animationDuration);

	setTimeout(() => {
		appScreenActive.style.opacity = '1';

		// Remove application start class
		if(appScreenNumber > 1) app.classList.remove('app_start');
	}, animationDuration + 100)

	// Set new screen number to back button
	document.querySelector('.back[data-to_screen]').dataset.to_screen = `${appScreenNumber - 1}`;
}