const nodemailer = require('nodemailer');

// Configure email transport
const createTransporter = () => {
  // Check if all email credentials are provided
  if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    console.log('✅ Email service configured with real SMTP');
    
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false // Allow self-signed certificates
      }
    });
  }
  
  console.log('⚠️  Email service running in SIMULATION mode (no credentials found)');
  return null;
};

const sendReminderEmail = async (userEmail, task) => {
  const transporter = createTransporter();

  const emailContent = {
    from: process.env.EMAIL_FROM || 'noreply@todoapp.com',
    to: userEmail,
    subject: `⏰ Reminder: ${task.title}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .task-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
          .task-title { font-size: 20px; font-weight: bold; color: #667eea; margin: 0 0 10px 0; }
          .task-desc { color: #666; margin: 10px 0; }
          .task-due { color: #e74c3c; font-weight: bold; }
          .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; }
          .button { display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 Task Reminder</h1>
            <p>Don't forget your upcoming task!</p>
          </div>
          <div class="content">
            <p>Hi there! 👋</p>
            <p>This is a friendly reminder about your task that's coming up soon:</p>
            
            <div class="task-box">
              <div class="task-title">📝 ${task.title}</div>
              ${task.description ? `<div class="task-desc">${task.description}</div>` : ''}
              <div class="task-due">⏰ Due: ${new Date(task.dueDate).toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</div>
            </div>
            
            <p><strong>⚡ This task is due in approximately 30 minutes!</strong></p>
            <p>Make sure you're prepared and ready to complete it on time.</p>
            
            <center>
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard" class="button">
                View in Dashboard →
              </a>
            </center>
          </div>
          <div class="footer">
            <p>You're receiving this because you created this task in your Todo App.</p>
            <p>© ${new Date().getFullYear()} Todo App with Email Reminders</p>
          </div>
        </div>
      </body>
      </html>
    `,
    // Plain text version for email clients that don't support HTML
    text: `
Task Reminder

Hi there!

This is a reminder for your upcoming task:

Title: ${task.title}
${task.description ? `Description: ${task.description}` : ''}
Due: ${new Date(task.dueDate).toLocaleString()}

This task is due in approximately 30 minutes!

— Your Todo App
    `
  };

  // Always log email details to console (for debugging)
  console.log('\n📧 ========== EMAIL REMINDER ==========');
  console.log('Mode:', transporter ? '✅ REAL EMAIL (SMTP)' : '⚠️  SIMULATED (Console only)');
  console.log('To:', emailContent.to);
  console.log('From:', emailContent.from);
  console.log('Subject:', emailContent.subject);
  console.log('Task:', task.title);
  console.log('Description:', task.description || 'No description');
  console.log('Due:', new Date(task.dueDate).toLocaleString());
  console.log('======================================\n');

  if (transporter) {
    // Send real email via SMTP
    try {
      const info = await transporter.sendMail(emailContent);
      console.log('✅ Real email sent successfully!');
      console.log('   Message ID:', info.messageId);
      console.log('   Response:', info.response);
      return true;
    } catch (error) {
      console.error('❌ Email send error:', error.message);
      console.error('   Full error:', error);
      console.log('⚠️  Email failed to send, but reminder was logged above\n');
      return false;
    }
  } else {
    // Simulation mode - email details already logged above
    console.log('📝 Email simulated (check your .env to enable real emails)\n');
    return true;
  }
};

module.exports = { sendReminderEmail };