function binaAra() {
    const binaId = document.getElementById("binaId").value;

    const sonucAlani = document.getElementById("sonucAlani");

    if (binaId === "") {
        sonucAlani.innerHTML = "<p>Lütfen bir Bina ID giriniz.</p>";
    } else {
        sonucAlani.innerHTML =
            "<h3>Bina ID: " + binaId + "</h3>" +
            "<p>Bu binaya ait proje bilgileri daha sonra burada gösterilecektir.</p>";
    }
}
