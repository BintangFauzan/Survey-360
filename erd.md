# Entity Relationship Diagram (ERD)

Berikut adalah deskripsi tabel dan hubungan antar-tabel berdasarkan struktur database Anda:

1.  **`users`**
    *   Menyimpan data pengguna (santri).
    *   Relasi: Satu `User` bisa menjadi `Responden` berkali-kali dalam periode yang berbeda (One-to-Many).

2.  **`periodes`**
    *   Menyimpan data periode survei (e.g., "Semester Ganjil 2025").
    *   Relasi: Satu `Periode` memiliki banyak `Responden` (One-to-Many).

3.  **`kategoris`**
    *   Menyimpan kategori dari pertanyaan (e.g., "Kualitas Pengajaran", "Fasilitas").
    *   Relasi: Satu `Kategori` memiliki banyak `Pertanyaan` (One-to-Many).

4.  **`pertanyaans`**
    *   Menyimpan daftar semua pertanyaan survei.
    *   Relasi:
        *   Setiap `Pertanyaan` termasuk dalam satu `Kategori` (Many-to-One).
        *   Setiap `Pertanyaan` bisa muncul di banyak `PenilaianDetail` (One-to-Many).

5.  **`respondens`**
    *   Tabel ini menandakan seorang `User` yang berpartisipasi dalam sebuah `Periode` survei.
    *   Relasi:
        *   Setiap `Responden` adalah seorang `User` (Many-to-One).
        *   Setiap `Responden` terikat pada satu `Periode` (Many-to-One).
        *   Satu `Responden` melakukan satu `Penilaian` (One-to-One).

6.  **`penilaians`**
    *   Tabel utama untuk sebuah sesi penilaian yang dilakukan oleh `Responden`.
    *   Relasi:
        *   Setiap `Penilaian` dilakukan oleh satu `Responden` (Many-to-One, atau One-to-One jika unik).
        *   Satu `Penilaian` memiliki banyak `PenilaianDetail` (jawaban) (One-to-Many).

7.  **`penilaian_details`**
    *   Tabel ini menyimpan jawaban spesifik untuk setiap pertanyaan dalam sebuah sesi `Penilaian`.
    *   Relasi:
        *   Setiap `PenilaianDetail` adalah bagian dari satu `Penilaian` (Many-to-One).
        *   Setiap `PenilaianDetail` merujuk pada satu `Pertanyaan` (Many-to-One).

### Visualisasi ERD (Format Teks)

```
+-------------+       +----------------+       +--------------------+
|   users     |       |   respondens   |       |     penilaians     |
+-------------+       +----------------+       +--------------------+
| id (PK)     |       | id (PK)        |-------| id (PK)            |
| name        |       | nama_responden |       | responden_id (FK)  |
| email       |       | periode_id (FK)|       | tanggal_penilaian  |
| ...         |       +----------------+       +--------------------+
+-------------+              |                        |
                             |                        |
+-------------+              |                        |
|  periodes   |              |                        |
+-------------+              |                        |
| id (PK)     |<--------------+                        |
| nama_periode|                                       |
| status      |                                       |
+-------------+                                       |
                                                      |
+---------------------+                             +-----------------------+
|     pertanyaans     |                             |   penilaian_details   |
+---------------------+                             +-----------------------+
| id (PK)             |<----------------------------| id (PK)               |
| kategori_id (FK)    |                             | penilaian_id (FK)     |
| pertanyaan          |                             | pertanyaan_id (FK)    |
+---------------------+                             | jawaban (1-5)         |
        |                                           +-----------------------+
        |
+-------------+
|  kategoris  |
+-------------+
| id (PK)     |
| nama_kategori|
+-------------+
```

**Keterangan:**

*   `(PK)`: Primary Key
*   `(FK)`: Foreign Key
*   `-------`: Menandakan adanya relasi antar tabel.
