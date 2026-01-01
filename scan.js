const API_URL = "https://script.google.com/macros/s/AKfycbzeBUx9hPrxB5paVrZppnxwFx3_w0vl_-US7MBPZPbZq07NT_F7di6WHV9ss-hqi10G/exec";

const petugas = localStorage.getItem("petugas");
const mode = localStorage.getItem("modeScan");

if(!petugas){
  location.href = "index.html";
}

document.getElementById("info").innerText =
  "Petugas: " + petugas + " | Mode: " + mode;

const barcode = document.getElementById("barcode");
const qty = document.getElementById("qty");
const nama = document.getElementById("nama");

// SCAN DENGAN SCANNER USB (ENTER)
barcode.addEventListener("keydown", e => {
  if(e.key === "Enter"){
    e.preventDefault();
    cariProduk();
  }
});

function cariProduk(){
  if(!barcode.value) return;

  fetch(API_URL,{
    method:"POST",
    body: JSON.stringify({
      action:"getProduk",
      barcode: barcode.value.trim()
    })
  })
  .then(r=>r.json())
  .then(d=>{
    nama.innerText = d.nama;
    qty.focus();
  });
}

function simpan(){
  if(!qty.value){ alert("Qty wajib diisi"); return; }

  fetch(API_URL,{
    method:"POST",
    body: JSON.stringify({
      action:"simpanOpname",
      barcode: barcode.value,
      nama: nama.innerText,
      qty: qty.value,
      petugas: petugas
    })
  })
  .then(r=>r.json())
  .then(()=>{
    barcode.value="";
    qty.value="";
    nama.innerText="";
    barcode.focus();
  });
}

function ganti(){
  localStorage.clear();
  location.href = "index.html";
}
