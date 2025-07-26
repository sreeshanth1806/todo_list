const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/Task");
const app = express();

// ✅ Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://todo_user:todo1234@cluster0.vxkaide.mongodb.net/todo_list?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Middleware
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Routes
app.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.render("list", {
            tasks,
            success: req.query.success
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading tasks");
    }
});

app.post("/", async (req, res) => {
    const { task, priority } = req.body;

    // ✅ Server-side required field validation
    if (!task || task.trim() === "") {
        return res.status(400).send("<script>alert('Task cannot be empty!'); window.history.back();</script>");
    }

    const newTask = new Task({
        name: task.trim(),
        priority: priority || "Low"
    });

    try {
        await newTask.save();
        res.redirect("/?success=created");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving task");
    }
});

app.put("/edit/:id", async (req, res) => {
    const { id } = req.params;
    const { updatedTask, updatedPriority } = req.body;

    // ✅ Validation for updated task
    if (!updatedTask || updatedTask.trim() === "") {
        return res.status(400).json({ success: false, message: "Task cannot be empty" });
    }

    try {
        await Task.findByIdAndUpdate(id, {
            name: updatedTask.trim(),
            priority: updatedPriority
        });
        res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(400).json({ success: false, message: "Error updating task" });
    }
});

app.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(400).json({ success: false, message: "Error deleting task" });
    }
});

// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
