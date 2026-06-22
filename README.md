# Survey 360 - Project Documentation

## Latar Belakang

Sistem ini dibuat karena admin HR di sebuah yayasan kesulitan membuat survei baru setiap periode — harus mengisi ulang pertanyaan yang sama berulang kali di Google Form.

Survey 360 menyelesaikan ini dengan dua cara:
1. Pertanyaan dan survei bersifat **reusable** — tidak perlu dibuat ulang setiap periode, cukup diaktifkan kembali kapan pun dibutuhkan
2. Admin bisa membuat seluruh data survei cukup dengan **satu perintah teks ke AI agent via Telegram** — agent yang mengerjakan semua CRUD ke database secara otomatis

---

Proyek **Survey 360** adalah platform survei dan penilaian terintegrasi yang terdiri dari tiga komponen utama: Frontend (React & Vite), Backend (Laravel API), dan Model Context Protocol (MCP) Tool (TypeScript & Ollama/Telegram Bot).

---

## Daftar Isi
1. [Struktur Proyek](#struktur-proyek)
2. [Frontend (`frontend/`)](#1-frontend-frontend)
3. [Backend (`survey-app/`)](#2-backend-survey-app)
4. [MCP Tool (`mcp_tool/`)](#3-mcp-tool-mcp_tool)
5. [Cara Menjalankan Aplikasi](#cara-menjalankan-aplikasi)

---

## Struktur Proyek

```text
laravel-survey-360/
├── frontend/             # Aplikasi Single Page Application (SPA) React + Vite
├── survey-app/           # Backend API berbasis framework Laravel
├── mcp_tool/             # Agen kecerdasan buatan berbasis Model Context Protocol (MCP) & Telegram Bot
└── README.md             # Dokumentasi utama proyek
```

---

## 1. Frontend (`frontend/`)

Aplikasi Frontend dibangun menggunakan **React** dan **Vite** dengan bahasa pemrograman **TypeScript**. Desain antarmuka menggunakan **Tailwind CSS** dengan template dasar **TailAdmin**.

### Struktur Folder Utama
- `src/components/`: Komponen UI modular (Card, Chart, Table, Sidebar, dll.)
- `src/pages/`: Halaman-halaman utama dashboard dan survei
- `src/context/`: State management global React Context
- `src/services/`: Modul komunikasi API menggunakan **Axios**
- `src/layout/`: Komponen tata letak (layout dashboard admin & publik)

### Fitur & Dependensi Utama
- **Vite** & **TypeScript**: Build tool cepat dan pengetikan statis yang aman
- **Tailwind CSS**: Desain UI yang responsif dan modern
- **ApexCharts** & **React ApexCharts**: Visualisasi grafik hasil survei
- **React Router**: Navigasi halaman dashboard dan survei publik
- **SweetAlert2**: Alert interaktif yang elegan untuk konfirmasi aksi

---

## 2. Backend (`survey-app/`)

Backend berfungsi sebagai API server penyedia data survei yang dibuat menggunakan framework **Laravel**.

### Endpoint API Utama (`routes/api.php`)

**Autentikasi & Pengguna:**
- `GET /api/user` - Mengambil daftar user
- `POST /api/register` - Pendaftaran pengguna baru
- `POST /api/login` - Login pengguna
- `POST /api/logout` - Logout pengguna (Protected Sanctum)
- `GET /api/user/current` - Mengambil informasi profil login (Protected Sanctum)

**Survei Publik:**
- `GET /api/survey/{slug}` - Mengambil template survei berdasarkan slug untuk diisi responden
- `POST /api/penilaian` - Mengirim/menyimpan jawaban survei dari responden

**Manajemen Data & Master (Protected Sanctum):**
- `Resource /api/periode` - Kelola periode survei (Aktif/Nonaktif)
- `Resource /api/pertanyaan` - Kelola butir pertanyaan survei
- `Resource /api/responden` - Kelola data responden/peserta survei
- `Resource /api/kategori` - Kelola kategori pertanyaan
- `POST /api/survey` - Membuat link/slug survei baru
- `GET /api/survey` - Melihat daftar link survei yang telah dibuat
- `PUT /api/survey/{id}` - Mengubah status atau data link survei
- `DELETE /api/survey/{id}` - Menghapus link survei

---

## 3. MCP Tool (`mcp_tool/`)

**MCP (Model Context Protocol) Tool** adalah server agen kecerdasan buatan (AI Agent) berbasis TypeScript. Alat ini memungkinkan model AI lokal (Ollama + Qwen3) dan bot Telegram berinteraksi langsung dengan database survei melalui Backend API — tanpa admin perlu membuka dashboard sama sekali.

### Contoh Penggunaan Agent

```
User: "Buat kategori baru namanya Kualitas Layanan, 
       lalu tambahkan 2 pertanyaan di dalamnya"

Agent: Memanggil postKategori → dapat ID baru
       Memanggil postPertanyaan (x2) dengan kategori_id tersebut
       Konfirmasi ke user: "Kategori dan 2 pertanyaan berhasil dibuat"
```

```
User: "Aktifkan periode semester ganjil 2025 
       dan buatkan link surveinya"

Agent: Memanggil postPeriode → memanggil POST /api/survey
       Mengirim link survei langsung ke chat Telegram
```

### Fitur Utama
- **Integrasi Ollama + Qwen3**: Menggunakan model bahasa lokal untuk memproses perintah natural language
- **Telegram Bot**: Admin cukup kirim perintah teks, agent yang eksekusi ke database
- **Tool Calling**: Setiap fungsi API dibungkus sebagai tool yang bisa dipanggil agent secara otomatis berdasarkan konteks perintah

### Fungsi/Alat Agentik (Tools)

| Tool | Method | Fungsi |
|------|--------|--------|
| `getKategori` | GET | Membaca daftar kategori survei |
| `postKategori` | POST | Membuat kategori baru |
| `getPertanyaan` | GET | Membaca daftar pertanyaan |
| `postPertanyaan` | POST | Membuat pertanyaan baru |
| `getPeriode` | GET | Membaca periode aktif |
| `postPeriode` | POST | Membuat periode baru |
| `getResponden` | GET | Membaca data responden |
| `getPenilaian` | GET | Membaca hasil survei |

### Kenapa Model Lokal?

Agent ini sengaja dibangun di atas model lokal (Ollama + Qwen3) bukan API berbayar, sehingga:
- Tidak ada biaya per token
- Data tidak keluar dari server lokal
- Bisa jalan tanpa koneksi internet ke provider eksternal

---

## Cara Menjalankan Aplikasi

### 1. Menjalankan Backend (`survey-app`)
```bash
cd survey-app
composer install
cp .env.example .env
# Konfigurasi database di .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### 2. Menjalankan Frontend (`frontend`)
```bash
cd frontend
npm install
npm run dev
```

### 3. Menjalankan MCP Tool / AI Agent (`mcp_tool`)
```bash
cd mcp_tool
npm install
# Konfigurasi token Telegram & endpoint backend di .env
npm start
```

> Pastikan Ollama sudah berjalan di background dengan model Qwen3 terinstall:
> ```bash
> ollama pull qwen3
> ollama serve
> ```

---

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4 |
| Backend | Laravel 8, PHP, MySQL, Laravel Sanctum |
| AI Agent | TypeScript, Ollama, Qwen3, MCP, Telegram Bot API |
