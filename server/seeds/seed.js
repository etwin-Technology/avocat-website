require("dotenv").config({ path: "../.env" });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const ContactMessage = require('../models/ContactMessage');

connectDB();

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Appointment.deleteMany({});
    await ContactMessage.deleteMany({});

    // Create admin user
    const admin = await User.create({
      name: 'Admin Legal Pro',
      email: 'admin@legalpromaroc.ma',
      password: 'Admin123!',
      role: 'superadmin',
      profession: 'office',
      phone: '+212600000000',
    });

    console.log('Admin user created:', admin.email);

    // Sample appointments
    const appointments = [
      {
        clientName: 'Ahmed Benali',
        clientEmail: 'ahmed.benali@email.com',
        clientPhone: '+212611111111',
        serviceType: 'legal_consultation',
        date: new Date(Date.now() + 86400000), // Tomorrow
        time: '10:00',
        message: 'Besoin de conseil pour un contrat commercial',
        status: 'pending',
        assignedTo: admin._id,
      },
      {
        clientName: 'Fatima Zahra',
        clientEmail: 'fatima.zahra@email.com',
        clientPhone: '+212622222222',
        serviceType: 'notary_service',
        date: new Date(Date.now() + 172800000), // Day after tomorrow
        time: '14:00',
        message: 'Authentification acte de vente immobilier',
        status: 'confirmed',
        assignedTo: admin._id,
      },
    ];

    await Appointment.insertMany(appointments);
    console.log('Sample appointments created');

    // Sample contact messages
    const messages = [
      {
        name: 'Karim Alami',
        email: 'karim.alami@email.com',
        phone: '+212633333333',
        subject: 'Demande information services comptables',
        message: 'Bonjour, je souhaiterais en savoir plus sur vos services de comptabilité pour mon entreprise.',
        isRead: false,
      },
      {
        name: 'Leila Mourad',
        email: 'leila.mourad@email.com',
        phone: '+212644444444',
        subject: 'Devis pour consultation juridique',
        message: 'Je cherche un avocat spécialisé en droit des sociétés pour accompagner la création de ma SARL.',
        isRead: true,
      },
    ];

    await ContactMessage.insertMany(messages);
    console.log('Sample messages created');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();