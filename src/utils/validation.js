// Validation utilities for form inputs

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  // Remove all non-digit characters
  let digitsOnly = phone.replace(/\D/g, '');
  
  // If it starts with 91 and is 12 digits (Indian country code + 10-digit number), strip the 91
  if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
    digitsOnly = digitsOnly.slice(2);
  }
  
  // Also check if it starts with 0 and is 11 digits
  if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
    digitsOnly = digitsOnly.slice(1);
  }
  
  return /^\d{10}$/.test(digitsOnly);
};

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== '';
};

export const validateName = (name) => {
  // At least 2 characters, only letters and spaces allowed
  return /^[a-zA-Z\s]{2,}$/.test(name);
};