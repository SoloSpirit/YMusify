class AjaxInterface {
	// Do request, available methods: GET, POST
	async sendRequest(method, url, data) {
		// Handle main errors
		if(!['GET', 'POST'].includes(method)) return console.error('Only GET an d POST methods are available.');
		if(!AjaxInterface.#validateUrl(url)) return console.error('Invalid URL for request.');

		switch(method) {
			case 'GET':
				return await AjaxInterface.#requestGet(url, data);
			case 'POST':
				return await AjaxInterface.#requestPost(url, data);
		}
	}

	// Do GET request
	static async #requestGet(url, data) {
		url = new URL(url);
		url.search = new URLSearchParams(data).toString();

		const options = {
			method: 'GET',
			mode: 'no-cors',
			cache: 'no-cache',
			headers: { 'Content-Type': 'application/json' },
		}

		return await fetch(url, options);
	}

	// Do POST request
	static async #requestPost(url, data) {
		const options = {
			method: 'POST',
			mode: 'no-cors',
			cache: 'no-cache',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		}

		return await fetch(url, options).json();
	}

	// URL validation
	static #validateUrl(url) {
		try {
			new URL(url);
		} catch(e) {
			return false;
		}

		return true;
	}
}