import nodemailer from 'nodemailer';
import dns from 'dns';
import { promisify } from 'util';

const resolveMx = promisify(dns.resolveMx);

// Helper function to verify if the email domain actually exists and can receive mail
async function verifyEmailDomain(email) {
  const domain = email.split('@')[1];
  if (!domain) return false;
  try {
    const records = await resolveMx(domain);
    return records && records.length > 0;
  } catch (error) {
    // If DNS resolution fails, the domain doesn't exist or has no mail servers
    return false;
  }
}
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body;

  // Validate fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  // Deep Validation: Check if the email domain actually exists (DNS MX records)
  const isDomainValid = await verifyEmailDomain(email);
  if (!isDomainValid) {
    return res.status(400).json({ 
      success: false, 
      message: 'This email address does not appear to be valid. The domain does not exist or cannot receive mail.' 
    });
  }

  try {
    // 1. Configure the transporter to use Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        // These MUST be set in your Vercel Environment Variables!
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    // 2. Define the email options
    const mailOptions = {
      from: process.env.EMAIL_USER,         // Send from the authenticated account
      replyTo: email,                       // When you hit 'Reply', it replies to the person who filled the form
      to: 'pateldevam5354@gmail.com',       // Your personal email where you want to receive messages
      subject: `Portfolio Contact: ${subject} (from ${name})`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #18181b;">
          <h2>New Message from your Portfolio Contact Form</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: 0.5px solid #e4e4e7; margin: 20px 0;" />
          <p style="white-space: pre-wrap; font-size: 15px; line-height: 1.6;">${message}</p>
        </div>
      `,
    };

    // 3. Send the email
    await transporter.sendMail(mailOptions);
    
    // 4. Return success to the frontend
    return res.status(200).json({ success: true, message: 'Email sent successfully!' });

  } catch (error) {
    console.error('Nodemailer error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send email. Check server configuration.' });
  }
}
