# 🚀 Panduan Proyek Internet Computer + Frontend Containerized

Proyek ini terdiri dari backend **Motoko** dan frontend **React**, yang berjalan di dalam container **Docker**. Panduan ini membantu Anda membangun, masuk, dan menjalankan seluruh sistem secara lokal menggunakan `dfx` di dalam container melalui Docker Desktop.

---

## 🛠️ Prasyarat

- [Docker](https://www.docker.com/) sudah terinstal
- Folder proyek sudah diclone dari repositori ini
- File `Dockerfile` dan `docker-compose.yaml` berada di root
- Port **3000** (untuk frontend) dan **4943** (untuk DFX) tidak sedang digunakan

---

## 🧱 1. Build Container

Jalankan perintah berikut untuk membangun container:

```bash
docker-compose up --build -d
```

## 🐳 2. Masuk ke Dalam Container

Gunakan perintah ini untuk masuk ke dalam container:

```bash
docker container exec -it icp-dev-env /bin/bash
```

---

## ⚙️ 3. Konfigurasi

Salin file `.env.example` menjadi `.env` dan isi sesuai kebutuhan:

```bash
cp .env.example .env
```

Salin file `.env.gemini.example` menjadi `.env.gemini` dan isi sesuai kebutuhan:

```bash
cp .env.gemini.example .env.gemini
```

---

## 🔧 4. Menjalankan DFX

Posisikan direktori ke dalam folder proyek:

```bash
cd /root/app/skillsnap 
dfx start --background --host 0.0.0.0:4943
```

---

## 🚀 5. Deploy DFX

Jika terjadi error, abaikan saja (karena lingkungan frontend mungkin belum sepenuhnya siap):

```bash
dfx deploy

dfx generate
```

---

## 📁 6. Masuk ke Direktori Frontend

Pindah ke direktori frontend React:

```bash
cd src/skillsnap_frontend
```

---

## 📦 7. Install Dependensi Frontend

Pasang semua dependensi:

```bash
npm install
```

---

## 🏗️ 8. Build Struktur Frontend

Bangun aplikasi React:

```bash
npm run build
```

Jika terjadi error karena dependensi belum terinstal, jalankan:

```bash
npm install html-webpack-plugin --save-dev
```

---

## 🔙 9. Kembali ke Direktori Utama

Pindah kembali ke direktori proyek utama:

```bash
cd /root/app/skillsnap
```

---

## 🔄 10. Generate DFX Bindings

Jalankan perintah berikut untuk menghasilkan binding canister:

```bash
dfx generate
```

---

## ▶️ 11. Jalankan Aplikasi React

Pindah lagi ke folder frontend dan jalankan server React:

```bash
cd src/skillsnap_frontend

npm run start
```

---

## 🚀 12. Deploy Ulang DFX (Jika Dibutuhkan)

```bash
cd /root/app/skillsnap

dfx deploy
```

## 🐍 13. Membuat Virtual Environment (Python)

Posisikan ke direktori proyek:

```bash
cd /src/skillsnap_frontend/

python3 -m venv venv

source venv/bin/activate
```

---

## 📄 14. Instalasi Dependensi Python

Instal dependensi untuk kelancaran program python

```bash
pip install -r requirements.txt
```

---
## ⚡ 15. Menjalankan Proksi AI (Gemini)

```bash
python gemini_proxy.py
```

---

## 🔄 16. Lakukan Deploy dan Generate Ulang DFX, Restart Proxy AI dan Frontend
