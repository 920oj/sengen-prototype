
module.exports = {
	mode: 'universal',
	srcDir: "./client/",
	serverMiddleware: ["~~/api/"],
	/*
	** Headers of the page
	*/
	head: {
		titleTemplate: ' | sengen.jp ― 世界初「逆」クラウドファンディングサービス',
		meta: [
	  		{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
		],
		link: [
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:400,900&display=swap'},
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,900&display=swap'},
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},
	/*
	** Customize the progress-bar color
	*/
	loading: { color: '#fff' },
	/*
	** Global CSS
	*/
	css: [
		'~static/css/reset.css',
	],
	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
		"~plugins/persistedstate",
		'~plugins/vue-scrollto',
		{src: '~plugins/vue-datepicker', ssr: false},
	],
	/*
	** Nuxt.js dev-modules
	*/
	buildModules: [
	],
	/*
	** Nuxt.js modules
	*/
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
	],
	/*
	** Axios module configuration
	** See https://axios.nuxtjs.org/options
	*/
	axios: {
		baseURL: 'http://localhost:3000',
		proxy: true
	},
	proxy: {
		'/api': {
		  target: 'http://localhost:3000'
		}
	},
	/*
	** Build configuration
	*/
	build: {
		/*
		** You can extend webpack config here
		*/
		extend (config, ctx) {
		},

		babel: {
			presets({ isServer }) {
				return [
					[
					require.resolve('@nuxt/babel-preset-app'),
					{
						buildTarget: isServer ? 'server' : 'client',
						corejs: { version: 3 }
					}
					]	
				]
			}
		}
	}
}
