import emailjs from "@emailjs/browser";

// Use the correct VITE_ prefix and all caps
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

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
