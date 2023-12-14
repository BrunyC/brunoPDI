module.exports = {
	apps: [
		{
			name: 'api',
			script: 'dist/api/main.js',
			env: {
				TZ: 'America/Sao_Paulo'
			}
		},
		{
			name: 'cart',
			script: 'dist/microservices/cart/main.js',
			env: {
				TZ: 'America/Sao_Paulo'
			}
		},
		{
			name: 'logs',
			script: 'dist/microservices/logs/main.js',
			env: {
				TZ: 'America/Sao_Paulo'
			}
		}
	]
};
