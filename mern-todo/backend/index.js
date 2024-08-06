const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

var host = '192.168.0.103';
const port = 5001;

// Function to create the todos table if it doesn't exist
async function createTodosTable() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS todo (
                todo_id INT AUTO_INCREMENT PRIMARY KEY,
                description VARCHAR(255)
            );
        `);
        console.log("Todos table is ready");
    } catch (err) {
        console.error("Error creating todos table:", err.message);
    }
}

// Call the function to create the table
createTodosTable();

// ROUTES
// Await will wait for query to finish so we can log the response

// Create a todo
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const [result] = await pool.query("INSERT INTO todo (description) VALUES(?)", [description]);
        const newTodo = await pool.query("SELECT * FROM todo WHERE todo_id = ?", [result.insertId]);
        res.json(newTodo[0][0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Get all todos
app.get("/todos", async (req, res) => {
    try {
        const [allTodos] = await pool.query("SELECT * FROM todo ORDER BY todo_id DESC");
        res.json(allTodos);
    } catch (err) {
        console.error(err.message);
    }
});

// Get a todo
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const [todo] = await pool.query("SELECT * FROM todo WHERE todo_id = ?", [id]);
        res.json(todo[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        await pool.query("UPDATE todo SET description = ? WHERE todo_id = ?", [description, id]);
        res.json("Todo was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM todo WHERE todo_id = ?", [id]);
        res.json("Todo was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(port, host, () => {
    console.log(`Listening at ${host}:${port}`);
});