# **_Mail Concept_**

> ## **Mail Protocols**

1. ### **Simple Mail Transfer Protocol(SMTP): -** _It is the standard protocol used to send emails from one server to another over the Internet._

2. ### **Email access protocols: -** _To read email, protocols like IMAP or POP3 are used_

   1. **Post Office Protocol version 3 (POP3) Workflow: -** _All the changes happens locally on the per device._

      - User opens their email client (like Outlook or Thunderbird).
      - The client connects to the mail server using the POP3 protocol.
      - Emails are downloaded from the server to the local device.
      - (Usually) The emails are then deleted from the server.
      - User reads, stores, and manages emails locally.

   2. **Internet Message Access Protocol v4 (IMAP4) Workflow: -** _All the changes happens locally on the server._

      - User opens email client (mobile, desktop, or web).
      - The client connects to the mail server using IMAP4.
      - Emails stay on the server.
      - User reads, deletes, or moves emails — changes happen on the server.
      - All devices see the same inbox because it's synced.

| Action               | POP3 Behavior           | IMAP4 Behavior             |
| -------------------- | ----------------------- | -------------------------- |
| Read on phone        | Still unread on laptop  | Also marked read on laptop |
| Delete on phone      | Still visible on laptop | Also deleted on laptop     |
| Access on 3rd device | No emails there         | Emails all synced          |

## The process of send mail via gmail to gmail (same mail server) , and sending (different mail server) mail vai gamil to outlook, or outlook to yahoo are different ?

1. **Case 1: Gmail to Gmail (same mail server): -**
2. **Case 2: Gmail to Outlook or Yahoo (different mail server): -**

> ### **Port 465 vs Port 587**

| Port | Encryption Type   | Recommended | Config                 |
| ---- | ----------------- | ----------- | ---------------------- |
| 587  | STARTTLS (modern) | ✅ Yes      | `starttls.enable=true` |
| 465  | SSL/TLS (legacy)  | ⚠️ Optional | `ssl.enable=true`      |

**Note:** When people say "SSL" today, they usually mean TLS!

- **SSL (Secure Sockets Layer): -**
  - Legacy: - protocol Original encryption standard (SSL 3.0 from 1996)
  - Deprecated: - No longer considered secure
  - Direct encryption: - Connection starts encrypted from the beginning
- **TLS (Transport Layer Security): -**
  - Modern replacement for SSL (TLS 1.0 released in 1999)
  - Current standard - TLS 1.2 and TLS 1.3 are widely used
  - Better security - Improved encryption algorithms and security features
  - Backward compatible - Often called "SSL/TLS" for historical reasons

1. **Implicit TLS (Port 465): -** _Connection starts immediately encrypted, from the first byte_

   - Client connects → Immediately encrypted connection → Send email

2. **STARTTLS (Port 587): -** _Connection starts unencrypted, then upgrades to TLS_
   - Client connects → Plain connection → STARTTLS command → Upgrade to encrypted → Send email

> ## Lets Understand Mail Sender Packages in Different programming Languages

1. **Nodemailer in js: -** Mail client library to send emails

   ```javascript
   // Arrow function with destructured parameters
   export const emailTransporter = async ({
     toEmail,
     subject,
     fallbackEmail,
     template,
   }: EmailPropsTypes) => {
     // nodemailer properties configurations
     const transporter = nodemailer.createTransport({
       host: process.env.EMAIL_HOST,
       port: 465,
       secure: true, // true for port 465 (SSL), false for port 587 (STARTTLS)
       auth: {
         user: process.env.EMAIL_FROM,
         pass: process.env.EMAIL_PASS,
       },
     });

     // email structure configurations
     const mailOptions = {
       from: `"karan.email" <${process.env.EMAIL_FROM}>`,
       to: toEmail,
       subject: `${subject} `,
       text: `${fallbackEmail}`,
       html: template(),
     };

     await transporter.sendMail(mailOptions);
   };
   ```

2. **org.springframework.mail.javamail with jakarta.mail in Java: -** Mail client libraries for Java

   ```properties
      #spring emailer
      spring.mail.host=${MAIL_HOST}
      spring.mail.port=${MAIL_PORT}
      spring.mail.username=${MAIL_FROM}
      spring.mail.password=${MAIL_PASS}
      # spring.mail.protocol=smtp

      # Authentication and security settings
      spring.mail.properties.mail.smtp.auth=true

      # These two are **needed** for SSL on port 587, and not for 465
      spring.mail.properties.mail.smtp.starttls.enable=true
      spring.mail.properties.mail.smtp.starttls.required=true

      # These two are **needed** for SSL on port 465, and not for 587
      # spring.mail.properties.mail.smtp.ssl.enable=true
      # spring.mail.properties.mail.smtp.ssl.trust=smtp.zoho.in

      # spring.mail.properties.mail.smtp.socketFactory.port=465
      # spring.mail.properties.mail.smtp.socketFactory.class=javax.net.ssl.SSLSocketFactory
      # spring.mail.properties.mail.smtp.socketFactory.fallback=false
   ```

   ```java
      // email structure configurations
      public void sendEmail(String toEmail, String subject, String htmlTextContent) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            // To send the html mail we need **Mime**
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(htmlTextContent, true);
            mailSender.send(mimeMessage);
        } catch (Exception e) {
            // TODO: handle exception
            throw new RuntimeException("Failed to send email: " + e.getMessage());
        }

    }
   ```

- Additional Configuraiton like Connection Timeouts etc(Check by going into the package library) can also be done in both the Packages.
