// Halaman login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const user = dataPengguna.find(
      (u) => u.email === email && u.password === password,
    );

    if (user) {
      localStorage.setItem("namaUser", user.nama);
      Swal.fire({
        title: "Login Berhasil!",
        text: `Selamat datang, ${user.nama}!`,
        icon: "success",
        confirmButtonText: "Lanjutkan",
      }).then(() => (window.location.href = "dashboard.html"));
    } else {
      Swal.fire({
        title: "Login Gagal!",
        text: "Email atau password salah. Silakan coba lagi.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  });
}

// Pop up untuk lupa password dan buat akun baru
const forgetLink = document.getElementById("forgetLink");
const registerLink = document.getElementById("registerLink");
if (forgetLink) {
  forgetLink.addEventListener("click", () => {
    Swal.fire({
      title: "Lupa Password?",
      text: "Silakan hubungi admin UT untuk reset password.",
      icon: "info",
    });
  });
}
if (registerLink) {
  registerLink.addEventListener("click", () => {
    Swal.fire({
      title: "Buat Akun Baru",
      text: "Kunjungi laman MyUT untuk membuat akun baru.",
      icon: "question",
    });
  });
}

// Halaman dashboard
const greeting = document.getElementById("greeting");
if (greeting) {
  const namaUser = localStorage.getItem("namaUser");
  const hour = new Date().getHours();
  let timeOfDay;
  if (hour < 11) {
    timeOfDay = "Selamat Pagi";
  } else if (hour < 15) {
    timeOfDay = "Selamat Siang";
  } else if (hour < 19) {
    timeOfDay = "Selamat Sore";
  } else {
    timeOfDay = "Selamat Malam";
  }

  greeting.innerHTML = namaUser
    ? `<br><br><h1>${timeOfDay}, ${namaUser}</h1>
        <br>
        <p>Selamat datang di Dashboard SITTA UT</p>`
    : `<h1>${timeOfDay}!</h1>
        <p>Selamat datang di Dashboard SITTA UT</p>`;
}

// konfirmasi logout
document.addEventListener("click", function (e) {
  const logoutBtn = e.target.closest("#logoutBtn");
  if (logoutBtn) {
    e.preventDefault();
    Swal.fire({
      title: "Yakin ingin logout?",
      text: "Anda akan keluar dari sistem.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("namaUser");
        Swal.fire({
          title: "Logout Berhasil",
          text: "Anda telah keluar dari sistem.",
          icon: "info",
          confirmButtonText: "OK",
        }).then(() => (window.location.href = "login.html"));
      }
    });
  }
});

// Pop-up Fitur Belum Tersedia
document.addEventListener("click", function (e) {
  const target = e.target.closest(".not-available");
  if (target) {
    e.preventDefault();

    Swal.fire({
      title: "Fitur Belum Tersedia",
      text: "Mohon maaf, fitur ini sedang dalam tahap pengembangan.",
      icon: "info",
      confirmButtonText: "Kembali",
      confirmButtonColor: "#1b6dc1",
    });
  }
});
