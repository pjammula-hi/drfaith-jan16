import "dotenv/config";
import cors from "cors";
import express from "express";
import nodemailer from "nodemailer";

const app = express();
const port = Number.parseInt(process.env.PORT ?? "3001", 10);

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ?.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins?.length ? allowedOrigins : true,
  }),
);
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? "smtp.gmail.com",
  port: Number.parseInt(process.env.SMTP_PORT ?? "465", 10),
  secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE !== "false" : true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const isTransportConfigured = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);

if (isTransportConfigured) {
  transporter.verify().catch((error) => {
    console.error("Email transport configuration issue:", error);
  });
} else {
  console.warn("SMTP credentials are not set; contact form emails are disabled.");
}

app.post("/api/contact", async (req, res) => {
  const { formData, captchaToken } = req.body ?? {};

  if (!formData || typeof formData !== "object") {
    return res.status(400).json({ error: "Invalid form payload." });
  }

  if (!captchaToken || typeof captchaToken !== "string") {
    return res.status(400).json({ error: "Missing captcha token." });
  }

  const requiredFields = ["firstName", "lastName", "email", "phone", "service"];
  const missingFields = requiredFields.filter((field) => !formData[field]?.trim());

  if (missingFields.length > 0) {
    return res.status(400).json({ error: `Missing required fields: ${missingFields.join(", ")}` });
  }

  if (!process.env.RECAPTCHA_SECRET_KEY) {
    return res.status(500).json({ error: "reCAPTCHA is not configured on the server." });
  }

  if (!isTransportConfigured) {
    return res.status(500).json({ error: "Email transport is not configured on the server." });
  }

  try {
    const params = new URLSearchParams();
    params.append("secret", process.env.RECAPTCHA_SECRET_KEY);
    params.append("response", captchaToken);

    const verifyResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const verification = await verifyResponse.json();

    if (!verification.success || (typeof verification.score === "number" && verification.score < 0.5)) {
      return res.status(400).json({ error: "Captcha verification failed." });
    }

    const recipient = process.env.CONTACT_RECIPIENT ?? "jpravin@gmail.com";
    const mailSubject = `New message from ${formData.firstName} ${formData.lastName}`;
    const messageLines = [
      `Name: ${formData.firstName} ${formData.lastName}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Service of Interest: ${formData.service}`,
      "",
      "Message:",
      formData.message?.trim() || "No additional message provided.",
    ];

    await transporter.sendMail({
      from: `"${formData.firstName} ${formData.lastName}" <${process.env.SMTP_USER}>`,
      to: recipient,
      replyTo: formData.email,
      subject: mailSubject,
      text: messageLines.join("\n"),
      html: `
        <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Service of Interest:</strong> ${formData.service}</p>
        <p><strong>Message:</strong></p>
        <p>${(formData.message?.trim() || "No additional message provided.").replace(/\n/g, "<br />")}</p>
      `,
    });

    return res.json({ success: true });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return res.status(500).json({ error: "Failed to send your message. Please try again later." });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Contact form server listening on port ${port}`);
});
