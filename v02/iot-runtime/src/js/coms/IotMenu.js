export default {
	data() {
		return {
			menus: [{
				type: 0,
				title: 'Menu 1',
				url: '/menu-1',
				open: false,
				children: [{
						type: 1,
						title: 'Menu 1.11',
						url: '#'
					},
					{
						type: 1,
						title: 'Menu 1.12',
						url: '#'
					},
					{
						type: 2,
						title: 'Menu 1.21',
						url: '#'
					},
					{
						type: 2,
						title: 'Menu 1.22',
						url: '#'
					},
				],
				children_size: 1,
				column1_size: 2,
				column2_size: 2,
				column3: `<img height="300" alt="" width="300" src="/images/b1.webp">
							<p><a class="iot-button" href="#">LINK BANNER</a></p>
							<p><a class="iot-button" href="#">Link 2</a></p>
							<p><a class="iot-button" href="#">Link 3</a></p>`,
				column3_size: 1,
				key: ''
			}, {
				type: 0,
				title: 'Menu 2',
				url: '/menu-2',
				open: false,
				children: [{
						type: 1,
						title: 'Menu 2.11',
						url: '#'
					},
					{
						type: 1,
						title: 'Menu 2.12',
						url: '#'
					},
					{
						type: 2,
						title: 'Menu 2.21',
						url: '#'
					},
					{
						type: 2,
						title: 'Menu 2.22',
						url: '#'
					}
				],
				children_size: 1,
				column1_size: 2,
				column2_size: 2,
				column3: '',
				column3_size: 0,
				key: ''
			}, {
				type: 0,
				title: 'Menu 3',
				url: '/menu-3',
				open: false,
				children: [{
						type: 1,
						title: 'Menu 3.11',
						url: '#'
					},
					{
						type: 1,
						title: 'Menu 3.12',
						url: '#'
					},
					{
						type: 1,
						title: 'Menu 3.13',
						url: '#'
					},
					{
						type: 1,
						title: 'Menu 3.14',
						url: '#'
					}
				],
				children_size: 1,
				column1_size: 4,
				column2_size: 0,
				column3: '',
				column3_size: 0,
				key: ''
			}],
			links: [],
		};
	},
	computed: {},
	mounted() {
		this.drawSubMenu();
	},
	methods: {
		drawSubMenu() {
			const self = this;
			self.menus.forEach((it, k) => {
				if (it.children.length > 0) {
					let s = '';
					let el = null;

					if (it.column1_size > 0) {
						let s = '';
						it.children.filter(o => o.type === 1)
							.forEach(o => s += '<div class="mn-col-item"><a href="' + o.url + '">' +
								o.title + '</a></div>')
						el = document.getElementById('mn-column1--' + k);
						if (el) el.innerHTML = s;
					}

					if (it.column2_size > 0) {
						s = '';
						it.children.filter(o => o.type === 2)
							.forEach(o => s += '<div class="mn-col-item"><a href="' + o.url + '">' +
								o.title + '</a></div>')
						el = document.getElementById('mn-column2--' + k);
						if (el) el.innerHTML = s;
					}

					if (it.column3_size > 0) {
						el = document.getElementById('mn-column3--' + k);
						if (el) el.innerHTML = it.column3;
					}
				}
			})
		},
	}
};
