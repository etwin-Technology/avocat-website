const mongoose = require('mongoose');
const Admin = require('./models/Admin'); // صحح المسار
require('dotenv').config();

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const admin = await Admin.findOne({ email: 'admin@cabinet.ma' }).select('+password');

  admin.password = 'password123'; // ← دابا هادي هي كلمة المرور
  await admin.save();

  console.log('✅ Password updated');
  process.exit();
})();
