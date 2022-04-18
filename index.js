document.init = () => {
	Alpine.data('opts', () => ({
		dark: localStorage.getItem("dark")==="1" ? true : (localStorage.getItem("dark")==="0" ? false : window.matchMedia("(prefers-color-scheme: dark)").matches),
		init() {
			this.$watch('dark', () => {
				if(this.dark==window.matchMedia("(prefers-color-scheme: dark)").matches)
					localStorage.removeItem("dark");
				else
					localStorage.setItem("dark", this.dark ? "1" : "0");
			});
		},
		theme() {
			return this.dark ? "dark" : "light";
		},
		themeSwitcherIcon() {
			return this.dark ? "light_mode" : "dark_mode";
		},
		screenshot(id) {
			return "./imgs/screenshot_"+id+"_"+this.theme()+".png";
		}
	}));
	Alpine.data('sections', () => ({
		section: '',
		fading: '',
		collapsing: '',
		expanding: '',
		init() {
			this.$watch('collapsing', () => {
				if(!this.collapsing)
					return;
				while(this.collapsing) {
					if(document.getElementsByClassName("collapsing").length > 0 && document.getElementsByClassName("collapsing")[0].lastElementChild.getElementsByClassName("active").length > 0) {
						document.getElementsByClassName("collapsing")[0].style.setProperty("--height", (document.getElementsByClassName("collapsing")[0].lastElementChild.getElementsByClassName("active")[0].offsetHeight + 10 * parseFloat(getComputedStyle(document.documentElement).fontSize)).toString()+"px");
						break;
					};
				};
			});
			this.$watch('expanding', () => {
				if(!this.expanding)
					return;
				while(this.expanding) {
					if(document.getElementsByClassName("expanding").length > 0 && document.getElementsByClassName("expanding")[0].lastElementChild.getElementsByClassName("active").length > 0) {
						document.getElementsByClassName("expanding")[0].style.setProperty("--height", (document.getElementsByClassName("expanding")[0].lastElementChild.getElementsByClassName("active")[0].offsetHeight + 10 * parseFloat(getComputedStyle(document.documentElement).fontSize)).toString()+"px");
						break;
					};
				};
			});
		},
		activeSection(section) {
			return (this.section==section || this.collapsing==section) ? "active" : (this.fading==section ? "" : "hidden");
		},
		collapsed(sections) {
			return (this.collapsing!="" && sections.split(" ").indexOf(this.collapsing) >= 0) ? "collapsing" : ((this.expanding!="" && sections.split(" ").indexOf(this.expanding) >= 0) ? "expanding" : ((((this.section!="" && sections.split(" ").indexOf(this.section) < 0) || (this.fading!="" && sections.split(" ").indexOf(this.fading) < 0)) ? "collapsed" : "")));
		},
		select(section) {
			if(this.fading || this.collapsing || this.expanding || this.section==section)
				return false;
			this.fading = this.section;
			this.section = "";
			window.setTimeout(() => {
				this.section = section;
				this.fading = "";
			}, 300);
		},
		nextLabel(sections, labels) {
			if(sections.split(" ").indexOf(this.fading) >= 0)
				return labels.split(";")[(sections.split(" ").indexOf(this.fading) + 1) % sections.split(" ").length];
			if(sections.split(" ").indexOf(this.collapsing) >= 0)
				return labels.split(";")[(sections.split(" ").indexOf(this.collapsing) + 1) % sections.split(" ").length];
			return labels.split(";")[(sections.split(" ").indexOf(this.section) + 1) % sections.split(" ").length];
		},
		next(sections) {
			if(this.fading || this.collapsing || this.expanding || sections.split(" ").indexOf(this.section) < 0)
				return false;
			this.select(sections.split(" ")[(sections.split(" ").indexOf(this.section) + 1) % sections.split(" ").length]);
		},
		expand(sections) {
			var section = sections.split(" ")[0];
			if(this.fading || this.collapsing || this.expanding || sections.split(" ").indexOf(this.section) >= 0)
				return false;
			this.collapsing = this.section;
			this.expanding = this.section = section;
			window.setTimeout(() => {
				this.expanding = this.collapsing = "";
			}, 300);
		}
	}));
};
