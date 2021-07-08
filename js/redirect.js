document.addEventListener('DOMContentLoaded', () => {
	const tokenField = document.querySelector('[name="access_token"]');
	const copyBtn = document.querySelector('[data-action="copy"]');

	tokenField.value = getHashValue('access_token');

	copyBtn.addEventListener('click', async () => {
		await navigator.clipboard.writeText(tokenField.value);
		window.close();
	});
});

// Get hash value by key
function getHashValue(key) {
	const pattern = new RegExp(`[#?&]${key}=([^&]*)`)
	const value = location.hash.match(pattern);

	if(!value || value.length !== 2) return false;

	return decodeURIComponent(value[1]);
}