const pm2Process = require('./pm2.config');
// cluster mode for production env
module.exports = {
    apps: [
        {
            ...pm2Process,
            instances: 2, // can be max or any number of process across cpu
            exec_mode: "cluster",
            env: {
                "PORT": 8080,
                "NODE_ENV": "production"
            },
        }
    ]
}
