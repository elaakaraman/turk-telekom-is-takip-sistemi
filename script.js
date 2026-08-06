const urunlerAlani = document.getElementById("urunler");
const aramaKutusu = document.getElementById("arama");

let tumUrunler = [];

// JSON dosyasını oku
fetch("products.json")
    .then(response => response.json())
    .then(data => {
        tumUrunler = data;
        urunleriGoster(tumUrunler);
    })
    .catch(() => {
        urunlerAlani.innerHTML =
            "<h2>❌ Ürünler yüklenemedi.</h2>";
    });

// Ürünleri ekrana yazdır
function urunleriGoster(liste) {

    urunlerAlani.innerHTML = "";

    liste.forEach(urun => {

        urunlerAlani.innerHTML += `

        <div class="urun-kart">

            <img src="${urun.resim}" alt="${urun.urunAdi}">

            <div class="urun-bilgi">

                <h2>${urun.urunAdi}</h2>

                <p><strong>Marka:</strong> ${urun.marka}</p>

                <p><strong>Kategori:</strong> ${urun.kategori}</p>

                <p>⭐ ${urun.puan}</p>

                <p>${urun.aciklama}</p>

                <p class="fiyat">${urun.fiyat} TL</p>

                <button class="detay-btn">
                    Detayları Gör
                </button>

            </div>

        </div>

        `;

    });

}

// Arama
aramaKutusu.addEventListener("input", function () {

    const kelime = this.value.toLowerCase();

    const filtre = tumUrunler.filter(urun =>

        urun.urunAdi.toLowerCase().includes(kelime) ||

        urun.marka.toLowerCase().includes(kelime) ||

        urun.kategori.toLowerCase().includes(kelime)

    );

    urunleriGoster(filtre);

});
