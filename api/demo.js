import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, temple, role } = req.body;

  if (!name || !email || !temple) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await resend.emails.send({
      from: 'Varadanam Demo <noreply@varadanam.com>',
      to: ['hello@varadanam.com'],
      replyTo: email,
      subject: `New Demo Request — ${temple}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; background: #faf6ef; padding: 32px; border-radius: 12px;">
          <div style="border-bottom: 2px solid #FF6906; padding-bottom: 16px; margin-bottom: 24px;">
            <h2 style="margin: 0; color: #1a1108; font-size: 22px;">New Demo Request</h2>
            <p style="margin: 6px 0 0; color: #9a8a74; font-size: 14px;">via varadanam.com</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #7a6a54; font-size: 13px; width: 120px; font-family: sans-serif;">Name</td>
              <td style="padding: 10px 0; color: #1a1108; font-size: 15px; font-weight: 600;">${name}</td>
            </tr>
            <tr style="border-top: 1px solid rgba(42,26,6,0.08);">
              <td style="padding: 10px 0; color: #7a6a54; font-size: 13px; font-family: sans-serif;">Email</td>
              <td style="padding: 10px 0; color: #1a1108; font-size: 15px;"><a href="mailto:${email}" style="color: #FF6906;">${email}</a></td>
            </tr>
            <tr style="border-top: 1px solid rgba(42,26,6,0.08);">
              <td style="padding: 10px 0; color: #7a6a54; font-size: 13px; font-family: sans-serif;">Phone</td>
              <td style="padding: 10px 0; color: #1a1108; font-size: 15px;"><a href="tel:${phone}" style="color: #FF6906;">${phone || '—'}</a></td>
            </tr>
            <tr style="border-top: 1px solid rgba(42,26,6,0.08);">
              <td style="padding: 10px 0; color: #7a6a54; font-size: 13px; font-family: sans-serif;">Temple</td>
              <td style="padding: 10px 0; color: #1a1108; font-size: 15px; font-weight: 600;">${temple}</td>
            </tr>
            <tr style="border-top: 1px solid rgba(42,26,6,0.08);">
              <td style="padding: 10px 0; color: #7a6a54; font-size: 13px; font-family: sans-serif;">Role</td>
              <td style="padding: 10px 0; color: #1a1108; font-size: 15px;">${role || '—'}</td>
            </tr>
          </table>

          <div style="margin-top: 28px; padding: 16px 20px; background: #fff3e8; border-left: 3px solid #FF6906; border-radius: 6px;">
            <p style="margin: 0; font-size: 13px; color: #7a6a54; font-family: sans-serif;">
              Reply directly to this email to reach <strong style="color: #1a1108;">${name}</strong> at ${email}.
            </p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
