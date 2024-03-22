// Veri havuzunu oluştur
const ogrenciler = [
    { ad: "Enes", ipucu: "Hiperaktif" },
    { ad: "Bilal", ipucu: "Kumarbaz" },
    { ad: "Umut", ipucu: "Çalgıcı" },
    { ad: "Tuğba", ipucu: "Sincap" },
    { ad: "Erayinho", ipucu: "Okulu bıraktı" }
];

// Seviyelere göre tahmin hakkı belirleme
const seviyeler = {
    "kolay": 10,
};

// HTML elementlerini değişkenlere atama
const kapsayici = document.getElementById("container");
const kapsayici2 = document.getElementById("container2")
const ipucuAlani = document.getElementById("hint");
const sonucAlani = document.getElementById("result");
const restartButton = document.getElementById("restartButton"); // Restart butonu

// Değişkenler ve sayaçlar
let sayac = 0;
let rastgeleOgrenci = {};
let kart = null;
let harfler = [];
let kalanHak = 0;
let basHarfAcildi = false;
let secilenSeviye = "kolay";

// Oyunu başlat
oyunuBaslat();

// Oyun başlatma fonksiyonunu tanımla
function oyunuBaslat() {
    rastgeleOgrenci = ogrenciler[Math.floor(Math.random() * ogrenciler.length)];

    ipucuAlani.textContent = "Acaba kim bu? " + rastgeleOgrenci.ipucu;

    // Seviyeye göre tahmin hakkı belirleme
    kalanHak = seviyeler[secilenSeviye];


    // Kartları oluştur
    kartlariOlustur();

    // Sonuç alanını temizle
    sonucAlani.textContent = "";

    // Seviye bilgisini ekrana yaz
    seviyeBilgisiYaz();
    basHarfAcildi = false;
}

// Kartları oluşturma fonksiyonunu tanımla
function kartlariOlustur() {
    sayac = 0;
    kapsayici.innerHTML = "";

    // Kelimeyi parçalayıp harfleri diziye at
    harfler = rastgeleOgrenci.ad.toUpperCase().split("");

    harfler.forEach((harf, index) => {
        kart = document.createElement("div");
        kart.innerHTML =harf;
            
        
       
        kart.className = "card";
        kart.dataset.value = harf;
        kart.dataset.index = index;
        kapsayici.appendChild(kart);
        kart.addEventListener("click", kartAc);
    })
}


function kartAc() {
   

    sayac++;
    kalanHak--;

    if (sayac <= seviyeler[secilenSeviye]) {
        this.innerHTML = harfler[this.dataset.index];
        this.classList.add("revealed");
        
    }

    if (sayac === seviyeler[secilenSeviye]) {
        tahminButonu.disabled = false;
        kalanHakAlani.textContent = "Tahminizi yazın!";
    }
}

oyunuBaslat();

restartButton.addEventListener("click", function() {
    oyunuBaslat(); 
});

function kartlariTasi(){
    sayac = 0;
    kapsayici.innerHTML = "";

    harfler = rastgeleOgrenci.ad.toUpperCase().split("");

    harfler.forEach((harf, index) => {
        kart = document.createElement("div");
        kart.innerHTML =harf;

        kart.className = "card";
        kart.dataset.value = harf;
        kart.dataset.index = index;
        kapsayici2.appendChild(kart);
        kart.addEventListener("click", kartlariTasi)
    })
    };
