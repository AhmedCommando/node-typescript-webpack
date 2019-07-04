// cluster mode for production env
module.exports = {
    apps: [
        {
            name: "api-rest",
            script: 'build/main.bundle.js',
            instances: 2, // can be max or any number of process across cpu
            exec_mode: "cluster",
            // new feature; increase restart delay each time after every crash or non reachable db per example
            exp_backoff_restart_delay: 100,
            env: {
                "PORT": 3000,
                "NODE_ENV": "development"
            },
            env_staging: {
                "PORT": 8080,
                "NODE_ENV": "staging"
            },
            env_production: {
                "PORT": 80,
                "NODE_ENV": "production"
            },
            error_file: "sys_config/logs/err.log",
            out_file: "sys_config/logs/out.log",
            log_file: "sys_config/logs/combined.log",
            time: true,
        }
    ]
}

// pm2 start sys_config/pm2.processes.js