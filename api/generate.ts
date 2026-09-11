import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey && apiKey !== "MY_GEMINI_API_KEY" ? new GoogleGenAI({ apiKey }) : null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const businessInput = req.body;
    if (!businessInput) {
      return res.status(400).json({ error: "Data bisnis belum lengkap" });
    }

    if (!ai) {
      return res.status(500).json({ error: "API Key Gemini belum dikonfigurasi di Vercel." });
    }

    const prompt = `Anda adalah VISTA (Visual Intelligence Storytelling & Transformation Architecture)... 
    DATA BISNIS DARI KLIEN:
    - Nama Brand/Bisnis: ${businessInput.brandName}
    - Kategori Industri: ${businessInput.category}
    - Deskripsi Produk/Layanan: ${businessInput.productDescription}
    - Target Audiens: ${businessInput.targetAudience}
    - Masalah Utama Konsumen (Pain Point): ${businessInput.mainProblem}
    - Keunggulan Unik (USP): ${businessInput.usp}
    - Penawaran / Promo / CTA: ${businessInput.offer}
    - Gaya Bahasa / Tone of Voice: ${businessInput.toneOfVoice}
    - Platform Utama: ${businessInput.platform}
    
    Berikan hasil output dalam format JSON murni.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const rawText = response.text || "{}";
    const cleanJson = rawText.trim().replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/, '');
    const parsedData = JSON.parse(cleanJson);

    return res.status(200).json(parsedData);
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return res.status(500).json({ error: error.message || "Terjadi kesalahan pada server." });
  }
      }
