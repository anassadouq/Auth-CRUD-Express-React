const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://prospecat:prospecat@cluster0.h1vp0lq.mongodb.net/prospecat?retryWrites=true&w=majority");


// User model
const UsersModel = require('./models/Users');

// Show Users
app.get("/users", async(req,res)=>{
    try {
        const users = await UsersModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users", error: error });
    }
});

// Delete User
app.delete("/deleteUser/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await UsersModel.deleteOne({ _id: userId });
        res.json({ message: "User deleted successfully", result: result });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error });
    }
});

// Update User
app.put("/updateUser/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const update = req.body; // Assuming the update information is in the request body
        const result = await UsersModel.updateOne({ _id: userId }, update);
        res.json({ message: "User updated successfully", result: result });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error });
    }
});

// Register
app.post("/register", async (req, res) => {
    try {
        const register = new UsersModel(req.body);
        await register.save();
        res.json(req.body);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error });
    }
});

// Login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UsersModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        // At this point, the user has provided valid credentials
        const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1d' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error authenticating user", error: error });
    }
});


app.listen("3001", ()=>{
    console.log("Server started on port 3001");
});