function generateRandomUnit() {
  const minLength = 5;
  const maxLength = 7;
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789@#$&*";
  let unit = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    unit += characters.charAt(randomIndex);
  }

  return unit;
}

let unit = generateRandomUnit();

window.addEventListener('beforeunload', function (e) {
  const confirmationMessage = "Perubahan yang Anda buat mungkin tidak disimpan.";

  e.returnValue = confirmationMessage;
  return confirmationMessage;
});

while (true) {
  let enteredUnit = prompt("Masukkan kode Verifikasi: " + unit);

  if (enteredUnit === null) {
    let confirmation = confirm("Eh Anjay! Anda menyegarkan halaman. Jangan nyepam nanti delay!\nSilahkan coba lagi.");
    if (confirmation) {
      unit = generateRandomUnit();
    } else {
      alert("Anda membatalkan Verifikasi. Silakan coba lagi.");
      unit = generateRandomUnit();
    }
  } else if (!enteredUnit.trim()) {
    alert("Njirr! Kolom belum diisi. Silakan coba lagi.");
    unit = generateRandomUnit();
  } else if (enteredUnit === unit) {
    alert("Wah! kode benar. Selamat datang!");
    break;
  } else {
    alert("Halah! kode salah. Silakan coba lagi.");
    unit = generateRandomUnit();
  }
}
alert("Jika server tidak ada respon kembali lagi 30 menit.")
