const mongoose = require('mongoose');

// Contact Schema definition
const contactSchema = mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']  // Email validation
  },
  message: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
});

// Create model from the schema
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
