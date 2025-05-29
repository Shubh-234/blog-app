const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,    
    maxlength: 100,
    unique: true  
  },
  content: { 
    type: String, 
    required: true, 
    minlength: 10,    
    maxlength: 5000 
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
