import { BusinessInput } from '../types';

export interface PresetBusiness {
  id: string;
  name: string;
  badge: string;
  data: BusinessInput;
}

export const PRESET_BUSINESSES: PresetBusiness[] = [
  {
    id: 'syagha-repair',
    name: 'Syagha Body Repair',
    badge: 'Automotive / Featured',
    data: {
      brandName: 'Syagha Body Repair & Detailing',
      category: 'Automotive',
      productDescription: 'Body repair (baret/penyok) + detailing & coating mobil (repaint cat oven anti-belang bergaransi, salon detailing & nano ceramic coating 9H wet-look)',
      targetAudience: 'Pemilik mobil/motor hobi car care, modifikasi, dan diler mobil bekas',
      mainProblem: 'Mobil baret dan penyok bikin gengsi turun dan harga jual drop drastis, takut hasil cat belang di bengkel abal-abal, serta biaya tidak transparan.',
      usp: 'Color matching computerized akurat anti-belang, ruang cat oven modern bergaransi, teknisi detailing bersertifikat, dan free estimasi biaya instan via WhatsApp dalam 10 menit.',
      offerCta: 'Kirim foto baret/penyok mobil atau motor Anda ke WhatsApp sekarang untuk Estimasi Biaya Gratis + Diskon Khusus Paket Coating Minggu Ini!',
      toneOfVoice: 'Prolog / Monolog UGC (Candid di workshop, bertutur akrab seperti sesama car enthusiast yang jujur dan paham seluk-beluk mobil)',
      platform: 'TikTok & Instagram Reels (9:16 Vertical Video) + Meta Ads WhatsApp Leads'
    }
  },
  {
    id: 'kopi-susu',
    name: 'Kopi Susu Seduhjiwa',
    badge: 'F&B / Kafe',
    data: {
      brandName: 'Seduhjiwa Coffee',
      category: 'Food & Beverage / Artisan Coffee',
      productDescription: 'Kopi susu gula aren oatmilk premium dengan biji arabika Flores, rendah asam lambung, dan rasa creamy seimbang tanpa pemanis buatan.',
      targetAudience: 'Pekerja kantoran & Gen Z (21-34 tahun) yang butuh kafein harian tapi sering mulas atau lelah dengan kopi kemanisan.',
      mainProblem: 'Sering lemas jam 2 siang, tapi kopi biasa bikin maag kambuh dan terlalu manis.',
      usp: '100% Arabika Flores cold brew blend + oatmilk organik, aman di lambung & kalori bersahabat.',
      offerCta: 'Promo Beli 2 Gratis 1 untuk pesanan pertama di GoFood / GrabFood dengan kode JIWARAME.',
      toneOfVoice: 'Santai & Akrab ala Podcast (warm, candid, seperti ngobrol sama sahabat di kedai kopi)',
      platform: 'TikTok & Instagram Reels (9:16 Vertical)'
    }
  },
  {
    id: 'skincare-serum',
    name: 'Lumina Barrier Serum',
    badge: 'Beauty & Skincare',
    data: {
      brandName: 'Lumina Skincare',
      category: 'Kecantikan & Perawatan Kulit',
      productDescription: 'Serum 5X Ceramide + 4% Niacinamide liposomal untuk memperbaiki skin barrier rusak, meredakan kemerahan, dan memudarkan bekas jerawat dalam 14 hari.',
      targetAudience: 'Wanita & Pria usia 18-35 tahun yang frustasi karena breakout berkepanjangan akibat over-exfoliasi atau salah produk.',
      mainProblem: 'Kulit sensitif, gampang merah, jerawat tidak sembuh-sembuh walau sudah coba banyak skincare mahal.',
      usp: 'Teknologi Liposomal Delivery yang meresap 3x lebih dalam tanpa lengket, teruji klinis hypoallergenic.',
      offerCta: 'Diskon 35% + Free Travel Pouch untuk 100 checkout pertama di TikTok Shop / Shopee.',
      toneOfVoice: 'Empatik, Terbuka & Edukatif (seperti sesi curhat podcast dermatologi santai)',
      platform: 'TikTok / Reels / Meta Video Ads'
    }
  },
  {
    id: 'kursus-tech',
    name: 'KarirPlus Data Academy',
    badge: 'EdTech / Karir',
    data: {
      brandName: 'KarirPlus',
      category: 'Pendidikan & Bootcamp Karir',
      productDescription: 'Bootcamp intensif Data Analytics & AI Tools 12 minggu dari nol sampai siap kerja, dengan portofolio riil industri dan jaminan interview kerja.',
      targetAudience: 'Fresh graduate & karyawan yang merasa stuck di karir saat ini, ingin banting setir ke industri tech dengan gaji 2 digit.',
      mainProblem: 'Merasa tersaingi, bingung mulai belajar data dari mana tanpa background IT, takut buang uang kursus abal-abal.',
      usp: 'Kurikulum praktis no-coding jargon, 1-on-1 mentor dari praktisi Unicorn, dan network 150+ hiring partners.',
      offerCta: 'Daftar Free Trial Class 3 Hari + E-book Roadmap Karir Data 2025 di karirplus.id',
      toneOfVoice: 'Inspiratif, Realistis & Memotivasi (gaya podcast obrolan karir yang jujur tanpa janji muluk)',
      platform: 'Meta Ads & YouTube Shorts'
    }
  },
  {
    id: 'agensi-digital',
    name: 'ScaleCraft Creative Agency',
    badge: 'B2B / Agensi',
    data: {
      brandName: 'ScaleCraft Media',
      category: 'Digital Agency & Performance Creative',
      productDescription: 'Layanan pembuatan iklan video UGC dan pengelolaan Meta & TikTok Ads dengan sistem performance-based untuk brand lokal yang ingin tembus 1 Miliar/bulan.',
      targetAudience: 'Owner brand fashion, skincare, dan F&B lokal yang boncos pasang iklan sendiri atau lelah gonta-ganti agensi tanpa hasil.',
      mainProblem: 'Biaya iklan (ROAS) terus turun, konten lama sudah jenuh, dan tidak punya tim in-house kreatif yang paham algoritma.',
      usp: 'Formula 20 Creative Hook testing per minggu + funnel optimization berbasis data real time.',
      offerCta: 'Book 30-Menit Free Growth Audit akun iklan Anda bersama Lead Strategist kami.',
      toneOfVoice: 'Otoritatif, Tajam & Berwawasan Bisnis (gaya podcast bisnis elit seperti Diary of a CEO)',
      platform: 'Instagram Reels & LinkedIn Ads'
    }
  }
];
