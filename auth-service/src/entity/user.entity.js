export class UserEntity {
  constructor({
    id,
    name,
    username,
    password,
    gender,
    country,
    email,
    phone_number,
    address,
    is_verified,
    created_at
  }) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
    this.gender = gender;
    this.country = country;
    this.email = email;
    this.phone_number = phone_number;
    this.address = address;
    this.is_verified = is_verified;
    this.created_at = created_at;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      username: this.username,
      gender: this.gender,
      country: this.country,
      email: this.email,
      phone_number: this.phone_number,
      address: this.address,
      is_verified: this.is_verified,
      created_at: this.created_at
    };
  }

  // validate() {
  //   const errors = [];

  //   if (!this.name || this.name.trim().length === 0) {
  //     errors.push('Name is required');
  //   }

  //   if (!this.username || this.username.trim().length === 0) {
  //     errors.push('Username is required');
  //   }

  //   if (!this.email || !this.isValidEmail(this.email)) {
  //     errors.push('Valid email is required');
  //   }

  //   if (!this.password || this.password.length < 8) {
  //     errors.push('Password must be at least 8 characters long');
  //   }

  //   if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,100}$/.test(password)) {
  //     errors.push('Need valid password');
  //   }

  //   if (!this.gender || !['MALE', 'FEMALE', 'OTHER'].includes(this.gender)) {
  //     errors.push('Valid gender is required (MALE, FEMALE, OTHER)');
  //   }

  //   return errors;
  // }

  // isValidEmail(email) {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // }

  // Remove password from entity for security
  withoutPassword() {
    const { password, ...userWithoutPassword } = this.toJSON();
    return userWithoutPassword;
  }
}