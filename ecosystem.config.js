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
      host: '51.250.68.25',
      ref: 'origin/level-1', // поменять?
      repo: 'https://github.com/mityourik/movies-explorer-api',
      path: '/home/sha/movies-explorer-api',
      'pre-deploy-local':
      'scp .env sha@51.250.68.25:/home/sha/movies-explorer-api/current/',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
    },
  },
};
