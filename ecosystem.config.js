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
      host: '51.250.11.32',
      ref: 'origin/level-1', // поменять?
      repo: 'https://github.com/mityourik/movies-explorer-api',
      path: '/home/mityourik/auto-deploy-api',
      'pre-deploy-local':
      'scp .env mityourik@51.250.11.32:/home/mityourik/auto-deploy-api/current/backend',
      'post-deploy':
      'pwd && cd backend && npm i && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};
