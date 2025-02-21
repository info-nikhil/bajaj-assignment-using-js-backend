const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/bfhl', (req, res) => {
    try {
        const data = req.body;
        const inputData = data.data;

        const numbers = [];
        const alphabets = [];
        let highestAlphabet = '';

        if (!Array.isArray(inputData)) {
            throw new Error("Input data must be an array.");
        }

        for (const item of inputData) {
            if (typeof item === 'number') {
                numbers.push(item);
            } else if (typeof item === 'string' && item.length === 1) { // Check if it's a string of length 1
                const charCode = item.toUpperCase().charCodeAt(0);
                if (charCode >= 65 && charCode <= 90) { // Check if it's an alphabet
                    alphabets.push(item.toUpperCase());
                    highestAlphabet = item.toUpperCase() > highestAlphabet ? item.toUpperCase() : highestAlphabet;
                } else if (!isNaN(parseInt(item, 10))) { // Check if it's a numeric string
                    numbers.push(parseInt(item, 10)); // Convert to integer and push
                }
            }
        }

        const userId = "your_name_ddmmyyyy"; // Replace with your info
        const email = "your_email@example.com"; // Replace with your info
        const rollNumber = "your_roll_number"; // Replace with your info

        const response = {
            is_success: true,
            user_id: userId,
            email: email,
            roll_number: rollNumber,
            numbers: numbers,
            alphabets: alphabets,
            highest_alphabet: highestAlphabet
        };

        res.json(response);

    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ is_success: false, message: error.message || "Invalid input" });
    }
});

app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});