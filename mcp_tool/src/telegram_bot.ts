import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";
import { Ollama, Message, Tool } from "ollama";
import {
  getKategori,
  getPertanyaan,
  getPeriode,
  getPublicSurvey,
  getResponden,
  getPenilaian,
  postKategori,
  postPertanyaan,
  postPeriode,
  postPublicSurvey,
} from "./survey.js";

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, { polling: true });
const ollama = new Ollama();

// Simpan conversation history per user
const userSessions: Record<number, Message[]> = {};

function getSession(chatId: number): Message[] {
  if (!userSessions[chatId]) {
    userSessions[chatId] = [
      {
        role: "system",
        content: `
        Kamu adalah asisten admin sistem survei kampus. Jawab dalam Bahasa Indonesia yang profesional dan membantu.

        ## Data yang Tersedia
        1. **Kategori**: Pengelompokan survei (contoh: Kepuasan Mahasiswa, Layanan Kantin).
        2. **Pertanyaan**: Butir-butir pertanyaan yang terikat pada suatu Kategori.
        3. **Periode**: Jadwal waktu berjalannya survei untuk kategori tertentu.
        4. **Survey Publik**: Survei yang siap diisi oleh responden, menghubungkan Kategori dan Periode.
        5. **Responden**: Data orang yang telah mengisi survei.
        6. **Penilaian**: Hasil jawaban/skor dari responden.

        ## Cara Membaca Data (GET)
        - Gunakan \`getKategori\` untuk melihat daftar kategori.
        - Gunakan \`getPertanyaan\` untuk melihat isi pertanyaan.
        - Gunakan \`getPeriode\` untuk mengecek jadwal survei yang aktif/tersedia.
        - Gunakan \`getPublicSurvey\` untuk melihat survei yang sudah dipublikasikan.
        - Gunakan \`getResponden\` dan \`getPenilaian\` untuk melihat hasil survei.

        ## Alur Pembuatan Data (POST)
        1. **Kategori**: Cukup butuh nama kategori (\`ktg_nama\`).
        2. **Pertanyaan**: Butuh \`ktg_id\` dan isi pertanyaan (\`prtn_isi\`).
        3. **Periode**: Butuh \`ktg_id\`, tanggal mulai, tanggal selesai, dan status (1: Aktif, 0: Non-aktif).
        4. **Survey Publik**: Butuh Judul, Deskripsi, period_id, category_id, dan status (true/false).

        ## Aturan Penting
        - **Cari ID Dahulu**: Sebelum melakukan POST (Pertanyaan, Periode, atau Survey), kamu WAJIB mencari ID (Kategori atau Periode) terlebih dahulu menggunakan fungsi GET jika user hanya menyebutkan nama. Jangan menebak ID.
        - **Validasi Tanggal**: Pastikan format tanggal untuk Periode adalah YYYY-MM-DD.
        - **Konfirmasi**: Jika data yang diminta user tidak ditemukan setelah dicari, beri tahu user sebelum menawarkan pembuatan data baru.

        ## Urutan Membuat Survei Lengkap (Step-by-Step)
        Jika user ingin membuat survei dari nol, arahkan atau lakukan langkah ini secara berurutan:
        1. **Kategori**: Pastikan kategori sudah ada (\`getKategori\`) atau buat baru (\`postKategori\`).
        2. **Pertanyaan**: Tambahkan pertanyaan ke kategori tersebut (\`postPertanyaan\`).
        3. **Periode**: Buat periode waktu untuk kategori tersebut (\`postPeriode\`).
        4. **Publikasi**: Buat Survey Publik (\`postPublicSurvey\`) menggunakan ID Periode dan ID Kategori yang baru saja dibuat/didapatkan.
        `,
      },
    ];
  }
  return userSessions[chatId];
}

