module.exports = {
    apps: [
        {
            "name": "server",
            "script": "./server/app.js",
        },
        {
            "name": "client",
            "script": "./client/server.js",
            "env_production": {
                "REACT_APP_SERVER_URL": "https://node09.cs.colman.ac.il",
                "REACT_APP_SERVER_PORT": "4001"
            }
        }
    ]
};
