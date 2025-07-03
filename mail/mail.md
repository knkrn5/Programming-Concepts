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

1. **Case 1: Gmail → Gmail (same mail server): -**
2. **Case 2: Gmail → Outlook or Yahoo (different mail server): -**

> ## Lets Understand Mail Sender Packages in Different programming Languages

1. **Nodemailer in js: -** Mail client library to send emails

   ```javascript

   ```

2. **org.springframework.mail.javamail with jakarta.mail in Java: -** Mail client libraries for Java

   ```properties
   #spring emailer application properties configs
   spring.mail.host=${MAIL_HOST}
   spring.mail.port=465
   spring.mail.username=${MAIL_FROM}
   spring.mail.password=${MAIL_PASS}
   # spring.mail.protocol=smtp

   # These two are **not needed** for SSL on port 465 and may cause issues
   # spring.mail.properties.mail.smtp.starttls.enable=true
   # spring.mail.properties.mail.smtp.starttls.required=true



   # Instead, use SSL config:
   spring.mail.properties.mail.smtp.auth=true
   spring.mail.properties.mail.smtp.ssl.enable=true
   spring.mail.properties.mail.smtp.ssl.trust=smtp.zoho.in
   # spring.mail.properties.mail.smtp.socketFactory.port=465
   # spring.mail.properties.mail.smtp.socketFactory.class=javax.net.ssl.SSLSocketFactory
   # spring.mail.properties.mail.smtp.socketFactory.fallback=false
   ```
