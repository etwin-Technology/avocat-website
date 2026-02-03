const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/legalpro_morocco');
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@legalpro.ma' });
    if (existingAdmin) {
      console.log('⚠️ Admin already exists');
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // Create admin
    const admin = new Admin({
      name: 'Super Admin',
      email: 'admin@legalpro.ma',
      password: hashedPassword,
      role: 'superadmin',
      permissions: ['view', 'edit', 'delete', 'manage_users']
    });

    await admin.save();
    console.log('✅ Super admin created successfully!');
    console.log('📧 Email: admin@legalpro.ma');
    console.log('🔑 Password: password123');

  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createAdmin();