class UserQuery {

    createUser() {
        return `
                CREATE TABLE IF NOT EXISTS users (
                id BIGINT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                username VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                gender ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
                country VARCHAR(50),
                email VARCHAR(100) NOT NULL UNIQUE,
                phone_number VARCHAR(20),
                address TEXT,
                is_verified BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
                `;
    }

}

module.exports = UserQuery;