export const validateRegister = (req, res, next) => {
  const { name, username, email, password, gender } = req.body;
  const errors = [];

  if (!name || name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!username || username.trim().length === 0) {
    errors.push('Username is required');
  }

  if (!email || !/^(?!.*\.\.)[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]{1,63}\.[a-zA-Z]{1,63}$/.test(email)) {
    errors.push('Valid email is required');
  }

  if (!password || password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,100}$/.test(password)){
    console.log(password +" kshdhskdh");
    errors.push('Need valid password');
  }

  if (!gender || !['MALE', 'FEMALE', 'OTHER'].includes(gender)) {
    errors.push('Valid gender is required (MALE, FEMALE, OTHER)');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email) {
    errors.push('Email is required');
  }

  if (!password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};