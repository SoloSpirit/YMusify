// Tracks class. Contains array of tracks in unified style (see add method)
class Tracks {
	#_list = [];

	// Add track to track list:
	// - id - track id (depending on source)
	// - name - track name
	// - artist - author of the track
	// - album - track album
	// - albumId - track album id (depending on source)
	add(id, name, artist, album, albumId) {
		this.#_list.push({
			id: id,
			name: name,
			artist: artist,
			album: album,
			albumId: albumId
		});
	};

	// Getter - get track list
	get list() {
		return this.#_list;
	}
}