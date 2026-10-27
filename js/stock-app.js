const { createApp } = Vue;

const app = createApp({
  data() {
    const rawStok =
      typeof dataBahanAjar !== "undefined" && dataBahanAjar.stok
        ? dataBahanAjar.stok
        : [];

    const sanitizedStok = rawStok.map((item) => ({
      sampul: item.sampul || "img/default.jpg",
      kode: item.kode || "-",
      judul: item.judul || "-",
      kategori: item.kategori || "MK Wajib",
      upbjj: item.upbjj || "Jakarta",
      lokasiRak: item.lokasiRak || "R1-A1",
      edisi: item.edisi || 1,
      qty: Number(item.qty) || 0,
      safety: Number(item.safety) || 10,
      harga: Number(item.harga) || 50000,
      catatanHTML: item.catatanHTML || "-",
    }));

    const upbjjList =
      typeof dataBahanAjar !== "undefined" && dataBahanAjar.upbjjList
        ? dataBahanAjar.upbjjList
        : ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"];

    const kategoriList =
      typeof dataBahanAjar !== "undefined" && dataBahanAjar.kategoriList
        ? dataBahanAjar.kategoriList
        : ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"];

    return {
      stok: sanitizedStok,
      upbjjOptions: upbjjList,
      kategoriOptions: kategoriList,
      filter: {
        upbjj: "",
        kategori: "",
        isSafety: false, // Menggantikan reorder & kosong terpisah
      },
      sortBy: "",
    };
  },
  watch: {
    "filter.upbjj"(newVal) {
      this.filter.kategori = "";
      if (newVal) {
        this.kategoriOptions =
          typeof dataBahanAjar !== "undefined" && dataBahanAjar.kategoriList
            ? dataBahanAjar.kategoriList
            : ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"];
      } else {
        this.kategoriOptions = [];
      }
    },
  },
  computed: {
    filteredData() {
      let result = [...this.stok];

      if (this.filter.upbjj) {
        result = result.filter(
          (i) =>
            (i.upbjj || "").toLowerCase() === this.filter.upbjj.toLowerCase(),
        );
      }

      if (this.filter.kategori) {
        result = result.filter(
          (i) =>
            (i.kategori || "").toLowerCase() ===
            this.filter.kategori.toLowerCase(),
        );
      }

      // Filter gabungan: Menampilkan stok menipis (qty <= safety) dan stok kosong (qty = 0)
      if (this.filter.isSafety) {
        result = result.filter((i) => i.qty <= i.safety || i.qty === 0);
      }

      if (this.sortBy === "judul") {
        result.sort((a, b) => a.judul.localeCompare(b.judul));
      } else if (this.sortBy === "stok") {
        result.sort((a, b) => a.qty - b.qty);
      } else if (this.sortBy === "harga") {
        result.sort((a, b) => a.harga - b.harga);
      }

      return result;
    },
  },
  methods: {
    resetFilter() {
      this.filter = { upbjj: "", kategori: "", isSafety: false };
      this.sortBy = "";
    },
    renderStatus(qty, safety) {
      const q = Number(qty) || 0;
      const s = Number(safety) || 0;
      if (q === 0)
        return `<span style="color:red; font-weight:bold;">Kosong</span>`;
      if (q <= s)
        return `<span style="color:orange; font-weight:bold;">Menipis</span>`;
      return `<span style="color:green; font-weight:bold;">Aman</span>`;
    },
    async openAddModal() {
      const { value: form } = await Swal.fire({
        title: "Tambah Data Bahan Ajar",
        html: `
          <input id="swal-kode" class="swal2-input" placeholder="Kode Barang">
          <input id="swal-judul" class="swal2-input" placeholder="Judul">
          <input id="swal-upbjj" class="swal2-input" placeholder="UPBJJ (ex: Jakarta)">
          <input id="swal-kategori" class="swal2-input" placeholder="Kategori (ex: MK Wajib)">
          <input id="swal-rak" class="swal2-input" placeholder="Lokasi Rak (ex: R1-A3)">
          <input id="swal-qty" class="swal2-input" type="number" placeholder="Stok (Qty)">
          <input id="swal-safety" class="swal2-input" type="number" placeholder="Safety Stock">
          <input id="swal-harga" class="swal2-input" type="number" placeholder="Harga">
          <input id="swal-catatan" class="swal2-input" placeholder="Catatan HTML (ex: <em>Stok baru</em>)">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Simpan",
        cancelButtonText: "Batal",
        preConfirm: () => {
          return {
            kode: document.getElementById("swal-kode").value.trim(),
            judul: document.getElementById("swal-judul").value.trim(),
            upbjj:
              document.getElementById("swal-upbjj").value.trim() || "Jakarta",
            kategori:
              document.getElementById("swal-kategori").value.trim() ||
              "MK Wajib",
            lokasiRak:
              document.getElementById("swal-rak").value.trim() || "R1-A1",
            qty: parseInt(document.getElementById("swal-qty").value) || 0,
            safety:
              parseInt(document.getElementById("swal-safety").value) || 10,
            harga:
              parseInt(document.getElementById("swal-harga").value) || 50000,
            catatanHTML:
              document.getElementById("swal-catatan").value.trim() || "-",
            edisi: 1,
            sampul: "img/default.jpg",
          };
        },
      });
      if (form) {
        if (!form.kode || !form.judul) {
          Swal.fire("Gagal", "Kode dan Judul wajib diisi!", "error");
          return;
        }

        const isDuplicate = this.stok.some(
          (i) => i.kode.toLowerCase() === form.kode.toLowerCase(),
        );

        if (isDuplicate) {
          Swal.fire("Gagal", "Kode sudah terdaftar!", "error");
          return;
        }

        this.stok.push(form);
        Swal.fire("Berhasil", "Data berhasil ditambahkan", "success");
      }
    },
    async editItem(item) {
      const { value: form } = await Swal.fire({
        title: "Edit Data Bahan Ajar",
        html: `
          <input id="swal-edit-judul" class="swal2-input" value="${item.judul}" placeholder="Judul">
          <input id="swal-edit-qty" class="swal2-input" type="number" value="${item.qty}" placeholder="Stok (Qty)">
          <input id="swal-edit-safety" class="swal2-input" type="number" value="${item.safety}" placeholder="Safety Stock">
          <input id="swal-edit-harga" class="swal2-input" type="number" value="${item.harga}" placeholder="Harga">
        `,
        showCancelButton: true,
        confirmButtonText: "Simpan",
        cancelButtonText: "Batal",
        preConfirm: () => {
          return {
            judul: document.getElementById("swal-edit-judul").value.trim(),
            qty: parseInt(document.getElementById("swal-edit-qty").value) || 0,
            safety:
              parseInt(document.getElementById("swal-edit-safety").value) || 0,
            harga:
              parseInt(document.getElementById("swal-edit-harga").value) || 0,
          };
        },
      });
      if (form) {
        Object.assign(item, form);
        Swal.fire("Berhasil", "Data berhasil diperbarui", "success");
      }
    },
    deleteItem(item) {
      Swal.fire({
        title: "Hapus Data?",
        text: `Data ${item.judul} akan dihapus!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.stok = this.stok.filter((i) => i.kode !== item.kode);
          Swal.fire("Terhapus!", "Data telah dihapus.", "success");
        }
      });
    },
  },
});

app.mount("#stockApp");
