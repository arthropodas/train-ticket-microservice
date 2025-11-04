require('dotenv').config();

const config = {
    db: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    },
    app: {
        port: process.env.PORT || 4000,
        env: process.env.NODE_ENV || 'development'
    }
};

module.exports = config;