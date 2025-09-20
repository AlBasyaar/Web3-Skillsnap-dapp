from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai
import os
from pathlib import Path
import PyPDF2
import json

# Load .env.gemini
env_path = Path(__file__).parent / '.env.gemini'
load_dotenv(dotenv_path=env_path)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Konfigurasi Gemini SDK
genai.configure(api_key=GEMINI_API_KEY)

# Inisialisasi Flask
app = Flask(__name__)
CORS(app)

import PyPDF2

def extract_text_from_pdf(filepath):
    text = ""
    with open(filepath, "rb") as f:
        reader = PyPDF2.PdfReader(f)
        for page in reader.pages:
            text += page.extract_text() or ""
    return text

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

@app.route("/ai/upload_certificate", methods=["POST"])
def upload_certificate():
    file = request.files['file']
    upload_dir = "./uploads"
    os.makedirs(upload_dir, exist_ok=True)
    filepath = f"./uploads/{file.filename}"
    file.save(filepath)

    # Extract text
    content = extract_text_from_pdf(filepath)

    # Prompt lebih ketat
    model = genai.GenerativeModel(model_name="models/gemini-1.5-flash-002")
    prompt = f"""
You are an AI that extracts structured data from certificates.

Only respond with a valid JSON object, nothing else.

Fields:
- skill: (string, the primary skill verified in this certificate)
- issuer: (string, the organization or institution issuing the certificate)
- confidence: (float between 0 and 1, your confidence in the extraction)

Certificate content:
{content}
"""

    result = model.generate_content(prompt)

    # Bersihkan output
    raw_text = result.text.strip()
    if raw_text.startswith("```"):
        raw_text = raw_text.strip("`").replace("json", "", 1).strip()

    # Parse JSON
    try:
        ai_output = json.loads(raw_text)
        skill = ai_output.get("skill", "unknown")
        issuer = ai_output.get("issuer", "Unknown")
        confidence = ai_output.get("confidence", 0.0)
    except Exception:
        skill = "unknown"
        issuer = "Unknown"
        confidence = 0.0

    return jsonify({
        "skill": skill,
        "issuer": issuer,
        "confidence": confidence,
        "status": "verified" if skill != "unknown" else "unverified",
        "file_url": filepath
    })


# Jalankan Flask
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
