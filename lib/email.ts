import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendBookingConfirmation(data: {
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
  vehicleType: string;
}) {
  await getResend().emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: data.email,
    subject: "✅ Booking Confirmed — El Túnel de Matienzo",
    html: `
      <div style="font-family: sans-serif; background: #050505; color: #fff; padding: 40px; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #007BFF; font-size: 28px; margin-bottom: 8px;">El Túnel de Matienzo</h1>
        <p style="color: #888; margin-bottom: 32px;">Puerto Rico's Premium Auto Detailing</p>
        <h2 style="color: #fff; margin-bottom: 24px;">Your appointment is confirmed!</h2>
        <div style="background: #111; border: 1px solid #007BFF33; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <p><strong style="color: #007BFF;">Name:</strong> ${data.name}</p>
          <p><strong style="color: #007BFF;">Service:</strong> ${data.service}</p>
          <p><strong style="color: #007BFF;">Vehicle:</strong> ${data.vehicleType}</p>
          <p><strong style="color: #007BFF;">Date:</strong> ${data.date}</p>
          <p><strong style="color: #007BFF;">Time:</strong> ${data.time}</p>
        </div>
        <p style="color: #888; font-size: 14px;">Questions? Reply to this email or call us directly.</p>
      </div>
    `,
  });
}

export async function sendAdminNotification(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  vehicleType: string;
}) {
  await getResend().emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: process.env.ADMIN_EMAIL!,
    subject: `📅 New Booking: ${data.name} — ${data.service}`,
    html: `
      <div style="font-family: sans-serif; padding: 24px;">
        <h2>New Booking Received</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Service:</strong> ${data.service}</p>
        <p><strong>Vehicle:</strong> ${data.vehicleType}</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Time:</strong> ${data.time}</p>
      </div>
    `,
  });
}
