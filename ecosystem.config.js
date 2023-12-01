module.exports = {
  apps: [
    {
      name: 'movies-autodeploy-api',
      script: 'app.js',
    },
  ],

  deploy: {
    production: {
      user: 'mityourik',
      host: '158.160.121.117',
      ref: 'origin/level-1', // поменять?
      repo: 'https://github.com/mityourik/movies-explorer-api',
      path: '/home/mityourik/auto-deploy-api',
      'pre-deploy-local':
      'scp .env mityourik@158.160.121.117:/home/mityourik/auto-deploy-api/current/',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
    },
  },
};
