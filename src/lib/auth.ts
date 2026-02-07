import { betterAuth, includes } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.APP_URL!, process.env.PROD_APP_URL!],

  baseURL: process.env.BETTER_AUTH_URL,
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  secret: process.env.BETTER_AUTH_SECRET,
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false,
    },
    disableCSRFCheck: true,
    generateSessionToken: undefined,
    defaultCookieAttributes: {
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      path: "/",
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "NONE",
        required: true,
      },
      accountStatus: {
        type: "string",
        defaultValue: "ACTIVE",
        required: true,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationUrl = `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.NEXT_PUBLIC_PROD_APP_URL}`;

        const info = await transporter.sendMail({
          from: '"Food Hub" <protik0939@gmail.com>',
          to: user.email,
          subject: "Verify your email address | Food Hub",
          text: `Verify your email address by clicking the link: ${verificationUrl}`,
          html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Email Verification</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 0;">
          <table width="100%" max-width="600px" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
            
            <!-- Header -->
            <tr>
              <td style="background:#ff6b00; padding:24px; text-align:center; color:#ffffff;">
                <h1 style="margin:0; font-size:24px;">Food Hub</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:32px; color:#333333;">
                <h2 style="margin-top:0;">Verify your email address</h2>
                <p style="font-size:15px; line-height:1.6;">
                  Hi <strong>${user.name || "there"}</strong>,
                </p>
                <p style="font-size:15px; line-height:1.6;">
                  Thanks for signing up for <strong>Food Hub</strong>!  
                  Please confirm your email address by clicking the button below.
                </p>

                <div style="text-align:center; margin:32px 0;">
                  <a href="${verificationUrl}"
                    style="
                      background:#ff6b00;
                      color:#ffffff;
                      text-decoration:none;
                      padding:14px 28px;
                      border-radius:6px;
                      font-size:16px;
                      display:inline-block;
                    ">
                    Verify Email
                  </a>
                </div>

                <p style="font-size:14px; color:#666;">
                  If the button doesn’t work, copy and paste this link into your browser:
                </p>

                <p style="font-size:13px; word-break:break-all; color:#555;">
                  ${verificationUrl}
                </p>

                <p style="font-size:14px; color:#666;">
                  This link will expire soon for security reasons.
                </p>

                <p style="font-size:14px; margin-top:24px;">
                  — The Food Hub Team
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f4f6f8; padding:16px; text-align:center; font-size:12px; color:#888;">
                © ${new Date().getFullYear()} Food Hub. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `,
        });

        console.log("Message Sent Successfully: ", info.messageId);
      } catch (error) {
        console.error("Something Went Wrong: ", error);
        throw error;
      }
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      prompt: "select_account consent",
      accessType: "offline",
    },
  },
});
