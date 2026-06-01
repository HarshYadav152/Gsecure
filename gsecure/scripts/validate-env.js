const fs = require('fs');
const path = require('path');

const examplePath = path.join(__dirname, '..', '.env.local.example');
const envPath = path.join(__dirname, '..', '.env.local');

if (!fs.existsSync(examplePath)) {
  console.error('Missing .env.local.example in the gsecure directory.');
  process.exit(1);
}

const exampleContent = fs.readFileSync(examplePath, 'utf8');
const exampleKeys = exampleContent
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith('#'))
  .map((line) => line.split('=')[0].trim());

if (!fs.existsSync(envPath)) {
  console.error('Missing .env.local. Please copy .env.local.example to .env.local and fill the required values.');
  console.error('    cp .env.local.example .env.local');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const envKeys = envContent
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith('#'))
  .map((line) => line.split('=')[0].trim());

const missingKeys = exampleKeys.filter((key) => !envKeys.includes(key));

if (missingKeys.length > 0) {
  console.error('The following required environment keys are missing in .env.local:');
  missingKeys.forEach((key) => console.error(`  - ${key}`));
  console.error('\nPlease update .env.local with the missing values and try again.');
  process.exit(1);
}

console.log('✅ .env.local contains all required keys from .env.local.example');
process.exit(0);
