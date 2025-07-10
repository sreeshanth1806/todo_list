const express = require("express");
const app = express();

// Serve static files from "public" directory
app.use(express.static("public"));

// Set EJS as view engine
app.set("view engine", "ejs");

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Store tasks
let items = [];

// GET: Homepage
app.get("/", (req, res) => {
    res.render("list", { tasks: items });
});

// POST: Add new task
app.post("/", (req, res) => {
    const { task, priority } = req.body;

    if (task.trim() === "") {
        return res.status(400).send("<script>alert('Task cannot be empty!'); window.history.back();</script>");
    }

    items.push({
        id: Date.now(),
        name: task,
        priority: priority || "Normal"
    });

    res.redirect("/");
});

// POST: Delete task
app.post("/delete", (req, res) => {
    const id = parseInt(req.body.id);
    items = items.filter(item => item.id !== id);
    res.redirect("/");
});

// POST: Edit task
app.post("/edit", (req, res) => {
    const { id, updatedTask, updatedPriority } = req.body;
    const taskIndex = items.findIndex(item => item.id === parseInt(id));

    if (taskIndex !== -1 && updatedTask.trim() !== "") {
        items[taskIndex].name = updatedTask;
        items[taskIndex].priority = updatedPriority; // Update priority
    }

    res.redirect("/");
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
