// Constants for YMusify API
const SPOTIFY_CLIENT_ID = '8469a359cbb048ee8cb53dbbb255f17f';
const REDIRECT_URI = 'https://solospirit.github.io/YMusify/redirect.html';

// Create main API instance
const yMusify = new YMusify(SPOTIFY_CLIENT_ID, REDIRECT_URI);

document.addEventListener('DOMContentLoaded', () => {
	const app = document.querySelector('.app');

	// The architecture of the application is simple, so let's use event delegation
	app.addEventListener('click', event => {
		const action = event.target.dataset.action;

		switch (action) {
			// Get Spotify access token
			case 'get_spotify_token':
				yMusify.spotifyGetAccessToken();

				break;
			// Go to the specified step
			case 'go_to_step':
				const step = event.target.dataset.to_step;
				const isBack = event.target.classList.contains('back');

				goToStep(step, isBack);

				break;
		}

	});
});

// Show the desired application screen depending on the step number
async function goToStep(applicationStep, isBack) {
	applicationStep *= 1;

	const app = document.querySelector('.app');

	if(applicationStep > 1)
		app.classList.remove('app_start');
	else
		app.classList.add('app_start');

	if (!isBack) {
		switch (applicationStep) {
			// Spotify access token validation
			case 3:
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
		}
	}

	document.querySelectorAll('[data-step]').forEach(section => section.classList.add('hidden'));
	document.querySelector(`[data-step="${applicationStep}"]`).classList.remove('hidden');
	document.querySelector('.back[data-to_step]').dataset.to_step = `${applicationStep - 1}`;
}