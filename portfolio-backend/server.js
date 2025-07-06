require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();



app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:6969", "https://shrinidhi.space"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, 
}));

app.use(express.json());

// Health check root route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // Nodemailer transporter setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASS    
      }
    });

    // Email details
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, // Sender's name, but email is yours (Gmail limitation)
      to: process.env.TO_EMAIL,
      subject: `[Portfolio Contact] ${subject}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `.trim(),
      replyTo: email // "Reply" in your inbox goes to the sender
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ success: false, message: "Failed to send message." });
  }
});

// Listen on all network interfaces (needed for Docker)
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
