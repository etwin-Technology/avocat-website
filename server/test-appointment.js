// test-appointment.js
const mongoose = require('mongoose');
const Appointment = require('./models/Appointment');

async function testAppointment() {
  // Connect to MongoDB with updated syntax
  await mongoose.connect('mongodb://127.0.0.1:27017/legalpro_morocco');
  // Or if you prefer the full URL format:
  // await mongoose.connect('mongodb://localhost:27017/legalpro_morocco');

  console.log('✅ Connected to MongoDB');

  // Create a test appointment
  const testAppointment = new Appointment({
    clientName: 'Test User',
    clientEmail: 'test@example.com',
    clientPhone: '+212600000000',
    serviceType: 'legal_consultation',
    preferredDate: new Date('2026-02-03'),
    preferredTime: '10:00'
  });

  console.log('📝 Test appointment created, saving...');
  console.log('📋 Document before save:', testAppointment);

  try {
    const saved = await testAppointment.save();
    console.log('✅ Test appointment saved successfully!');
    console.log('📋 Reference number:', saved.referenceNumber);
    console.log('📋 Status:', saved.status);
    console.log('📋 Full document:', saved);
  } catch (error) {
    console.error('❌ Test error:', error.message);
    console.error('❌ Error stack:', error.stack);
    console.error('❌ Error name:', error.name);
    
    // If it's a validation error, show details
    if (error.name === 'ValidationError') {
      console.error('❌ Validation errors:');
      for (const field in error.errors) {
        console.error(`   - ${field}: ${error.errors[field].message}`);
      }
    }
  }

  await mongoose.disconnect();
  console.log('👋 Disconnected from MongoDB');
}

// Run the test
testAppointment().catch(console.error);