import nodemailer from 'nodemailer';

export const sendEmailNotification = async ({ name, email, subject, message }) => {
  try {
    // 1. Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT || 465,
      secure: true, // true for port 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // Your Gmail or SMTP username
        pass: process.env.SMTP_PASS, // Your Gmail App Password
      },
    });

    // 2. HTML template for email notification
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #0f172a; margin-top: 0;">🚀 New Contact Message from Portfolio</h2>
        <hr style="border: 0; border-top: 1px solid #e0e0e0;" />
        <p><strong>From:</strong> ${name} (&lt;${email}&gt;)</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #10b981;">
          <p style="margin: 0; white-space: pre-wrap; color: #334155;">${message}</p>
        </div>
        <hr style="border: 0; border-top: 1px solid #e0e0e0; margin-top: 20px;" />
        <p style="font-size: 12px; color: #64748b;">This message was automatically forwarded from your MERN Portfolio website.</p>
      </div>
    `;

    // 3. Mail Options
    const mailOptions = {
      from: `"${name} via Portfolio" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL, // Your personal inbox email where you want notifications
      replyTo: email,              // Allows you to hit "Reply" in your mail client to answer the recruiter directly
      subject: `Portfolio Contact: ${subject}`,
      html: htmlContent,
    };

    // 4. Send email
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Nodemailer Error:", error);
    // We log the error but don't crash the server so the message is still saved in DB
    return null;
  }
};