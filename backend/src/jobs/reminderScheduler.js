const cron = require('node-cron');
const Task = require('../models/Task');
const User = require('../models/User');
const { sendReminderEmail } = require('../services/emailService');

// Run every minute
cron.schedule('* * * * *', async () => {
  try {
    const now = new Date();
    const thirtyMinutesFromNow = new Date(now.getTime() + 30 * 60 * 1000);

    // Find tasks due in approximately 30 minutes (±1 minute window)
    const tasks = await Task.find({
      dueDate: {
        $gte: now,
        $lte: thirtyMinutesFromNow
      },
      reminderSent: false,
      status: 'pending'
    }).populate('userId');

    for (const task of tasks) {
      if (task.userId && task.userId.email) {
        const sent = await sendReminderEmail(task.userId.email, task);
        
        if (sent) {
          task.reminderSent = true;
          await task.save();
          console.log(`✅ Reminder sent for task: ${task.title}`);
        }
      }
    }

    if (tasks.length > 0) {
      console.log(`📬 Processed ${tasks.length} reminder(s) at ${now.toLocaleTimeString()}`);
    }
  } catch (error) {
    console.error('❌ Reminder scheduler error:', error);
  }
});

console.log('⏰ Reminder scheduler started (runs every minute)');