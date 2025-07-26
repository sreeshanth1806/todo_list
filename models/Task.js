const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Task name is required"],
        trim: true,
        minlength: [1, "Task name must not be empty"]
    },
    priority: {
        type: String,
        enum: ["Low", "High", "Urgent"],
        default: "Low"
    }
});

module.exports = mongoose.model("Task", taskSchema);
