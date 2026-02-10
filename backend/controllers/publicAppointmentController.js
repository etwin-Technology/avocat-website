const Appointment = require('../models/Appointment');
const Contact = require('../models/Contact');
const { AppError } = require('../middleware/errorHandler');

// @desc    Check available time slots for a date
// @route   GET /api/appointments/availability/slots
// @access  Public
exports.checkAvailability = async (req, res, next) => {
  try {
    const { date } = req.query;
    
    console.log('📅 Checking availability for:', date);
    
    if (!date) {
      return next(new AppError('التاريخ مطلوب', 400));
    }
    
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(selectedDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // All available time slots
    const allTimeSlots = [
      { time: '09:00', label: '09:00 صباحاً' },
      { time: '10:00', label: '10:00 صباحاً' },
      { time: '11:00', label: '11:00 صباحاً' },
      { time: '12:00', label: '12:00 ظهراً' },
      { time: '14:00', label: '02:00 مساءً' },
      { time: '15:00', label: '03:00 مساءً' },
      { time: '16:00', label: '04:00 مساءً' },
      { time: '17:00', label: '05:00 مساءً' }
    ];
    
    // Get booked appointments for this date
    const bookedAppointments = await Appointment.find({
      preferredDate: {
        $gte: selectedDate,
        $lt: tomorrow
      },
      status: { $in: ['pending', 'confirmed'] }
    }).select('preferredTime');
    
    const bookedTimes = bookedAppointments.map(apt => apt.preferredTime);
    
    // Check availability for each slot
    const availableSlots = allTimeSlots.map(slot => ({
      ...slot,
      available: !bookedTimes.includes(slot.time)
    }));
    
    // Check if date has any availability
    const isDateAvailable = availableSlots.filter(slot => slot.available).length > 0;
    
    res.status(200).json({
      status: 'success',
      data: {
        date: selectedDate.toISOString().split('T')[0],
        formattedDate: selectedDate.toLocaleDateString('ar-MA', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        isDateAvailable,
        availableSlots,
        totalAvailable: availableSlots.filter(s => s.available).length,
        totalSlots: allTimeSlots.length,
        nextAvailableDates: getNextAvailableDates(selectedDate, 5)
      }
    });
    
  } catch (error) {
    console.error('Availability check error:', error);
    next(error);
  }
};

// @desc    Book new appointment (public)
// @route   POST /api/appointments
// @access  Public
exports.bookAppointment = async (req, res, next) => {
  try {
    const {
      clientName,
      clientEmail,
      clientPhone,
      serviceType,
      preferredDate,
      preferredTime,
      meetingType = 'in_person',
      location = 'casablanca',
      message,
      language = 'ar'
    } = req.body;
    
    console.log('📝 Booking appointment for:', clientName);
    
    // Validate date is in future
    const appointmentDate = new Date(preferredDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (appointmentDate < today) {
      return res.status(400).json({
        status: 'error',
        message: 'يجب اختيار تاريخ في المستقبل'
      });
    }
    
    // Check availability
    const isAvailable = await checkTimeSlotAvailability(preferredDate, preferredTime);
    
    if (!isAvailable) {
      return res.status(400).json({
        status: 'error',
        message: 'هذا الموعد غير متاح، يرجى اختيار وقت آخر'
      });
    }
    
    // Create appointment
    const appointment = await Appointment.create({
      clientName,
      clientEmail,
      clientPhone,
      serviceType,
      preferredDate: appointmentDate,
      preferredTime,
      meetingType,
      location,
      message,
      language,
      status: 'pending',
      urgencyLevel: 'normal',
      source: 'public_website'
    });
    
    console.log('✅ Appointment created:', appointment.referenceNumber);
    
    res.status(201).json({
      status: 'success',
      message: 'تم حجز الموعد بنجاح!',
      data: {
        appointment: {
          id: appointment._id,
          referenceNumber: appointment.referenceNumber,
          clientName: appointment.clientName,
          serviceType: appointment.serviceType,
          preferredDate: appointment.preferredDate,
          preferredTime: appointment.preferredTime,
          status: appointment.status,
          createdAt: appointment.createdAt
        }
      }
    });
    
  } catch (error) {
    console.error('Book appointment error:', error);
    next(error);
  }
};

// @desc    Lookup appointment by reference number
// @route   GET /api/appointments/:referenceNumber
// @access  Public
exports.lookupAppointment = async (req, res, next) => {
  try {
    const { referenceNumber } = req.params;
    
    console.log('🔍 Looking up appointment:', referenceNumber);
    
    const appointment = await Appointment.findOne({ referenceNumber })
      .select('-__v -updatedAt -notes -cancellationReason');
    
    if (!appointment) {
      return res.status(404).json({
        status: 'error',
        message: 'لم يتم العثور على الموعد'
      });
    }
    
    // Format response for public viewing
    const formattedAppointment = {
      referenceNumber: appointment.referenceNumber,
      clientName: appointment.clientName,
      serviceType: getServiceTypeArabic(appointment.serviceType),
      preferredDate: appointment.preferredDate.toLocaleDateString('ar-MA'),
      preferredTime: formatTimeArabic(appointment.preferredTime),
      meetingType: getMeetingTypeArabic(appointment.meetingType),
      location: getLocationArabic(appointment.location),
      status: getStatusArabic(appointment.status),
      createdAt: appointment.createdAt.toLocaleDateString('ar-MA')
    };
    
    res.status(200).json({
      status: 'success',
      data: {
        appointment: formattedAppointment
      }
    });
    
  } catch (error) {
    console.error('Lookup error:', error);
    next(error);
  }
};

// Helper function: Check time slot availability
async function checkTimeSlotAvailability(date, time) {
  try {
    const appointmentDate = new Date(date);
    appointmentDate.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(appointmentDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Count existing appointments at this time
    const existingCount = await Appointment.countDocuments({
      preferredDate: {
        $gte: appointmentDate,
        $lt: tomorrow
      },
      preferredTime: time,
      status: { $in: ['pending', 'confirmed'] }
    });
    
    return existingCount < 3; // Max 3 appointments per time slot
    
  } catch (error) {
    console.error('Availability check error:', error);
    return false;
  }
}

// Helper function: Get next available dates
function getNextAvailableDates(startDate, count) {
  const dates = [];
  const current = new Date(startDate);
  
  for (let i = 0; i < count; i++) {
    current.setDate(current.getDate() + 1);
    
    // Skip weekends (Friday = 5, Saturday = 6 in JavaScript)
    while (current.getDay() === 5 || current.getDay() === 6) {
      current.setDate(current.getDate() + 1);
    }
    
    dates.push({
      date: current.toISOString().split('T')[0],
      formattedDate: current.toLocaleDateString('ar-MA', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      day: current.toLocaleDateString('ar-MA', { weekday: 'long' })
    });
  }
  
  return dates;
}

// Helper: Format time in Arabic
function formatTimeArabic(time) {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const period = hour >= 12 ? 'مساءً' : 'صباحاً';
  const formattedHour = hour > 12 ? hour - 12 : hour;
  return `${formattedHour}:${minutes} ${period}`;
}

// Helper: Get service type in Arabic
function getServiceTypeArabic(type) {
  const types = {
    'legal_consultation': 'استشارة قانونية',
    'notary_service': 'خدمة كاتب عدل',
    'contract_review': 'مراجعة العقود',
    'court_representation': 'تمثيل في المحكمة',
    'business_setup': 'تأسيس الشركات',
    'family_law': 'قانون الأسرة',
    'real_estate': 'العقارات',
    'criminal_defense': 'الدفاع الجنائي',
    'tax_law': 'القانون الضريبي',
    'labor_law': 'قانون العمل',
    'immigration': 'الهجرة',
    'intellectual_property': 'الملكية الفكرية',
    'other': 'أخرى'
  };
  return types[type] || type;
}

// Helper: Get meeting type in Arabic
function getMeetingTypeArabic(type) {
  const types = {
    'in_person': 'مقابلة حضورية',
    'video_call': 'مكالمة فيديو',
    'phone_call': 'مكالمة هاتفية'
  };
  return types[type] || type;
}

// Helper: Get location in Arabic
function getLocationArabic(location) {
  const locations = {
    'casablanca': 'الدار البيضاء',
    'rabat': 'الرباط',
    'marrakech': 'مراكش',
    'tanger': 'طنجة',
    'fes': 'فاس',
    'agadir': 'أكادير',
    'online': 'أونلاين'
  };
  return locations[location] || location;
}

// Helper: Get status in Arabic
function getStatusArabic(status) {
  const statuses = {
    'pending': 'قيد الانتظار',
    'confirmed': 'مؤكد',
    'completed': 'مكتمل',
    'cancelled': 'ملغي',
    'rescheduled': 'مجدول'
  };
  return statuses[status] || status;
}