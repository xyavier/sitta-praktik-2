# SITTA UT - Sistem Informasi Tiras dan Transaksi Bahan Ajar Universitas Terbuka
> **Tugas Praktik 2 - STSI4209 Pemrograman Berbasis Web**  
> **Pengembangan Antarmuka Reaktif Menggunakan Framework Vue.js**

---

## 📌 Deskripsi Proyek

Proyek ini merupakan solusi untuk **Tugas Praktik 2 STSI4209 Pemrograman Berbasis Web**, yaitu membangun antarmuka web reaktif dan interaktif untuk **SITTA UT (Sistem Informasi Tiras dan Transaksi Bahan Ajar Universitas Terbuka)**. 

Aplikasi ini dikembangkan menggunakan **Vue.js (v3 CDN)** sebagai *JavaScript Framework* utama untuk mengolah data secara dinamis pada sisi klien tanpa memerlukan *database engine*, melainkan memanfaatkan berkas data simulasi (*dummy data*) `.js`.

---

## 🚀 Fitur Utama & Pemenuhan Spesifikasi Tugas

### 1. Halaman Stok Bahan Ajar (`stock.html` & `stock-app.js`)
* **Daftar Stok Bahan Ajar:** Menampilkan tabel informasi bahan ajar secara rinci meliputi: Kode, Judul, Kategori, UT-Daerah (UPBJJ), Lokasi Rak, Jumlah Stok ($qty$), Safety Stock ($safety$), Status, dan Catatan.
* **Indikator Status Stok Otomatis:**
  * 🟢 **Aman**: Ditampilkan jika $qty \ge safety$ (Teks/simbol hijau).
  * 🟠 **Menipis**: Ditampilkan jika $qty < safety$ dan $qty > 0$ (Teks/simbol oranye/warning).
  * 🔴 **Kosong**: Ditampilkan jika $qty = 0$ (Teks/simbol merah/danger).
* **Filter & Sort Dinamis:**
  * **Dependent Filter:** Pilihan filter 'Kategori Mata Kuliah' bersifat dependen dan baru muncul/menyesuaikan setelah 'UT-Daerah' dipilih.
  * **Re-order Alert Filter:** Filter khusus untuk menampilkan stok yang bernilai $qty < safety$ atau $qty = 0$ guna memberikan pengingat pemesanan ulang bahan ajar.
  * **Sorting:** Mengurutkan daftar berdasarkan Judul, Stok ($qty$), dan Harga.
  * **Reset Filter:** Tombol sekali klik untuk mengembalikan seluruh kondisi filter ke keadaan semula.
* **Manajemen & Form Validasi Data Stok:**
  * Fitur penambahan data bahan ajar baru melalui formulir dengan validasi input sederhana.
  * Fitur pengeditan data stok dan pembaruan data secara reaktif.

### 2. Halaman Tracking Delivery Order (`tracking.html` & `tracking-app.js`)
* **Pelacakan Resi (Delivery Order):** Fitur pencarian dan visualisasi *timeline* status pengiriman paket bahan ajar secara terstruktur.
* **Penambahan Input Delivery Order (DO) Baru:**
  * **Nomor DO Otomatis:** Format penomoran otomatis berurutan (`DO2025-001`, `DO2025-002`, dst.).
  * **Input Pengguna:** Input manual NIM dan Nama Penerima.
  * **Pilihan Ekspedisi & Paket:** Pilihan ekspedisi (JNE Regular / JNE Express) serta pemilihan paket bahan ajar.
  * **Detail Paket & Perhitungan Otomatis:** Menampilkan rincian isi paket bahan ajar setelah memilih paket dari elemen `<select>` dan menghitung *Total Harga* secara otomatis.
  * **Tanggal Pengiriman:** Pengisian tanggal pengiriman secara manual maupun otomatis memanfaatkan *local time*.

### 3. Dashboard Interaktif & Autentikasi (`dashboard.html`, `login.html`, `script.js`)
* Halaman utama dengan ucapan selamat datang dinamis dan navigasi cepat menuju seluruh modul aplikasi.
* Simulasi autentikasi login dengan penyimpanan sesi berbasis `localStorage`.

