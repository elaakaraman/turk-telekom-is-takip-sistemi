function binaAra() {
    const binaId = document.getElementById("binaId").value;
    const sonucAlani = document.getElementById("sonucAlani");

    if (binaId === "") {
        sonucAlani.innerHTML = `
            <p>Lütfen bir Bina ID giriniz.</p>
        `;
    } else if (binaId === "101") {
        sonucAlani.innerHTML = `
            <h3>Bina ID: 101</h3>

            <div class="proje-karti">
                <h3>Fiber Altyapı Projesi</h3>
                <p><strong>Santral Adı:</strong> Keçiören Santrali</p>
                <p><strong>Proje Yılı:</strong> 2026</p>
                <p><strong>Proje Durumu:</strong> Devam Ediyor</p>
            </div>
        `;
    } else {
        sonucAlani.innerHTML = `
            <h3>Bina ID: ${binaId}</h3>
            <p>Bu Bina ID'ye ait proje bulunamadı.</p>
        `;
    }
}
