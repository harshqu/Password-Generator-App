function generatePassword() {
  const length = parseInt(document.getElementById('length-number').value);
  const upper = document.getElementById('uppercase').checked;
  const lower = document.getElementById('lowercase').checked;
  const number = document.getElementById('numbers').checked;
  const symbol = document.getElementById('symbols').checked;

  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+[]{}<>?,.';

  let charSet = '';
  const guaranteedChars = [];

  if (upper) {
    charSet += upperChars;
    guaranteedChars.push(upperChars[Math.floor(Math.random() * upperChars.length)]);
  }
  if (lower) {
    charSet += lowerChars;
    guaranteedChars.push(lowerChars[Math.floor(Math.random() * lowerChars.length)]);
  }
  if (number) {
    charSet += numberChars;
    guaranteedChars.push(numberChars[Math.floor(Math.random() * numberChars.length)]);
  }
  if (symbol) {
    charSet += symbolChars;
    guaranteedChars.push(symbolChars[Math.floor(Math.random() * symbolChars.length)]);
  }

  if (charSet === '') {
    document.getElementById('password').value = 'Select at least one option!';
    return;
  }

  let password = guaranteedChars;

  for (let i = guaranteedChars.length; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    password.push(charSet[randomIndex]);
  }

  // Shuffle the password so guaranteed characters are not in a fixed order
  password = password.sort(() => 0.5 - Math.random()).join('');

  document.getElementById('password').value = password;
}

function copyPassword() {
  const passwordField = document.getElementById('password');
  passwordField.select();
  document.execCommand('copy');
  alert('Password copied to clipboard!');
}

// Sync range and number input
const lengthRange = document.getElementById('length-range');
const lengthNumber = document.getElementById('length-number');

lengthRange.addEventListener('input', () => {
  lengthNumber.value = lengthRange.value;
});
lengthNumber.addEventListener('input', () => {
  lengthRange.value = lengthNumber.value;
});

// Theme toggle
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('change', () => {
  document.body.classList.toggle('light');
  document.body.classList.toggle('dark');
});

// On load
window.onload = () => {
  document.body.classList.add('dark');
  generatePassword();
};