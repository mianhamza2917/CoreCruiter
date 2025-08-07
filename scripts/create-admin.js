#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    const email = process.argv[2];
    const password = process.argv[3];
    const name = process.argv[4] || 'Admin User';

    if (!email || !password) {
      console.error('Usage: node create-admin.js <email> <password> [name]');
      console.error('Example: node create-admin.js admin@example.com password123 "Admin User"');
      process.exit(1);
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      console.log('User already exists. Updating role to ADMIN...');
      await prisma.user.update({
        where: { email },
        data: { role: 'ADMIN' }
      });
      console.log('✅ User role updated to ADMIN');
    } else {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create admin user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: 'ADMIN'
        }
      });

      console.log('✅ Admin user created successfully!');
      console.log('Email:', user.email);
      console.log('Name:', user.name);
      console.log('Role:', user.role);
    }
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser(); 