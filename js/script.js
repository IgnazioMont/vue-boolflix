//	My Netflix

const boolZapp = new Vue({
	el: "#root",

	//	DATA
	data: {
		inputUtente:"",
		/* lingua:"", */
		showVideo:[],
		type: "",
		apiKey:"d5038481a74eaddc438beabb2231c5bd",
		uri:"https://api.themoviedb.org/3",
		titleH1: ""
	},

	mounted() {
		//	Chiamata iniziale "prossime uscite"
		axios
			.get(`${this.uri}/movie/upcoming?api_key=${this.apiKey}`)
			.then((response) => {
				this.showVideo = response.data.results;
				this.type = "movie";
				this.titleH1 = "Prossime uscite";
		});
	},

	//	METHODS
	methods: {
		/* Input dell'utente per la ricerca */
		searchUtente() {
			if (this.inputUtente != "") {
				//	Chiamata sia di FILM che di SERIE TV con "/multy"
				axios
				//	Richiesta multipla a seconda della input
					.get(`${this.uri}/search/multi?api_key=${this.apiKey}&query=${this.inputUtente}`)
					.then((response) => {
						this.showVideo = response.data.results;
						this.type = "";
						this.titleH1 = `Ecco la tua ricerca: ${this.inputUtente}`
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

		
		//	Creare una diversificazione del risultato tra film e serieTV!!
	}
});