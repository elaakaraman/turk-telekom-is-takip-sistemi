// =====================================
// TÜRK TELEKOM İŞ TAKİP SİSTEMİ
// =====================================

// Excel verileri burada tutulacak
let projeVerileri = [];
let binaVerileri = [];

// =====================================
// PROJE EXCELİNİ YÜKLE
// =====================================

document.getElementById("projeExcel").addEventListener("change", function (e) {

    const dosya = e.target.files[0];

    if (!dosya) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        const data = new Uint8Array(event.target.result);

        const workbook = XLSX.read(data, {
            type: "array"
        });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        projeVerileri = XLSX.utils.sheet_to_json(sheet);

        alert("Proje Exceli başarıyla yüklendi.");

    };

    reader.readAsArrayBuffer(dosya);

});

// =====================================
// BİNA EXCELİNİ YÜKLE
// =====================================

document.getElementById("binaExcel").addEventListener("change", function (e) {

    const dosya = e.target.files[0];

    if (!dosya) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        const data = new Uint8Array(event.target.result);

        const workbook = XLSX.read(data, {
            type: "array"
        });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        binaVerileri = XLSX.utils.sheet_to_json(sheet);

        alert("Bina Exceli başarıyla yüklendi.");

    };

    reader.readAsArrayBuffer(dosya);

});
