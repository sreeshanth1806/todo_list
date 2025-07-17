const express = require("express");
const app = express();

// Serve static files from "public" directory
app.use(express.static("public"));

// Set EJS as view engine
app.set("view engine", "ejs");

// Middleware to parse JSON and URL-encoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

// PUT: Edit task
app.put("/edit/:id", (req, res) => {
    const { id } = req.params;
    const { updatedTask, updatedPriority } = req.body;
    const taskIndex = items.findIndex(item => item.id === parseInt(id));

    if (taskIndex !== -1 && updatedTask.trim() !== "") {
        items[taskIndex].name = updatedTask;
        items[taskIndex].priority = updatedPriority;
        return res.status(200).json({ success: true });
    }
    res.status(400).json({ success: false, message: "Invalid task update" });
});

// DELETE: Delete task
app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    items = items.filter(item => item.id !== parseInt(id));
    res.status(200).json({ success: true });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
