module.exports = {
    apps: [
        {
            ...require('./pm2.config'),
            env: {
                "PORT": 3000,
                "NODE_ENV": "development"
            }
        }
    ]
}

