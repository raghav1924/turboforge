# Deployment & Production Operations — TurboForge

**Target:** Full-Stack Monorepo Generator with Modern Presets  
**Author:** Jatin Sharma ([https://jatinsh.netlify.app/](https://jatinsh.netlify.app/))

---

## 1. Container Deployment (Docker)

```bash
docker build -t turboforge:latest .
docker run -d -p 3000:3000 --name turboforge turboforge:latest
```

## 2. Process Manager (PM2)

```bash
npm install -g pm2
pm2 start dist/bin.js --name "turboforge" -- studio --port 3000
```

## 3. Systemd Service Unit

```ini
[Unit]
Description=TurboForge Background Service
After=network.target

[Service]
Type=simple
User=node
WorkingDirectory=/opt/turboforge
ExecStart=/usr/bin/node dist/bin.js studio --port 3000
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```
