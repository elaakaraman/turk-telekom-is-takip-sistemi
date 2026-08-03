alert("Script çalıştı");
let projeVerileri = [];
let binaVerileri = [];

// PROJE EXCELİ
document.getElementById("projeExcel").addEventListener("change", function (e) {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        const data = new Uint8Array(event.target.result);

        const workbook = XLSX.read(data, { type: "array" });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        projeVerileri = XLSX.utils.sheet_to_json(sheet);

        alert("Proje Exceli başarıyla yüklendi.");

    };

    reader.readAsArrayBuffer(file);

});

// BİNA EXCELİ
document.getElementById("binaExcel").addEventListener("change", function (e) {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        const data = new Uint8Array(event.target.result);

        const workbook = XLSX.read(data, { type: "array" });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        binaVerileri = XLSX.utils.sheet_to_json(sheet);

        alert("Bina Exceli başarıyla yüklendi.");

    };

    reader.readAsArrayBuffer(file);

});
function ara() {

    const aranan = document.getElementById("arama").value.trim();

    const sonucAlani = document.getElementById("sonucAlani");

    if (aranan === "") {

        sonucAlani.innerHTML = "<h3>Lütfen Bina ID veya Çizim ID giriniz.</h3>";

        return;

    }

    let binaKaydi = binaVerileri.find(veri =>
        String(veri.ES_BINA_KODU) === aranan ||
        String(veri.CIZIM_ID) === aranan
    );

    if (!binaKaydi) {

        sonucAlani.innerHTML = "<h3>Kayıt bulunamadı.</h3>";

        return;

    }

    let projeKaydi = projeVerileri.find(veri =>
        String(veri.CIZIM_ID) === String(binaKaydi.CIZIM_ID)
    );

    sonucAlani.innerHTML = `
        <div class="proje-karti">

        <h2>Bina Bilgileri</h2>

        <p><b>Bina ID :</b> ${binaKaydi.ES_BINA_KODU}</p>

        <p><b>Çizim ID :</b> ${binaKaydi.CIZIM_ID}</p>

        <p><b>Santral :</b> ${binaKaydi.SANTRAL_ADI}</p>

        <p><b>Çizim Adı :</b> ${binaKaydi.CIZIM_ADI}</p>

        <p><b>BBK :</b> ${binaKaydi.BBK}</p>

        <hr>

        <h2>Proje Bilgileri</h2>

        <p><b>Proje Yılı :</b> ${projeKaydi?.PROJE_YILI ?? "-"}</p>

        <p><b>Proje Özelliği :</b> ${projeKaydi?.PROJE_OZELLIGI ?? "-"}</p>

        <p><b>Onay Durumu :</b> ${projeKaydi?.CIZIM_ONAY_DURUMU ?? "-"}</p>

        <p><b>Toplam Bütçe :</b> ${projeKaydi?.TOPLAM_BUTCE ?? "-"}</p>

        <p><b>FiberNet HP :</b> ${projeKaydi?.FIBERNET_HP ?? "-"}</p>

        </div>
    `;

}
function araBina() {
    ara();
}

function araCizim() {
    ara();
}

function temizle() {

    document.getElementById("arama").value = "";

    document.getElementById("sonucAlani").innerHTML =
    "<p>Henüz arama yapılmadı.</p>";

}
