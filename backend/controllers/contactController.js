const Contact = require('../models/Contact');
const { AppError } = require('../middleware/errorHandler');

// @desc    Get all contacts with filtering, sorting, and pagination
// @route   GET /api/admin/contacts
// @access  Private/Admin
exports.getAllContacts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search,
      contactStatus,
      urgency,
      category,
      source,
      dateFrom,
      dateTo
    } = req.query;
    
    // Build filter object
    const filter = {};
    
    // Status filter
    if (contactStatus && contactStatus !== 'all') {
      filter.status = contactStatus;
    }
    
    // Urgency filter
    if (urgency && urgency !== 'all') {
      filter.urgency = urgency;
    }
    
    // Category filter
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    // Source filter
    if (source && source !== 'all') {
      filter.source = source;
    }
    
    // Date range filter
    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) {
        filter.createdAt.$gte = new Date(dateFrom);
      }
      if (dateTo) {
        filter.createdAt.$lte = new Date(dateTo);
      }
    }
    
    // Search filter
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;
    
    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    
    // Execute query with pagination
    const contacts = await Contact.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('respondedBy', 'name email');
    
    // Get total count for pagination
    const total = await Contact.countDocuments(filter);
    
    res.status(200).json({
      status: 'success',
      data: {
        contacts,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit)
        }
      }
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Get single contact
// @route   GET /api/admin/contacts/:id
// @access  Private/Admin
exports.getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('respondedBy', 'name email');
    
    if (!contact) {
      return next(new AppError('لم يتم العثور على جهة الاتصال', 404));
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        contact
      }
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Create new contact
// @route   POST /api/admin/contacts
// @access  Private/Admin
exports.createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: {
        contact
      }
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Update contact
// @route   PUT /api/admin/contacts/:id
// @access  Private/Admin
exports.updateContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('respondedBy', 'name email');
    
    if (!contact) {
      return next(new AppError('لم يتم العثور على جهة الاتصال', 404));
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        contact
      }
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact
// @route   DELETE /api/admin/contacts/:id
// @access  Private/Admin
exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return next(new AppError('لم يتم العثور على جهة الاتصال', 404));
    }
    
    res.status(200).json({
      status: 'success',
      message: 'تم حذف جهة الاتصال بنجاح',
      data: null
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Update contact status
// @route   PUT /api/admin/contacts/:id/status
// @access  Private/Admin
exports.updateContactStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    
    const updateData = { status };
    if (notes) updateData.followUpNotes = notes;
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return next(new AppError('لم يتم العثور على جهة الاتصال', 404));
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        contact
      }
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Update contact urgency
// @route   PUT /api/admin/contacts/:id/urgency
// @access  Private/Admin
exports.updateContactUrgency = async (req, res, next) => {
  try {
    const { urgency, notes } = req.body;
    
    const updateData = { urgency };
    if (notes) updateData.followUpNotes = notes;
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return next(new AppError('لم يتم العثور على جهة الاتصال', 404));
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        contact
      }
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Reply to contact
// @route   POST /api/admin/contacts/:id/reply
// @access  Private/Admin
exports.replyToContact = async (req, res, next) => {
  try {
    const { message, sendCopy, urgent, emailSubject, emailBody } = req.body;
    
    const updateData = {
      status: 'replied',
      respondedAt: new Date(),
      respondedBy: req.admin.id,
      responseMessage: message
    };
    
    if (urgent) {
      updateData.urgency = 'urgent';
    }
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return next(new AppError('لم يتم العثور على جهة الاتصال', 404));
    }
    
    // Here you would implement email sending logic if sendCopy is true
    // For now, we'll just log it
    if (sendCopy && contact.email) {
      console.log('📧 Email would be sent to:', {
        to: contact.email,
        subject: emailSubject || `رد على استفسارك: ${contact.subject}`,
        body: emailBody || message
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'تم إرسال الرد بنجاح',
      data: {
        contact
      }
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Set contact follow-up
// @route   POST /api/admin/contacts/:id/follow-up
// @access  Private/Admin
exports.setContactFollowUp = async (req, res, next) => {
  try {
    const { followUpDate, notes } = req.body;
    
    const updateData = {
      followUpDate,
      followUpCompleted: false
    };
    
    if (notes) {
      updateData.followUpNotes = notes;
    }
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return next(new AppError('لم يتم العثور على جهة الاتصال', 404));
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        contact
      }
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Bulk actions on contacts
// @route   POST /api/admin/contacts/bulk-actions
// @access  Private/Admin
exports.bulkActions = async (req, res, next) => {
  try {
    const { action, contactIds, data } = req.body;
    
    if (!contactIds || !Array.isArray(contactIds) || contactIds.length === 0) {
      return next(new AppError('يرجى تحديد جهات الاتصال', 400));
    }
    
    let update;
    let message;
    
    switch (action) {
      case 'mark_as_read':
        update = { status: 'read' };
        message = 'تم تعيين جهات الاتصال كمقروءة';
        break;
        
      case 'set_urgent':
        update = { urgency: 'urgent' };
        message = 'تم تعيين جهات الاتصال كعاجلة';
        break;
        
      case 'set_emergency':
        update = { urgency: 'emergency' };
        message = 'تم تعيين جهات الاتصال كحالات طوارئ';
        break;
        
      case 'archive':
        update = { status: 'archived' };
        message = 'تم أرشفة جهات الاتصال';
        break;
        
      case 'delete':
        await Contact.deleteMany({ _id: { $in: contactIds } });
        return res.status(200).json({
          status: 'success',
          message: 'تم حذف جهات الاتصال المحددة',
          data: null
        });
        
      default:
        return next(new AppError('إجراء غير صالح', 400));
    }
    
    const result = await Contact.updateMany(
      { _id: { $in: contactIds } },
      update
    );
    
    res.status(200).json({
      status: 'success',
      message,
      data: {
        modifiedCount: result.modifiedCount
      }
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Get emergency contacts
// @route   GET /api/admin/contacts/emergency
// @access  Private/Admin
exports.getEmergencyContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({
      urgency: { $in: ['emergency', 'urgent'] },
      status: { $ne: 'archived' }
    })
    .sort({ urgency: 1, createdAt: -1 })
    .populate('respondedBy', 'name email');
    
    res.status(200).json({
      status: 'success',
      data: {
        contacts
      }
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Get new contacts (unread)
// @route   GET /api/admin/contacts/new
// @access  Private/Admin
exports.getNewContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({
      status: 'new'
    })
    .sort({ createdAt: -1 })
    .limit(20);
    
    res.status(200).json({
      status: 'success',
      data: {
        contacts
      }
    });
    
  } catch (error) {
    next(error);
  }
};

// @desc    Export contacts to CSV/JSON
// @route   GET /api/admin/contacts/export
// @access  Private/Admin
exports.exportContacts = async (req, res, next) => {
  try {
    const { format = 'json', ...filters } = req.query;
    
    // Apply filters
    const filter = {};
    if (filters.contactStatus && filters.contactStatus !== 'all') filter.status = filters.contactStatus;
    if (filters.urgency && filters.urgency !== 'all') filter.urgency = filters.urgency;
    
    const contacts = await Contact.find(filter).lean();
    
    if (format === 'csv') {
      const { createObjectCsvWriter } = require('csv-writer');
      const csvWriter = createObjectCsvWriter({
        path: 'temp/contacts.csv',
        header: [
          { id: 'referenceNumber', title: 'رقم المرجع' },
          { id: 'name', title: 'الاسم' },
          { id: 'email', title: 'البريد الإلكتروني' },
          { id: 'phone', title: 'رقم الهاتف' },
          { id: 'subject', title: 'الموضوع' },
          { id: 'urgency', title: 'الاستعجال' },
          { id: 'status', title: 'الحالة' },
          { id: 'category', title: 'التصنيف' },
          { id: 'createdAt', title: 'تاريخ الإنشاء' },
          { id: 'respondedAt', title: 'تاريخ الرد' }
        ]
      });
      
      await csvWriter.writeRecords(contacts);
      
      res.download('temp/contacts.csv', `contacts-${Date.now()}.csv`);
      
    } else {
      res.status(200).json({
        status: 'success',
        data: contacts
      });
    }
    
  } catch (error) {
    next(error);
  }
};

// @desc    Public contact form submission
// @route   POST /api/contact
// @access  Public
exports.submitContactForm = async (req, res, next) => {
  try {
    // Extract IP and user agent for analytics
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    
    // Create contact
    const contactData = {
      ...req.body,
      source: 'contact_page',
      ipAddress,
      userAgent
    };
    
    const contact = await Contact.create(contactData);
    
    res.status(201).json({
      status: 'success',
      message: 'تم استلام رسالتك بنجاح، سنقوم بالرد عليك في أقرب وقت',
      data: {
        contact: {
          id: contact._id,
          referenceNumber: contact.referenceNumber,
          createdAt: contact.createdAt
        }
      }
    });
    
  } catch (error) {
    next(error);
  }
};