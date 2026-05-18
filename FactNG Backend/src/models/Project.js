//import moongoosee from 'mongoose';
const mongoose = require('mongoose');

//create Project schema
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    client: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['In Progress', 'Completed', 'Pending'],
        default: 'In Progress',
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        enum: ['Interior', 'Exterior', 'Commercial', 'Renovation', 'Other'],
        default: 'Other',
    },
    image: {
        url: String,
        caption: String,
    },

    isPublished: {
        type: Boolean,
        default: false,
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Admin' 
    }

}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);