module.exports = {
    apps: [
        {
            "name": "server",
            "script": "./server/app.js",
            "env_production": {
                "MONGO_CONNECTION_STRING": "mongodb://serverSide:123123123@127.0.0.1:21771/GetPet-Website",
                "SECRET_KEY_JWT": "7fab5084cc320b8d45fbce9cec014b24c2bd1b053d9f9af410c8bf169e6b6d03",
                "REFRESH_TOKEN": "KVNKRypGQpm+lEqIIx49hPpM3nqtRwNyIsJMnmIm314",
                "EXPARATION": "1h",
                "IS_HTTPS": "true",
                "HTTPS_PORT": "4001",
                "HTTP_PORT": "80",
                "NODE_ENV": "production",
                "GOOGLE_CLIENT_ID": "422894887443-746rnu7vd6ldo6kkpjmorm0tebh1rt23.apps.googleusercontent.com"
            }
        },
        {
            "name": "client",
            "script": "./client/server.js",
            "env_production": {
                "REACT_APP_SERVER_URL": "https://node09.cs.colman.ac.il",
                "REACT_APP_SERVER_PORT": "4001",
                "SERVER_PORT": "4002"
            }
        }
    ]
};
