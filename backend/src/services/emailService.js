const nodemailer = require('nodemailer');

// Configure email transport
const createTransporter = () => {
  // For Gmail: Enable "Less secure app access" or use App Password
  // For testing: Use Ethereal Email (automatically creates test account)
  
  if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    // Real email configuration
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // e.g., smtp.gmail.com
      port: process.env.EMAIL_PORT || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }
  
  // Fallback: No real email, will log to console
  return null;
};

const sendReminderEmail = async (userEmail, task) => {
  const transporter = createTransporter();

  const emailContent = {
    from: process.env.EMAIL_FROM || 'noreply@todoapp.com',
    to: userEmail,
    subject: `⏰ Reminder: ${task.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Task Reminder</h2>
        <p>This is a reminder for your upcoming task:</p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0;">${task.title}</h3>
          <p><strong>Description:</strong> ${task.description || 'No description'}</p>
          <p><strong>Due:</strong> ${new Date(task.dueDate).toLocaleString()}</p>
        </div>
        <p>This task is due in approximately 30 minutes.</p>
        <p style="color: #666; font-size: 12px;">— Your Todo App</p>
      </div>
    `
  };

  if (transporter) {
    try {
      const info = await transporter.sendMail(emailContent);
      console.log('✅ Email sent:', info.messageId);
      return true;
    } catch (error) {
      console.error('❌ Email send error:', error.message);
      return false;
    }
  } else {
    // Simulate email (log to console)
    console.log('\n📧 ===== SIMULATED EMAIL =====');
    console.log('To:', emailContent.to);
    console.log('Subject:', emailContent.subject);
    console.log('Task:', task.title);
    console.log('Due:', new Date(task.dueDate).toLocaleString());
    console.log('=============================\n');
    return true;
  }
};

module.exports = { sendReminderEmail };