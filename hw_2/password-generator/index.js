/**
 * Generates a password.
 * @param {object} options - Object with password generation parameters.
 * @param {number} [options.length=8] - Password length.
 * @param {boolean} [options.lowercaseLetters=true] - Whether to include lowercase letters.
 * @param {boolean} [options.uppercaseLetters=true] - Whether to include uppercase letters.
 * @param {boolean} [options.figures=true] - Whether to include figures.
 * @param {boolean} [options.specialCharacters=true] - Whether to include special characters.
 * @returns {string} The generated password.
 * */
function generatePassword(options) {
  const {
    length = 8,
    lowercaseLetters = true,
    uppercaseLetters = true,
    figures = true,
    specialCharacters = true
  } = options;

  const charsetLowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const charsetUppercaseletters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charsetFigures = "0123456789";
  const charsetSpecialCharacters = "!@#$%^&*()_-+={}[]|:;<>?,.~";

  let charset = '';
  if (lowercaseLetters) {
    charset += charsetLowercaseLetters;
  }
  if (uppercaseLetters) {
    charset += charsetUppercaseletters;
  }
  if (figures) {
    charset += charsetFigures;
  }
  if (specialCharacters) {
    charset += charsetSpecialCharacters;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

module.exports = {generatePassword};