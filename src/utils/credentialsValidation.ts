export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
  const minLength = 8;
  const forbiddenCharacters = /[<>]/; // Prevents XSS injection

  return password.length >= minLength && !forbiddenCharacters.test(password);
}

export function validateUsername(username: string): boolean {
  const nameRegex = /^[a-zA-Z0-9]{5,18}$/;
  return nameRegex.test(username);
}
