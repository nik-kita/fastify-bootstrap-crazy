module.exports = {
  apps: [{
    name: 'fasty-in-google-cloud',
    script: './dist/index.js',
    exec_mode: 'cluster',
    instances: 'max',
  }],
};
