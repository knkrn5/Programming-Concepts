# 🧱 **Certbot Installation & SSL Setup Guide (Ubuntu + Nginx)**

---

## ⚙️ 1. Understanding Certbot

**Certbot** is the official tool from the **Electronic Frontier Foundation (EFF)** that automates:

* Getting SSL/TLS certificates from **Let’s Encrypt**
* Installing them in your web server (like Nginx)
* Renewing them automatically

Let’s Encrypt certificates are **100% free**, trusted by all browsers, and valid for **90 days** (Certbot handles auto-renewal).

---

## 🧩 2. Installing Certbot using **APT** (Old Method)


### 📦 Step 1 — Install Certbot

```bash
sudo apt update
sudo apt install -y certbot python3-certbot-nginx
```

This installs Certbot and its Nginx plugin.

---

### 🧠 Step 2 — Verify installation

```bash
certbot --version
```

Example output:

```
certbot 2.9.0
```

---

## ❌ 3. Uninstalling Certbot (APT version)

If you ever installed Certbot via `apt`, you should remove it **before switching to Snap** (as recommended by Let’s Encrypt).

Run:

```bash
sudo apt remove --purge certbot python3-certbot-nginx -y
sudo apt autoremove -y
```

Check if any remnants remain:

```bash
which certbot
```

If it shows `/usr/bin/certbot`, it’s the APT version.
If it shows nothing — good, it’s fully removed.

---

## ✅ 4. Installing Certbot using **SNAP** (Recommended Method)

Let’s Encrypt **officially recommends** using Snap for new installations because:

* Snap version is always up-to-date
* It includes all necessary dependencies
* It auto-updates automatically in the background

---

### 📦 Step 1 — Install Snap (if not already installed)

```bash
sudo apt update
sudo apt install -y snapd
sudo snap install core
sudo snap refresh core
```

---

### ⚙️ Step 2 — Install Certbot (latest)

```bash
sudo snap install --classic certbot
```

Then create a symlink for convenience:

```bash
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

---

### 🧠 Step 3 — Verify installation

```bash
certbot --version
```

You should see something like:

```
certbot 5.1.0
```

---

## 🌐 5. Prepare Nginx for SSL

Before generating the certificate, make sure:

* Your domain points to your EC2 public IP.
* Your Nginx configuration listens on port 80 (HTTP).

Example minimal config:

```nginx
server {
    listen 80;
    server_name api.procodrr.org;

    location / {
        proxy_pass http://localhost:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Check syntax and reload:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

---

## 🔐 6. Generate and Install SSL Certificate Automatically

### The easiest one-liner:

```bash
sudo certbot --nginx -d api.procodrr.org --redirect
```
```bash
sudo certbot --nginx \
  --cert-name arunthesis \
  -d arunthesis.com \
  -d www.arunthesis.com
```

This will:

* Detect your Nginx server block
* Use HTTP-01 challenge automatically
* Obtain SSL certificates from Let’s Encrypt
* Install them in your Nginx config
* Add HTTPS redirection automatically
* Reload Nginx for you

---

### ✅ Result

Your config will now include lines like:

```nginx
listen 443 ssl;
ssl_certificate /etc/letsencrypt/live/api.procodrrlabs.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/api.procodrrlabs.com/privkey.pem;
include /etc/letsencrypt/options-ssl-nginx.conf;
ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
```

And you’ll also get an automatic redirect:

```nginx
server {
    listen 80;
    server_name api.procodrrlabs.com;
    return 301 https://$host$request_uri;
}
```

You can now visit:

```
https://api.procodrrlabs.com
```

---

## 🔁 7. Auto-Renewal

Certbot installs a **systemd timer** that runs automatically twice a day to renew certificates.

Check renewal status:

```bash
sudo systemctl list-timers | grep certbot
```

Test renewal manually:

```bash
sudo certbot renew --dry-run
```

---

## 📂 8. Certificate File Locations

Certs and keys are stored under:

```
/etc/letsencrypt/live/<your-domain>/
```

Example:

```
/etc/letsencrypt/live/api.procodrrlabs.com/
 ├─ fullchain.pem   # SSL certificate + intermediate
 ├─ privkey.pem     # Private key
 ├─ cert.pem        # Domain cert only
 └─ chain.pem       # Intermediate CA cert
```

Here are the exact commands you can use to **list all your active certificates** and **delete any of them** cleanly using Certbot 👇

---

## 🧩 **9. List all existing certificates**

Run:

```bash
sudo certbot certificates
```

### 🧠 What this does

It displays all certificates Certbot knows about, for example:

```
Found the following certs:
  Certificate Name: api.procodrrlabs.com
    Domains: api.procodrrlabs.com
    Expiry Date: 2025-02-03 17:00:00+00:00 (VALID: 85 days)
    Certificate Path: /etc/letsencrypt/live/api.procodrrlabs.com/fullchain.pem
    Private Key Path: /etc/letsencrypt/live/api.procodrrlabs.com/privkey.pem

  Certificate Name: procodrrlabs.com
    Domains: procodrrlabs.com, *.procodrrlabs.com
    Expiry Date: 2025-01-29 20:11:00+00:00 (VALID: 80 days)
    Certificate Path: /etc/letsencrypt/live/procodrrlabs.com/fullchain.pem
    Private Key Path: /etc/letsencrypt/live/procodrrlabs.com/privkey.pem
```

Each **Certificate Name** shown there is what you’ll use to delete it.

---

## 🧩 **10. Delete a certificate**

To delete a specific certificate by its name:

```bash
sudo certbot delete --cert-name <certificate_name>
```

### Example:

```bash
sudo certbot delete --cert-name api.procodrrlabs.com
sudo certbot delete --cert-name procodrrlabs.com
```

### 🧠 What happens when you delete

* Certbot removes the `/etc/letsencrypt/renewal/<name>.conf` renewal file.
* It deletes the corresponding `/etc/letsencrypt/live/<name>` and `/etc/letsencrypt/archive/<name>` folders.
* It cleans up all symlinks related to that certificate.

---

## ✅ **11. Verify cleanup**

After deleting, run again:

```bash
sudo certbot certificates
```