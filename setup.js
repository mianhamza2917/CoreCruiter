#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up Fullstack Application...\n');

// Check if Node.js version is compatible
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 18) {
  console.error('❌ Node.js 18 or higher is required. Current version:', nodeVersion);
  process.exit(1);
}

console.log('✅ Node.js version:', nodeVersion);

// Install backend dependencies
console.log('\n📦 Installing backend dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Backend dependencies installed');
} catch (error) {
  console.error('❌ Failed to install backend dependencies');
  process.exit(1);
}

// Install frontend dependencies
console.log('\n📦 Installing frontend dependencies...');
try {
  execSync('npm install', { cwd: path.join(__dirname, 'frontend'), stdio: 'inherit' });
  console.log('✅ Frontend dependencies installed');
} catch (error) {
  console.error('❌ Failed to install frontend dependencies');
  process.exit(1);
}

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('\n📝 Creating .env file...');
  const envExample = fs.readFileSync(path.join(__dirname, 'env.example'), 'utf8');
  fs.writeFileSync(envPath, envExample);
  console.log('✅ .env file created from env.example');
  console.log('⚠️  Please update the DATABASE_URL and JWT_SECRET in .env file');
} else {
  console.log('✅ .env file already exists');
}

// Generate Prisma client
console.log('\n🔧 Generating Prisma client...');
try {
  execSync('npm run db:generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated');
} catch (error) {
  console.error('❌ Failed to generate Prisma client');
  console.log('⚠️  Make sure your database is running and DATABASE_URL is correct');
}

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Update the DATABASE_URL in .env file to point to your PostgreSQL database');
console.log('2. Run "npm run db:push" to create database tables');
console.log('3. Start the backend: "npm run dev"');
console.log('4. Start the frontend: "cd frontend && npm run dev"');
console.log('5. Open http://localhost:3001 in your browser');
console.log('\n📚 For more information, see README.md'); 