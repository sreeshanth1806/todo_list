const express = require("express");

const app = express();
 // Serve static files from the "public" directory

// Set EJS as the view engine
app.set("view engine", "ejs");
app.use(express.static("public"));
// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Array to store tasks
let items = [];

// GET route for homepage
app.get("/", function (req, res) {
    res.render("list", { ejes: items }); // Pass items as ejes
});

// POST route to handle form submission
app.post("/", function (req, res) {
    const item = req.body.task; // Access the input field with name="task"
    if (item.trim() !== "") { // Only push if not empty
        items.push(item);
    }
    res.redirect("/"); // Redirect back to homepage
});

// Start server
app.listen(4000, function () {
    console.log("Server started on http://localhost:4000");
});
