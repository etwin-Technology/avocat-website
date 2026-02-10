const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const exists = await Admin.findOne({ email: 'admin@cabinet.ma' });
  if (exists) {
    console.log('⚠️ Admin already exists');
    process.exit();
  }

  const admin = await Admin.create({
    name: 'System Administrator',
    email: 'admin@cabinet.ma',
    password: 'password123',
    role: 'super_admin'
  });

  console.log('✅ Super admin created:', admin.email);
  process.exit();
})();
