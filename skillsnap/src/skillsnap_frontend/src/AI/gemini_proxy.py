from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai
import os
from pathlib import Path

# Load .env.gemini
env_path = Path(__file__).parent / '.env.gemini'
load_dotenv(dotenv_path=env_path)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Konfigurasi Gemini SDK
genai.configure(api_key=GEMINI_API_KEY)

# Inisialisasi Flask
app = Flask(__name__)
CORS(app)

# Endpoint rekomendasi
@app.route("/ai/rekomendasi", methods=["POST"])
def rekomendasi_karir():
    user_input = request.json

    prompt = f"""Buatkan rekomendasi pekerjaan untuk data berikut:
Minat: {user_input.get('bidangMinat')}
Aktivitas: {user_input.get('aktivitasSuka')}
Tools: {user_input.get('toolsDikuasai')}
Tim: {user_input.get('kerjaTim')}
Struktur: {user_input.get('strukturKerja')}
Tantangan Stabil: {user_input.get('tantanganStabil')}
Variasi Kerja: {user_input.get('variasiKerja')}
Pendidikan: {user_input.get('pendidikanTerakhir')}
Kesediaan Belajar: {user_input.get('bersediaBelajar')}
Tipe Kerja: {user_input.get('tipeKerja')}
Lokasi: {user_input.get('lokasiKerja')}
Kepribadian: {user_input.get('kepribadian')}
Berikan 1-3 jenis pekerjaan yang cocok, dengan alasan singkat."""

    try:
        model = genai.GenerativeModel(model_name="models/gemini-1.5-flash-002")
        response = model.generate_content(prompt)
        rekomendasi = response.text
    except Exception as e:
        print("Error:", e)
        rekomendasi = "Gagal mengambil rekomendasi dari Gemini"

    return jsonify({"rekomendasi": rekomendasi})

# Jalankan Flask
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
