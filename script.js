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
// =====================================
// BİNA ID İLE ARAMA
// =====================================

function araBina() {

    const aranan = document.getElementById("arama").value.trim();

    const sonucAlani = document.getElementById("sonucAlani");

    const cizimlerAlani = document.getElementById("cizimler");

    if (aranan == "") {

        sonucAlani.innerHTML = "<h2>Sonuçlar</h2><p>Lütfen Bina ID giriniz.</p>";

        return;

    }

    const binaKayitlari = binaVerileri.filter(function(veri){

        return String(veri.ES_BINA_KODU) === aranan;

    });

    if (binaKayitlari.length == 0){

        sonucAlani.innerHTML = "<h2>Sonuçlar</h2><p>Kayıt bulunamadı.</p>";

        cizimlerAlani.innerHTML = "<h2>Aynı Binaya Ait Çizimler</h2>";

        return;

    }

    let html = "";

    binaKayitlari.forEach(function(bina){

        const proje = projeVerileri.find(function(p){

            return String(p.CIZIM_ID) === String(bina.CIZIM_ID);

        });

        html += `

        <div class="proje-karti">

        <h2>Bina Bilgileri</h2>

        <p><strong>Bina ID :</strong> ${bina.ES_BINA_KODU}</p>

        <p><strong>Çizim ID :</strong> ${bina.CIZIM_ID}</p>

        <p><strong>Santral :</strong> ${bina.SANTRAL_ADI}</p>

        <p><strong>Çizim Adı :</strong> ${bina.CIZIM_ADI}</p>

        <p><strong>BBK :</strong> ${bina.BBK}</p>

        <hr>

        <h2>Proje Bilgileri</h2>

        <p><strong>Proje Yılı :</strong> ${proje ? proje.PROJE_YILI : "-"}</p>

        <p><strong>Proje Özelliği :</strong> ${proje ? proje.PROJE_OZELLIGI : "-"}</p>

        <p><strong>Onay Durumu :</strong> ${proje ? proje.CIZIM_ONAY_DURUMU : "-"}</p>

        <p><strong>Toplam Bütçe :</strong> ${proje ? proje.TOPLAM_BUTCE : "-"}</p>

        <p><strong>FiberNet HP :</strong> ${proje ? proje.FIBERNET_HP : "-"}</p>

        </div>

        `;

    });

    sonucAlani.innerHTML = html;

    cizimlerAlani.innerHTML = "<h2>Aynı Binaya Ait Çizimler</h2>";

    binaKayitlari.forEach(function(bina){

        cizimlerAlani.innerHTML += `
        <p>• ${bina.CIZIM_ID} - ${bina.CIZIM_ADI}</p>
        `;

    });

}
// =====================================
// ÇİZİM ID İLE ARAMA
// =====================================

function araCizim() {

    const aranan = document.getElementById("arama").value.trim();

    const sonucAlani = document.getElementById("sonucAlani");

    const bina = binaVerileri.find(function(veri){

        return String(veri.CIZIM_ID) === aranan;

    });

    if (!bina){

        sonucAlani.innerHTML = "<h2>Sonuçlar</h2><p>Çizim bulunamadı.</p>";

        return;

    }

    document.getElementById("arama").value = bina.ES_BINA_KODU;

    araBina();

}

// =====================================
// TEMİZLE
// =====================================

function temizle(){

    document.getElementById("arama").value="";

    document.getElementById("sonucAlani").innerHTML=`
        <h2>Sonuçlar</h2>
        <p>Henüz arama yapılmadı.</p>
    `;

    document.getElementById("cizimler").innerHTML=`
        <h2>Aynı Binaya Ait Çizimler</h2>
        <p>Henüz liste oluşturulmadı.</p>
    `;

}
