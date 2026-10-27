const { createApp } = Vue;

const app = createApp({
  data() {
    const rawTracking = Object.assign(
      {},
      typeof dataTracking !== "undefined" ? dataTracking : {},
      typeof dataBahanAjar !== "undefined" && dataBahanAjar.tracking
        ? dataBahanAjar.tracking
        : {},
    );

    const autoGenTracking = {};
    Object.keys(rawTracking).forEach((key) => {
      if (key.toUpperCase().startsWith("DO")) {
        autoGenTracking[key] = rawTracking[key];
      }
    });

    return {
      searchDO: "",
      searchDOKey: "",
      searchResult: null,
      trackingList: autoGenTracking,
      paketList:
        typeof dataBahanAjar !== "undefined" && dataBahanAjar.paket
          ? dataBahanAjar.paket
          : [],
      ekspedisiList:
        typeof dataBahanAjar !== "undefined" && dataBahanAjar.pengirimanList
          ? dataBahanAjar.pengirimanList
          : [
              { kode: "REG", nama: "Reguler (3-5 hari)" },
              { kode: "EXP", nama: "Ekspres (1-2 hari)" },
            ],

      newDO: {
        nomor: "",
        nim: "",
        nama: "",
        ekspedisi: "",
        paketKode: "",
        tanggalKirim: new Date().toISOString().split("T")[0],
      },
    };
  },
  mounted() {
    this.generateNomorDO();
  },
  watch: {
    searchDO(newVal, oldVal) {
      if (
        newVal !== oldVal &&
        this.searchResult &&
        newVal !== this.searchDOKey
      ) {
        this.searchResult = null;
      }
    },
  },
  computed: {
    selectedPaket() {
      if (!this.newDO.paketKode) return null;
      return this.paketList.find((p) => p.kode === this.newDO.paketKode);
    },
    selectedPaketDetail() {
      if (!this.selectedPaket) return "";

      const stokList =
        typeof dataBahanAjar !== "undefined" && dataBahanAjar.stok
          ? dataBahanAjar.stok
          : [];

      if (this.selectedPaket.isi && Array.isArray(this.selectedPaket.isi)) {
        const detailDaftar = this.selectedPaket.isi.map((kode) => {
          const itemStok = stokList.find((s) => s.kode === kode);
          return itemStok ? `${kode} (${itemStok.judul})` : kode;
        });
        return detailDaftar.join(", ");
      }

      return this.selectedPaket.detail || "-";
    },
    formattedHarga() {
      const harga = this.selectedPaket ? this.selectedPaket.harga : 0;
      return `Rp ${harga.toLocaleString("id-ID")}`;
    },
  },
  methods: {
    formatPaketLabel(p) {
      if (!p) return "";
      const isiStr = Array.isArray(p.isi)
        ? p.isi.join(", ")
        : p.detail || p.isi || "";
      return isiStr
        ? `${p.kode} - ${p.nama} (${isiStr})`
        : `${p.kode} - ${p.nama}`;
    },
    formatTotal(val) {
      if (typeof val === "number") {
        return `Rp ${val.toLocaleString("id-ID")}`;
      }
      return val || "Rp 0";
    },
    generateNomorDO() {
      const year = new Date().getFullYear();
      const count = Object.keys(this.trackingList).length + 1;
      const seq = String(count).padStart(4, "0");
      this.newDO.nomor = `DO${year}-${seq}`;
    },
    tambahDO() {
      this.trackingList[this.newDO.nomor] = {
        nomorDO: this.newDO.nomor,
        nama: this.newDO.nama,
        nim: this.newDO.nim,
        status: "Diproses",
        ekspedisi: this.newDO.ekspedisi,
        tanggalKirim: this.newDO.tanggalKirim,
        paket: this.newDO.paketKode,
        total: this.formattedHarga,
        perjalanan: [
          {
            waktu: `${this.newDO.tanggalKirim} 08:00:00`,
            keterangan:
              "DO berhasil dibuat dan menunggu diserahkan ke ekspedisi.",
          },
        ],
      };

      Swal.fire(
        "Berhasil",
        `Pesanan ${this.newDO.nomor} berhasil diproses!`,
        "success",
      );

      this.newDO.nim = "";
      this.newDO.nama = "";
      this.newDO.ekspedisi = "";
      this.newDO.paketKode = "";
      this.generateNomorDO();
    },
    submitDO() {
      const query = this.searchDO.trim();
      if (!query)
        return Swal.fire({
          icon: "warning",
          title: "Peringatan",
          text: "Masukkan Nomor DO!",
        });

      if (this.trackingList[query]) {
        this.searchDOKey = query;
        this.searchResult = this.trackingList[query];
      } else {
        this.searchResult = null;
        Swal.fire({
          icon: "error",
          title: "Tidak Ditemukan",
          text: "DO tidak ditemukan!",
        });
      }
    },
    lacakLangsung(nomor) {
      this.searchDOKey = nomor;
      this.searchDO = nomor;
      if (this.trackingList[nomor]) {
        this.searchResult = this.trackingList[nomor];
      }
      this.$nextTick(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    },
  },
});

app.mount("#trackingApp");
