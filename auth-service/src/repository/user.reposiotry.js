import { pool } from '../config/db.js';
import { UserEntity } from '../entity/user.entity.js';

export class UserRepository {
  async create(userData) {
    const query = `
      INSERT INTO users (name, username, password, gender, country, email, phone_number, address) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
      userData.name,
      userData.username,
      userData.password,
      userData.gender,
      userData.country,
      userData.email,
      userData.phone_number,
      userData.address
    ];

    try {
      const [result] = await pool.execute(query, values);
      return await this.findById(result.insertId);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        if (error.message.includes('email')) {
          throw new Error('Email already exists');
        } else if (error.message.includes('username')) {
          throw new Error('Username already exists');
        }
      }
      throw new Error(`Database error: ${error.message}`);
    }
  }

  async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await pool.execute(query, [email]);
    return rows[0] ? new UserEntity(rows[0]) : null;
  }

  async findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await pool.execute(query, [username]);
    return rows[0] ? new UserEntity(rows[0]) : null;
  }

  async findById(id) {
    const query = 'SELECT * FROM users WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    if (!rows[0]) {
      throw new Error('User not found');
    }
    return new UserEntity(rows[0]);
  }

  async update(id, updateData) {
    const allowedFields = new Set(['name', 'country', 'phone_number', 'address']);
    const fieldsToUpdate = Object.keys(updateData).filter(key => allowedFields.has(key));
    
    if (fieldsToUpdate.length === 0) {
      throw new Error('No valid fields to update');
    }

    const setClause = fieldsToUpdate.map(field => `${field} = ?`).join(', ');
    const values = fieldsToUpdate.map(field => updateData[field]);
    values.push(id);

    const query = `UPDATE users SET ${setClause} WHERE id = ?`;
    
    try {
      await pool.execute(query, values);
      return await this.findById(id);
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }
}