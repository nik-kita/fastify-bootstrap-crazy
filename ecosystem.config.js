module.exports = {
  apps: [{
    name: 'fastify-own-bootstrap-system',
    script: './dist/index.js',
    exec_mode: 'cluster',
    instances: 'max',
  }],
};
