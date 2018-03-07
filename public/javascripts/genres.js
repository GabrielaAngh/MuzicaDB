new Vue({
	el: '#genres',
	data: {
		genres: [],
		mode: 'list',
		serverPath: '/genre',
		genre: null,
	},
	created: function () {
		console.log('Vue Genres Created');
		this.getAllGenres();
	},
	methods: {
		getAllGenres: function () {
			var self = this;
			axios.get(this.serverPath).then(artists => {
				if (artists.data.code == 200) {
					self.genres = artists.data.content;
				} else {
					alert('error on gettings genres');
				}
			})
		},
		newGenre: function () {
			this.genre = {
				nume: '',
				anAparitie: '',
				origine: ''
			};
			this.mode = 'edit';
		},
		cancelEdit: function () {
			this.genre = null;
			this.mode = 'list';
		},
		editGenre: function (genre) {
			this.genre = genre;
			this.mode = 'edit';
		},
		saveGenre: function () {
			if (this.genre.name == '' || this.genre.anAparitie == '' || this.genre.origine == '') {
				return alert('Fields empty');
			}
			if (this.genre.hasOwnProperty('smId')) {
				axios.put(this.serverPath, { genre: this.genre }).then(result => {
					if (result.data.code == 200) {
						alert('updated');
						this.getAllGenres();
						this.cancelEdit();
					} else {
						alert('not saved');
					}
				});
			} else {
				axios.post(this.serverPath, { genre: this.genre }).then(result => {
					if (result.data.code == 200) {
						alert('saved');
						this.getAllGenres();
						this.cancelEdit();
					} else {
						alert('not saved');
					}
				});
			}
		},
		deleteArtist: function(smId) {
			axios.delete(this.serverPath + '/' + smId).then(result => {
				if (result.data.code == 200) {
					alert('deleted');
					this.getAllArtists();
				} else {
					alert('not deleted');
				}
			})
		}

	}
})