new Vue({
	el: '#links',
	data: {
		artists: [],
		genres: [],
		links: [],
		serverPath: '/link',
		artist: null,
		genre: null,
	},
	created: function () {
		console.log('Vue Artists Created');
		this.getAllLinks();
		this.getAllGenres();
		this.getAllArtists();
	},
	methods: {
		getAllLinks: function () {
			axios.get(this.serverPath).then(links => {
				if (links.data.code == 200) {
					this.links = links.data.content;
				} else {
					alert('error on gettings artists');
				}
			})
		},
		getAllGenres: function () {
			axios.get('/genre').then(genres => {
				if (genres.data.code == 200) {
					this.genres = genres.data.content;
				} else {
					alert('error on gettings genres');
				}
			})
		},
		getAllArtists: function () {
			var self = this;
			axios.get('/artist').then(artists => {
				if (artists.data.code == 200) {
					this.artists = artists.data.content;
				} else {
					alert('error on gettings artists');
				}
			})
		},
		newArtist: function () {
			this.artist = {
				nume: '',
				nume_scena: '',
				an_nastere: ''
			};
			this.mode = 'edit';
		},
		cancelEdit: function () {
			this.artist = null;
			this.mode = 'list';
		},
		editArtist: function (artist) {
			this.artist = artist;
			this.mode = 'edit';
		},
		saveLink: function () {
			console.log(this.artist, this.genre)
			if (!this.artist || !this.genre ) {
				return alert('Fields empty');
			}
			axios.post(this.serverPath, {
				link: {
					mId: this.artist,
					smId: this.genre
				}
			}).then(link => {
				if(link.data.code == 200) {
					this.artist = null;
					this.genre = null;
					this.getAllLinks();
					alert('Added');
				}
			})
		},
		deleteLink: function(mId) {
			axios.delete(this.serverPath + '/' + mId).then(result => {
				if (result.data.code == 200) {
					alert('deleted');
					this.getAllLinks();
				} else {
					alert('not deleted');
				}
			})
		}

	}
})