new Vue({
	el: '#artists',
	data: {
		artists: [],
		mode: 'list',
		serverPath: '/artist',
		artist: null,
	},
	created: function () {
		console.log('Vue Artists Created');
		this.getAllArtists();
	},
	methods: {
		getAllArtists: function () {
			var self = this;
			axios.get(this.serverPath).then(artists => {
				if (artists.data.code == 200) {
					self.artists = artists.data.content;
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
		saveArtist: function () {
			if (this.artist.name == '' || this.artist.nume_scena == '' || this.artist.an_nastere == '') {
				return alert('Fields empty');
			}
			if (this.artist.hasOwnProperty('mId')) {
				axios.put(this.serverPath, { artist: this.artist }).then(result => {
					if (result.data.code == 200) {
						alert('updated');
						this.getAllArtists();
						this.cancelEdit();
					} else {
						alert('not saved');
					}
				});
			} else {
				axios.post(this.serverPath, { artist: this.artist }).then(result => {
					if (result.data.code == 200) {
						alert('saved');
						this.getAllArtists();
						this.cancelEdit();
					} else {
						alert('not saved');
					}
				});
			}
		},
		deleteArtist: function(mId) {
			axios.delete(this.serverPath + '/' + mId).then(result => {
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