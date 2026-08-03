// =========================
// VERİLER
// =========================

let projeVerileri = [];
let binaVerileri = [];

// =========================
// PROJE EXCELİNİ OKU
// =========================

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

// =========================
// BİNA EXCELİNİ OKU
// =========================

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
// =========================
// ARAMA
// =========================

function ara() {

    const aranan = document.getElementById("arama").value.trim();

    const sonucAlani = document.getElementById("sonucAlani");

    if (aranan === "") {

        sonucAlani.innerHTML = "<h3>Lütfen Bina ID veya Çizim ID giriniz.</h3>";

        return;

    }

    // Önce Bina Excelinde ara
    const binaKaydi = binaVerileri.find(function(veri){

        return String(veri.ES_BINA_KODU) === aranan ||
               String(veri.CIZIM_ID) === aranan;

    });

    if (!binaKaydi){

        sonucAlani.innerHTML = "<h3>Kayıt bulunamadı.</h3>";

        return;

    }

    // Proje Excelinde aynı Çizim ID'yi bul
    const projeKaydi = projeVerileri.find(function(veri){

        return String(veri.CIZIM_ID) === String(binaKaydi.CIZIM_ID);

    });

    sonucAlani.innerHTML = `
    <div class="proje-karti">

        <h2>Bina Bilgileri</h2>

        <p><strong>Bina ID:</strong> ${binaKaydi.ES_BINA_KODU}</p>

        <p><strong>Çizim ID:</strong> ${binaKaydi.CIZIM_ID}</p>

        <p><strong>Santral:</strong> ${binaKaydi.SANTRAL_ADI}</p>

        <p><strong>Çizim Adı:</strong> ${binaKaydi.CIZIM_ADI}</p>

        <p><strong>BBK:</strong> ${binaKaydi.BBK}</p>

        <hr>

        <h2>Proje Bilgileri</h2>

        <p><strong>Proje Yılı:</strong> ${projeKaydi ? projeKaydi.PROJE_YILI : "-"}</p>

        <p><strong>Proje Özelliği:</strong> ${projeKaydi ? projeKaydi.PROJE_OZELLIGI : "-"}</p>

        <p><strong>Onay Durumu:</strong> ${projeKaydi ? projeKaydi.CIZIM_ONAY_DURUMU : "-"}</p>

        <p><strong>Toplam Bütçe:</strong> ${projeKaydi ? projeKaydi.TOPLAM_BUTCE : "-"}</p>

        <p><strong>FiberNet HP:</strong> ${projeKaydi ? projeKaydi.FIBERNET_HP : "-"}</p>

    </div>
    `;

}
