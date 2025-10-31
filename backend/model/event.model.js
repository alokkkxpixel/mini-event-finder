const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    maxParticipants: {
        type: Number,
        default: 0
    },
    currentParticipants: {
        type: Number,
        default: 0
    },
    userId: {                  // link event to user who created it
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
}, { timestamps: true })       // adds createdAt and updatedAt automatically

const EventModel = mongoose.model("event", eventSchema)

module.exports = EventModel
