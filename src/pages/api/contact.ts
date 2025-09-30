// src/pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Log all request details for debugging
  console.log("Contact API called with method:", req.method);
  
  // Check method
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Log body
  console.log("Request body received:", JSON.stringify(req.body, null, 2));
  
  const { name, phone, email, message } = req.body;
  
  // Validate inputs
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Check environment variables
  const envCheck = {
    SMTP_USER: !!process.env.SMTP_USER,
    SMTP_PASS: !!process.env.SMTP_PASS,
    CONTACT_RECEIVER: !!process.env.CONTACT_RECEIVER
  };
  
  console.log("Environment variables check:", envCheck);
  
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.CONTACT_RECEIVER) {
    return res.status(500).json({ 
      error: "Server configuration error", 
      details: "Missing environment variables",
      envCheck
    });
  }

  // Create a test transport for verification
  try {
    console.log("Creating nodemailer transport...");
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verify connection configuration
    console.log("Verifying transporter...");
    
    try {
      await transporter.verify();
      console.log("Transporter verified successfully");
    } catch (verifyErr: any) {
      console.error("Transporter verification failed:", verifyErr);
      return res.status(500).json({ 
        error: "Email configuration error", 
        details: verifyErr.message,
        code: verifyErr.code || "UNKNOWN"
      });
    }

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_RECEIVER,
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      text: `Name: ${name}\nPhone: ${phone || "Not provided"}\nEmail: ${email}\n\nMessage: ${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    console.log("Sending email with options:", {
      to: process.env.CONTACT_RECEIVER,
      from: process.env.SMTP_USER,
      subject: mailOptions.subject
    });

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", info.messageId);
      return res.status(200).json({ 
        success: true, 
        messageId: info.messageId 
      });
    } catch (sendErr: any) {
      console.error("Email send error:", sendErr);
      return res.status(500).json({ 
        error: "Failed to send email", 
        details: sendErr.message,
        code: sendErr.code || "UNKNOWN"
      });
    }
  } catch (err: any) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ 
      error: "Server error", 
      details: err.message
    });
  }
}