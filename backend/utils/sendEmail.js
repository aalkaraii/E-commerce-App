import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, text, html }) => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.log("\n=================== PASSWORD RESET EMAIL ===================");
    console.log(`To:      ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Content:\n${text}`);
    console.log("============================================================\n");
    return { success: true, loggedToConsole: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Admin Support" <${SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });

    return { success: true, loggedToConsole: false };
  } catch (error) {
    console.error("Error sending email via nodemailer:", error);
    // Fall back to console logging so the application doesn't completely block development
    console.log("\n=================== PASSWORD RESET EMAIL (FALLBACK) ===================");
    console.log(`To:      ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Content:\n${text}`);
    console.log("========================================================================\n");
    return { success: true, loggedToConsole: true, error: error.message };
  }
};

export default sendEmail;
