const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to database for seeding');

    // Clear existing data
    await User.deleteMany({});

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@legalpromorocco.com',
      password: adminPassword,
      role: 'admin',
      phone: '+212 6 00 00 00 01',
      specialization: 'general',
      languages: ['ar', 'fr', 'en']
    });
    await adminUser.save();

    // Create lawyer user
    const lawyerPassword = await bcrypt.hash('lawyer123', 10);
    const lawyerUser = new User({
      name: 'Lawyer User',
      email: 'lawyer@legalpromorocco.com',
      password: lawyerPassword,
      role: 'lawyer',
      phone: '+212 6 00 00 00 02',
      specialization: 'business_law',
      languages: ['ar', 'fr']
    });
    await lawyerUser.save();

    // Create sample client
    const clientPassword = await bcrypt.hash('client123', 10);
    const clientUser = new User({
      name: 'Client User',
      email: 'client@example.com',
      password: clientPassword,
      role: 'client',
      phone: '+212 6 00 00 00 03'
    });
    await clientUser.save();

    console.log('✅ Database seeded successfully!');
    console.log('📋 Sample users created:');
    console.log('   👑 Admin: admin@legalpromorocco.com / admin123');
    console.log('   ⚖️  Lawyer: lawyer@legalpromorocco.com / lawyer123');
    console.log('   👤 Client: client@example.com / client123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();