// tools dan toolRegistry — sama persis dengan server.ts kamu
const tools: Tool[] = [
  {
    type: "function",
    function: {
      name: "getKategori",
      description:
        "Gunakan alat ini ketika user meminta untuk cek data kategori",
      parameters: {
        type: "object",
        properties: {
          search: {
            type: "string",
            description:
              "Digunakan untuk mencari data berdasarkan nama kategori",
          },
          page: {
            type: "number",
            description:
              "Digunakan untuk menentukan halaman mana yang ingin di lihat (default:1)",
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "getPertanyaan",
      description:
        "Gunakan alat ini ketika user meminta untuk cek data pertanyaan",
      parameters: {
        type: "object",
        properties: {
          search: {
            type: "string",
            description: "Digunakan untuk mencari data berdasarkan pertanyaan",
          },
          page: {
            type: "number",
            description:
              "Digunakan untuk menentukan halaman mana yang ingin di lihat (default:1)",
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "getPeriode",
      description:
        "Gunakan alat ini ketika user meminta untuk cek data periode",
      parameters: {
        type: "object",
        properties: {
          search: {
            type: "string",
            description: "Digunakan untuk mencari data berdasarkan periode",
          },
          page: {
            type: "number",
            description:
              "Digunakan untuk menentukan halaman mana yang ingin di lihat (default:1)",
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "getPublicSurvey",
      description: "Gunakan alat ini ketika user meminta untuk cek data survey",
      parameters: {
        type: "object",
        properties: {
          search: {
            type: "string",
            description: "Digunakan untuk mencari data berdasarkan survey",
          },
          page: {
            type: "number",
            description:
              "Digunakan untuk menentukan halaman mana yang ingin dilihat (default:1)",
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "getResponden",
      description:
        "Gunakan alat ini ketika user meminta untuk cek data responden",
      parameters: {
        type: "object",
        properties: {
          search: {
            type: "string",
            description: "Digunakan untuk mencari data berdasarkan responden",
          },
          page: {
            type: "number",
            description:
              "Digunakan untuk menentukan halaman mana yang ingin di lihat (default:1)",
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "getPenilaian",
      description:
        "Gunakan alat ini ketika user meminta untuk cek data penilaian",
      parameters: {
        type: "object",
        properties: {
          search: {
            type: "string",
            description: "Digunakan untuk mencari data berdasarkan penilaian",
          },
          page: {
            type: "number",
            description:
              "Digunakan untuk menentukan halaman mana yang ingin di lihat (default:1)",
          },
        },
        required: [],
      },
    },
  },
  // ========================== POST =================================
  // post kategori
  {
    type: "function",
    function: {
      name: "postKategori",
      description: "Gunakan alat ini untuk menambah kategori baru.",
      parameters: {
        type: "object",
        properties: {
          ktg_nama: {
            type: "string",
            description: "Nama dari kategori",
          },
        },
        required: ["ktg_nama"],
      },
    },
  },
  // Post pertanyaan
  {
    type: "function",
    function: {
      name: "postPertanyaan",
      description:
        "Gunakan alat ini untuk menambah pertanyaan baru. Membutuhkan ktg_id (ID kategori) dan prtn_isi (isi pertanyaan). Jika belum tahu ID kategorinya, cari dulu menggunakan getKategori.",
      parameters: {
        type: "object",
        properties: {
          ktg_id: {
            type: "number",
            description: "ID dari kategori pertanyaan",
          },
          prtn_isi: {
            type: "string",
            description: "Teks pertanyaan yang ingin ditambahkan",
          },
        },
        required: ["ktg_id", "prtn_isi"],
      },
    },
  },
  // Post Periode
  {
    type: "function",
    function: {
      name: "postPeriode",
      description: "Gunakan alat ini untuk menambah periode survei baru.",
      parameters: {
        type: "object",
        properties: {
          ktg_id: {
            type: "number",
            description: "ID dari kategori periode",
          },
          prd_tgl_mulai: {
            type: "string",
            description: "Tanggal mulai periode (format: YYYY-MM-DD)",
          },
          prd_tgl_selesai: {
            type: "string",
            description: "Tanggal selesai periode (format: YYYY-MM-DD)",
          },
          prd_status: {
            type: "number",
            description: "Status periode (0: tidak aktif, 1: aktif)",
          },
        },
        required: ["ktg_id", "prd_tgl_mulai", "prd_tgl_selesai", "prd_status"],
      },
    },
  },
  // Post Public Survey
  {
    type: "function",
    function: {
      name: "postPublicSurvey",
      description: "Gunakan alat ini untuk membuat survei publik baru.",
      parameters: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "Judul survei",
          },
          description: {
            type: "string",
            description: "Deskripsi survei",
          },
          period_id: {
            type: "number",
            description: "ID periode survei",
          },
          category_id: {
            type: "number",
            description: "ID kategori survei",
          },
          status: {
            type: "boolean",
            description: "Status survei (true: aktif, false: non-aktif)",
          },
        },
        required: [
          "title",
          "description",
          "period_id",
          "category_id",
          "status",
        ],
      },
    },
  },
];
const toolRegistry: Record<string, (args: any) => Promise<any>> = {
  getKategori: async (arg) => await getKategori(arg.search, arg.page),
  getPertanyaan: async (arg) => await getPertanyaan(arg.search, arg.page),
  getPeriode: async (arg) => await getPeriode(arg.search, arg.page),
  getPublicSurvey: async (arg) => await getPublicSurvey(arg.search, arg.page),
  getResponden: async (arg) => await getResponden(arg.search, arg.page),
  getPenilaian: async (arg) => await getPenilaian(arg.search, arg.page),
  postKategori: async (arg) => await postKategori(arg),
  postPertanyaan: async (arg) => await postPertanyaan(arg),
  postPeriode: async (arg) => await postPeriode(arg),
  postPublicSurvey: async (arg) => await postPublicSurvey(arg),
};

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const userInput = msg.text;

  if (!userInput) return;

  if (userInput === "/start") {
    delete userSessions[chatId];
    await bot.sendMessage(
      chatId,
      "Sesi baru dimulai! History percakapan telah direset. Ada yang bisa saya bantu?",
    );
    return;
  }

  // Kirim indikator "sedang mengetik"
  bot.sendChatAction(chatId, "typing");

  const messages = getSession(chatId);
  messages.push({ role: "user", content: userInput });

  try {
    // Agent loop — sama dengan server.ts
    let isFinished = false;

    while (!isFinished) {
      const response = await ollama.chat({
        model: "qwen_3.5:latest ",
        messages,
        tools,
      });

      messages.push(response.message);

      if (
        response.message.tool_calls &&
        response.message.tool_calls.length > 0
      ) {
        for (const call of response.message.tool_calls) {
          const functionName = call.function.name;
          const arg = call.function.arguments;

          // Kirim status ke Telegram sebelum jalankan tool
          const statusMap: Record<string, string> = {
            getKategori: "🔍 Mencari data kategori...",
            getPertanyaan: "🔍 Mengambil daftar pertanyaan...",
            getPeriode: "🔍 Mengambil data periode...",
            getPublicSurvey: "🔍 Mengambil daftar survei...",
            postKategori: "✏️ Membuat kategori baru...",
            postPertanyaan: "✏️ Menambahkan pertanyaan...",
            postPeriode: "✏️ Membuat periode baru...",
            postPublicSurvey: "🚀 Membuat survei...",
          };

          const statusMsg =
            statusMap[functionName] || `⚙️ Menjalankan ${functionName}...`;
          await bot.sendMessage(chatId, statusMsg);

          // Jalankan tool seperti biasa
          if (toolRegistry[functionName]) {
            try {
              const result = await toolRegistry[functionName](arg);
              messages.push({ role: "tool", content: JSON.stringify(result) });
            } catch (err) {
              messages.push({ role: "tool", content: `Error: ${err}` });
            }
          }
        }
      } else {
        // Kirim jawaban ke Telegram
        await bot.sendMessage(chatId, response.message.content, {
          parse_mode: "Markdown",
        });
        isFinished = true;
      }
    }
  } catch (err) {
    await bot.sendMessage(chatId, "Terjadi kesalahan, coba lagi.");
    console.error(err);
  }
});

console.log("Telegram bot berjalan...");
