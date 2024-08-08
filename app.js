const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname)));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'main.html'));
});


app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});


mongoose.connect('mongodb://localhost:27017/signupDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    userType: { type: String, required: true },
    signupName: { type: String, required: true },
    signupPassword: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    DOB: { type: Date, required: true },
    gender: { type: String, required: true },
    pinCode: { type: Number, required: true },
});

const User = mongoose.model('User', userSchema);


app.post('/signup', (req, res) => {
    const { userType, signupName, signupPassword, phoneNumber, DOB, gender, pinCode } = req.body;

    
    if (!userType || !signupName || !signupPassword || !phoneNumber || !DOB || !gender || !pinCode) {
        return res.status(400).send('All fields are required!');
    }

    const newUser = new User({
        userType,
        signupName,
        signupPassword,
        phoneNumber,
        DOB,
        gender,
        pinCode
    });

    newUser.save()
        .then(() => res.send('User registered successfully!'))
        .catch(err => res.status(400).send(err.message));
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
