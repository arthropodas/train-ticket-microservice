const mysql = require('mysql2/promise');
const config = require('./env');
const UserQuery = require('../query/userQuery');
class Database {

    constructor() {
        this.pool = mysql.createPool(config.db);
        init();
    }

    async init() {
        try {
            const connection = await this.pool.getConnection();
            console.log('Connected to MySQL database');

            // Create categories table if not exists
            await this.createTable("user", UserQuery.createTable);

            connection.release();
        } catch (error) {
            console.error('Database connection failed:', error.message);
            process.exit(1);
        }
    }

    async createTable(tableName, query) {

        try {
            await this.pool.execute(query);
            console.log(tableName + ' table ready');
        } catch (error) {
            console.error('Error creating ' + tableName + ' table:', error.message);
        }
    }

    getPool() {
        return this.pool;
    }
}

module.exports = new Database();