---

## 🛠️ Penerapan Konsep & Indikator Capaian Vue.js

Aplikasi ini memenuhi 5 Indikator Capaian Utama Tugas Praktik 2:

| Indikator Capaian Vue.js | Penerapan Kode dalam Proyek |
| :--- | :--- |
| **1. Pengorganisasian Kode** | Pemisahan berkas yang rapi antara HTML, CSS, serta berkas JavaScript aplikasi (`stock-app.js`, `tracking-app.js`, `dataBahanAjar.js`). |
| **2. Display Data & Binding** | Menggunakan *mustaches* `{{ }}`, `v-text`, `v-bind` (atau `:`), dan `v-model` (*two-way data binding*) untuk mengolah form dan tampilan data secara reaktif. |
| **3. Conditionals Rendering** | Menggunakan directive `v-if`, `v-else-if`, `v-else`, dan `v-show` untuk menampilkan status stok (Aman/Menipis/Kosong), detail paket, dan pesan validasi. |
| **4. Computed & Methods** | **Computed Properties:** Digunakan pada proses *filtering*, *sorting*, *dependent options*, dan kalkulasi total harga.<br>**Methods:** Digunakan pada aksi klik tombol, *submit* form, edit data, dan reset filter. |
| **5. Watchers** | Menggunakan minimal 2 *Watcher* di Vue.js untuk memantau perubahan filter (seperti perubahan UT-Daerah untuk mengatur ulang kategori) dan memantau penomoran resi DO. |

---

## 📁 Struktur Direktori Proyek

```
sitta-praktik/
├── css/
│   └── style.css            # Berkas gaya utama aplikasi (CSS)
├── img/                     # Aset gambar sampul buku dan logo UT
│   ├── kepemimpinan.jpg
│   ├── manajemen_keuangan.jpg
│   ├── mikrobiologi.jpg
│   ├── paud_perkembangan.jpeg
│   ├── pengantar_komunikasi.jpg
│   ├── ut.png
│   └── ut.png.webp
├── js/
│   ├── data.js              # Dummy data akun pengguna & data awal tracking DO
│   ├── dataBahanAjar.js     # Dummy data stok bahan ajar Universitas Terbuka
│   ├── script.js            # Logika umum autentikasi & interaksi global
│   ├── stock-app.js         # Instansiasi & Logika reaktif Vue.js (stok.html)
│   └── tracking-app.js      # Instansiasi & Logika reaktif Vue.js (tracking.html)
├── dashboard.html           # Halaman menu navigasi utama
├── login.html               # Halaman simulasi masuk ke sistem SITTA
├── stock.html               # Halaman Manajemen Stok Bahan Ajar (Wajib)
└── tracking.html            # Halaman Tracking Delivery Order / DO (Wajib)
```

---

## 💻 Cara Menjalankan Aplikasi

 **Jalankan Aplikasi:**
   * **Menggunakan VS Code Live Server (Disarankan):** Klik kanan pada berkas `login.html` atau `dashboard.html`, lalu pilih **"Open with Live Server"**.
   * **Secara Langsung:** Klik dua kali berkas `login.html` untuk membukanya langsung melalui peramban web (*browser* Chrome/Edge/Firefox).

---

## 🔐 Kredensial Login Simulasi

Untuk menguji fitur login pada sistem, gunakan salah satu akun simulasi yang tersimpan di `js/data.js`:

* **Admin Pusat:**
  * **Email:** `admin@ut.ac.id`
  * **Password:** `admin123`
* **Petugas UPBJJ (Rina Wulandari):**
  * **Email:** `rina@ut.ac.id`
  * **Password:** `rina123`

---

## 📚 Referensi Studi Kasus

* Sufandi, U. U., Aprijani, D. A., & Pandiangan, P. (2021). *Evaluasi dan hasil review desain user interface prototype aplikasi mobile SITTA Universitas Terbuka*. JANAPATI, 10(3), 147-156.
* Sufandi, U. U. (2022). *Analisis Kebutuhan dan Dokumentasi Sistem Informasi Tiras dan Transaksi Bahan Ajar Universitas Terbuka*. JANAPATI, 11(2), 112-122.
