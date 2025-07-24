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

    prompt = f"""Provide job recommendations based on the following data:
Field: {user_input.get('bidang')}
Activities: {user_input.get('aktifitas')}
Skills: {user_input.get('keterampilan')}
Work Preferences: {user_input.get('preferensiKerja')}
Job Type: {user_input.get('tipePekerjaan')}
Challenges: {user_input.get('tantangan')}
Job Variety: {user_input.get('variasiPekerjaan')}
Education: {user_input.get('pendidikan')}
Willingness to Learn New Skills: {user_input.get('belajarSkillBaru')}
Workplace Type: {user_input.get('tipeTempatKerja')}
Work Location: {user_input.get('lokasiKerja')}
Free Time: {user_input.get('waktuLuang')}
Confidence: {user_input.get('kepercayaan')}
Problem Solving: {user_input.get('pemecahanMasalah')}
Work Style: {user_input.get('gayaKerja')}
Social Events: {user_input.get('acaraSosial')}
Job Preferences: {user_input.get('preferensiPekerjaan')}
Decision Making: {user_input.get('pengambilanKeputusan')}
Work Comfort: {user_input.get('kenyamananKerja')}
Communication Style: {user_input.get('gayaKomunikasi')}
Learning Style: {user_input.get('gayaBelajar')}

Suggest 1 to 3 suitable job types for this person, with a brief explanation for each recommendation.
"""

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
