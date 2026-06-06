import { Ollama, Tool, Message } from "ollama";
import {
  getKategori,
  getPenilaian,
  getPeriode,
  getPertanyaan,
  // getProdi,
  getPublicSurvey,
  getResponden,
  postKategori,
  postPertanyaan,
  postPeriode,
  postPublicSurvey,
  // postProdi,
} from "./survey.js";
import { createInterface } from "node:readline";

const ollama = new Ollama();
const rl = createInterface({ input: process.stdin, output: process.stdout });

// Wrap readline ke Promise supaya bisa di-await
function prompt(question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

// Definisi tool
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

// Registrasi tool
const toolRegistry: Record<string, (args: any) => Promise<any>> = {
  getKategori: async (arg) => await getKategori(arg.search, arg.page),
  getPertanyaan: async (arg) => await getPertanyaan(arg.search, arg.page),
  getPeriode: async (arg) => await getPeriode(arg.search, arg.page),
  getPublicSurvey: async (arg) => await getPublicSurvey(arg.search, arg.page),
  getResponden: async (arg) => await getResponden(arg.search, arg.page),
  getPenilaian: async (arg) => await getPenilaian(arg.search, arg.page),
  postKategori: async (arg) => await postKategori(arg), // ✅ fix: ditambahkan
  postPertanyaan: async (arg) => await postPertanyaan(arg),
  postPeriode: async (arg) => await postPeriode(arg),
  postPublicSurvey: async (arg) => await postPublicSurvey(arg),
};

const messages: Message[] = [
  {
    role: "system",
    content: `
      Kamu adalah admin dari sistem informasi survei. Jawab dalam Bahasa Indonesia.

      Aturan Kerja:
      1. Untuk melihat data (kategori, pertanyaan, dll), gunakan tool 'get' yang sesuai.
      2. Untuk menambah pertanyaan (postPertanyaan), kamu wajib memiliki 'ktg_id'.
      3. Jika user memberikan NAMA kategori (bukan ID), kamu HARUS mencari ID tersebut terlebih dahulu menggunakan 'getKategori' dengan parameter search yang sesuai.
      4. Setelah mendapatkan ID yang benar dari hasil tool, barulah panggil 'postPertanyaan'.
      `,
  },
];

async function main() {
  console.log("Asisten survei siap!!!.\n");

  while (true) {
    const userInput = await prompt("Kamu: ");

    if (userInput.toLowerCase() === "exit") {
      rl.close();
      break;
    }

    messages.push({ role: "user", content: userInput });

    // Loop interaksi
    let modalIsFinished = false;

    while (!modalIsFinished) {
      const response = await ollama.chat({
        model: "qwen_3.5:latest",
        messages,
        tools,
      });

      messages.push(response.message);

      // if model memanggil tool
      if (
        response.message.tool_calls &&
        response.message.tool_calls.length > 0
      ) {
        console.log(
          `Model memanggil ${response.message.tool_calls.length} tool...`,
        );

        for (const call of response.message.tool_calls) {
          const functionName = call.function.name;
          const arg = call.function.arguments;

          if (toolRegistry[functionName]) {
            console.log(`-> Menjalankan tool: ${functionName}`);
            try {
              const result = await toolRegistry[functionName](arg);
              messages.push({
                role: "tool",
                content: JSON.stringify(result),
              });
            } catch (err) {
              messages.push({ role: "tool", content: `Error: ${err}` });
            }
          } else {
            // ✅ fix: handle tool tidak dikenal agar tidak infinite loop
            console.log(`-> Tool tidak dikenal: ${functionName}`);
            messages.push({
              role: "tool",
              content: `Error: tool '${functionName}' tidak ditemukan.`,
            });
          }
        }
      } else {
        console.log("\n=== ASISTEN ===");
        console.log(response.message.content);
        modalIsFinished = true;
      }
    }
  }
}

main().catch(console.error);
