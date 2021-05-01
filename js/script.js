//	My Netflix

const myNetflix = new Vue({
	el: "#root",

	//	DATA
	data: {
		dropdown: false,
		inputUtente: "",
		showVideo: [],
		type: "",
		apiKey:"d5038481a74eaddc438beabb2231c5bd",
		uri:"https://api.themoviedb.org/3",
		titleH1: ""
	},

	//	MOUNTED
	// Negli axios setto la lingua di default in ITA
	mounted() {
		//	Chiamata iniziale "prossime uscite"
		axios
			.get(`${this.uri}/movie/upcoming?api_key=${this.apiKey}&language=it`)
			.then((response) => {
				this.showVideo = response.data.results;
				this.type = "movie";
				this.titleH1 = "Prossime uscite";
		});
	},

	//	METHODS
	methods: {
		//	Dropdown profile
		mouseOver(){
            this.dropdown = !this.dropdown;   
        },

		// BUG ------> sistemare il "type"
		/* Input dell'utente per la ricerca + cambio H1 */
		searchUtente() {
			if(this.inputUtente.length > 0) {
				//	Chiamata sia di FILM che di SERIE TV con "/multy"
				axios
				//	Richiesta multipla a seconda della input
					.get(`${this.uri}/search/multi?api_key=${this.apiKey}&query=${this.inputUtente}&language=it`)
					.then((response) => {
						this.showVideo = response.data.results;
						this.type = "";
						this.titleH1 = `La tua ricerca: ${this.inputUtente}`;
				});
			}
		},

		//	Selezione/ricerca FILM al click + al search come filtro
		filmSelection() {
			if(this.inputUtente == "") {
				//	FILM trending oggi
				axios
					.get(`${this.uri}/trending/movie/day?api_key=${this.apiKey}&language=it`)
					.then((response) => {
						this.showVideo = response.data.results;
						this.type = "movie";
						this.titleH1 = "Top 20 film di oggi:";
				});
			} else {
				axios
					.get(`${this.uri}/search/movie?api_key=${this.apiKey}&query=${this.inputUtente}&language=it`)
					.then((response) => {
						this.showVideo = response.data.results;
						this.type = "movie";
						this.titleH1 = `Film trovati: ${this.inputUtente}`;
				});
			}
		},

		//	Selezione/ricerca SERIE TV al click + al search come filtro
		tvseriesSelection() {
			if(this.inputUtente.length == "") {
				//	SERIE TV trending oggi
				axios
					.get(`${this.uri}/trending/tv/week?api_key=${this.apiKey}&language=it`)
					.then((response) => {
						this.showVideo = response.data.results;
						this.type = "tv";
						this.titleH1 = "Top 20 serie TV della settimana:";
				});
			} else {
				axios
					.get(`${this.uri}/search/tv?api_key=${this.apiKey}&query=${this.inputUtente}&language=it`)
					.then((response) => {
						this.showVideo = response.data.results;
						this.type = "tv";
						this.titleH1 = `Serie TV trovate: ${this.inputUtente}`;
				});
			}
		},

		//	Rating
		yellowStars(vote) {
			if(vote == undefined) {
				return 0;
			}
			return Math.ceil(vote/2);
		},
		whiteStars(vote) {
			if(vote == undefined) {
				return 0;
			}
			let votoArrotondato = Math.ceil(vote/2);
			let whiteStars = 5 - votoArrotondato;
			return whiteStars;
		}
	}
});