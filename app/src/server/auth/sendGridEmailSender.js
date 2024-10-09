export const sendverifyEmail = async ({ to, subject, text, html }) => {
    try {
      const info = await emailSender.send({
        from: {
          name: 'Mail-Octo',
          email: 'faizshariff540@gmail.com'
        },
        to,
        subject,
        text,
        html
      });
  
      console.log('Email sent successfully:', info);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Email sending failed');
    }
  };
  