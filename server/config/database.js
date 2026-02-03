import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/legalpro_morocco';
    
    console.log('🔌 Connecting to MongoDB...');
    
    // For Mongoose 7.x - NO OPTIONS NEEDED
    await mongoose.connect(mongoURI);
    
    console.log('✅ MongoDB Connected Successfully');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🏠 Host: ${mongoose.connection.host}`);
    
    return mongoose.connection;
    
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.log('\n💡 TROUBLESHOOTING:');
    console.log('1. Make sure MongoDB is running:');
    console.log('   - Open Command Prompt as Administrator');
    console.log('   - Run: mongod --dbpath "C:\\data\\db"');
    console.log('2. Or install MongoDB Compass (GUI): https://www.mongodb.com/try/download/compass');
    console.log('3. Check if MongoDB service is running:');
    console.log('   - Press Win + R, type "services.msc"');
    console.log('   - Look for "MongoDB Server" service');
    console.log('   - Start it if not running');
    process.exit(1);
  }
};

export default connectDB;