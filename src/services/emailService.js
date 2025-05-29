// src/services/emailService.js
import emailjs from "@emailjs/browser";

// Your EmailJS config (from your previous code)
const SERVICE_ID = "service_w1j4puv";
const TEMPLATE_ID = "template_rp7zcno";
const PUBLIC_KEY = "78A7obGxn0ew1u-Ow";

/**
 * Sends an email using EmailJS
 * @param {Object} form - { name, email, subject, message }
 * @returns {Promise}
 */
export function sendEmail(form) {
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: form.name,
      from_email: form.email,
      subject: form.subject,
      message: form.message,
    },
    PUBLIC_KEY
  );
}
