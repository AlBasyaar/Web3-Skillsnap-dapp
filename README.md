# 🚀 Internet Computer Project Guide + Frontend Containerized

This project consists of a **Motoko** backend and a **React** frontend, running inside a **Docker** container. This guide helps you build, log in, and run the entire system locally using `dfx` inside a container via Docker Desktop.

---

## 🛠️ Requirements

- [Docker](https://www.docker.com/) is already installed
- The project folder has been cloned from this repository
- If you are using Windows, we recommend using Windows PowerShell or Git Bash.
- Ports **3000** (for the frontend) and **4943** (for DFX) are not currently in use

---

## 🧱 1. Building Containers

Go to the cloned folder and run the following command to build the container:

```bash
docker-compose up --build -d
```

## 🐳 2. Enter the Container

Use this command to enter the container:

```bash
docker container exec -it icp-dev-env /bin/bash
```

If you are using Linux OS, you can run the above command directly, whereas if you are using Docker Desktop, you must first open it and enter the terminal from Docker.

---

## ⚙️ 3. Configuration

Copy the `.env.example` file to `.env` and fill it in as needed:

```bash
cp .env.example .env
```

go to the gemini proxy configuration folder.

```bash
cd src/skillsnap_frontend/src/AI/
```

Copy the `.env.gemini.example` file to `.env.gemini` and fill it in as needed:

```bash
cp .env.gemini.example .env.gemini
```

Open and edit the .env.gemini file by adding the gemini token.

---

## 🔧 4. Running DFX

Place the directory into the project folder:

```bash
cd /root/app

npm install

dfx start --background --host 0.0.0.0:4943
```

---

## 🚀 5. Deploying DFX

If an error occurs, just ignore it (because the frontend environment may not be fully ready):

```bash
dfx deploy

dfx generate
```

---

## 📁 6. Go to the Frontend Directory

Move to the React frontend directory:

```bash
cd src/skillsnap_frontend
```

---

## 📦 7. Install Frontend Dependencies

Install all dependencies:

```bash
npm install
```

---

## 🏗️ 8. Build the frontend structure

Build a React app:

```bash
npm run build
```

---

## 🔙 9. Back to Main Directory

Return to the main project directory:

```bash
cd /root/app
```

---

## 🔄 10. Generate DFX Bindings

Run the following command to generate the binding canister:

```bash
dfx generate
```

---

## ▶️ 11. Run the React Application

Move back to the frontend folder and run the React server:

```bash
cd src/skillsnap_frontend

npm run start
```

---

## 🚀 12. Redeploy DFX (if necessary)

```bash
cd /root/app

dfx deploy
```

## 🐍 13. Creating a Virtual Environment (Python)

Place it in the project directory:

```bash
cd /src/skillsnap_frontend/

apt-get update

apt install python3.11-venv

python3 -m venv venv

source venv/bin/activate
```

---

## 📄 14. Installing Python Dependencies

Run this command to enter the appropriate folder:

```bash
cd src/AI/
```

Install dependencies for smooth Python program execution

```bash
pip install -r requirements.txt
```

---
## ⚡ 15. Running the AI Proxy (Gemini)

```bash
python gemini_proxy.py
```

---

## 🔄 16. Deploy and regenerate DFX, restart AI proxy and frontend
