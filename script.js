/* --- MENIU RESPONSIVE --- */
function schimbaMeniu() {
    var meniu = document.getElementById("meniu-tel");
    
    if (meniu.style.width === "60%" || meniu.style.width === "100%") {
        meniu.style.width = "0";
    } else {
        if (window.innerWidth < 500) {
            meniu.style.width = "100%";
        } else {
            meniu.style.width = "60%";
        }
    }
}

/* --- CALCULATOR DE PRET --- */
const listaJudete = [
    "Alba", "Arad", "Argeș", "Bacău", "Bihor", "Bistrița-Năsăud", "Botoșani", "Brașov", 
    "Brăila", "București", "Buzău", "Caraș-Severin", "Călărași", "Cluj", "Constanța", 
    "Covasna", "Dâmbovița", "Dolj", "Galați", "Giurgiu", "Gorj", "Harghita", "Hunedoara", 
    "Ialomița", "Iași", "Ilfov", "Maramureș", "Mehedinți", "Mureș", "Neamț", "Olt", 
    "Prahova", "Satu Mare", "Sălaj", "Sibiu", "Suceava", "Teleorman", "Timiș", "Tulcea", 
    "Vâlcea", "Vaslui", "Vrancea"
];

document.addEventListener('DOMContentLoaded', function() {
    const lista1 = document.getElementById('loc-plecare');
    const lista2 = document.getElementById('loc-sosire');

    if (lista1 && lista2) {
        listaJudete.forEach(judet => {
            let optiune1 = document.createElement('option');
            optiune1.value = judet;
            optiune1.text = judet;
            lista1.appendChild(optiune1);

            let optiune2 = document.createElement('option');
            optiune2.value = judet;
            optiune2.text = judet;
            lista2.appendChild(optiune2);
        });
    }
});

function faCalcul() {
    const plecare = document.getElementById('loc-plecare').value;
    const sosire = document.getElementById('loc-sosire').value;
    const kg = parseFloat(document.getElementById('kg').value);
    const casutaPret = document.getElementById('pret-final');

    if (plecare === "" || sosire === "") {
        alert("Te rog selectează locațiile!");
        return;
    }

    if (isNaN(kg) || kg <= 0) {
        alert("Te rog introdu greutatea!");
        return;
    }

    let pretPornire = 15;
    let costPeKg = kg * 1.5;
    let costDrum = 0;

    if (plecare === sosire) {
        costDrum = 10; 
    } else {
        costDrum = 35;
    }

    let total = pretPornire + costPeKg + costDrum;

    casutaPret.value = total.toFixed(2);
}

/* --- HARTA INTERACTIVA --- */
var elementHarta = document.getElementById('harta-lockers');

if (elementHarta) {
    var harta = L.map('harta-lockers').setView([46.0, 25.0], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(harta);

    var configuratieOrase = [
        { nume: "Bucuresti", lat: 44.4268, lng: 26.1025, numar: 150 },
        { nume: "Cluj-Napoca", lat: 46.7712, lng: 23.6236, numar: 50 },
        { nume: "Timisoara", lat: 45.7489, lng: 21.2087, numar: 45 },
        { nume: "Iasi", lat: 47.1585, lng: 27.6014, numar: 45 },
        { nume: "Constanta", lat: 44.1792, lng: 28.6121, numar: 40 },
        { nume: "Brasov", lat: 45.6427, lng: 25.5887, numar: 40 },
        { nume: "Craiova", lat: 44.3302, lng: 23.7949, numar: 35 },
        { nume: "Galati", lat: 45.4353, lng: 28.0080, numar: 30 },
        { nume: "Ploiesti", lat: 44.9366, lng: 26.0129, numar: 30 },
        { nume: "Oradea", lat: 47.0465, lng: 21.9189, numar: 30 },
        { nume: "Braila", lat: 45.2692, lng: 27.9575, numar: 20 },
        { nume: "Arad", lat: 46.1866, lng: 21.3123, numar: 20 },
        { nume: "Pitesti", lat: 44.8565, lng: 24.8692, numar: 20 },
        { nume: "Sibiu", lat: 45.7983, lng: 24.1256, numar: 20 },
        { nume: "Bacau", lat: 46.5677, lng: 26.9146, numar: 15 },
        { nume: "Targu Mures", lat: 46.5456, lng: 24.5625, numar: 15 },
        { nume: "Baia Mare", lat: 47.6533, lng: 23.5795, numar: 15 },
        { nume: "Buzau", lat: 45.1506, lng: 26.8184, numar: 10 },
        { nume: "Satu Mare", lat: 47.7900, lng: 22.8857, numar: 10 },
        { nume: "Ramnicu Valcea", lat: 45.0997, lng: 24.3693, numar: 10 },
        { nume: "Suceava", lat: 47.6426, lng: 26.2547, numar: 10 }
    ];

    var lockere = [];

    configuratieOrase.forEach(function(oras) {
        for (var i = 1; i <= oras.numar; i++) {
            var deviatieLat = (Math.random() - 0.5) * 0.06; 
            var deviatieLng = (Math.random() - 0.5) * 0.08; 

            lockere.push({
                nume: "Locker FastExpress - " + oras.nume + " #" + i,
                oras: oras.nume,
                lat: oras.lat + deviatieLat,
                lng: oras.lng + deviatieLng
            });
        }
    });

    lockere.forEach(function(pct) {
        var marker = L.marker([pct.lat, pct.lng]).addTo(harta);
        marker.bindPopup("<b>" + pct.nume + "</b><br>Oraș: " + pct.oras + "<br>Status: Activ (24/7)");
    });

    function cautaPeHarta() {
        var orasCautat = document.getElementById('input-oras').value.toLowerCase().trim();
        var gasit = false;

        for (var i = 0; i < configuratieOrase.length; i++) {
            var o = configuratieOrase[i];
            
            if (o.nume.toLowerCase().includes(orasCautat)) {
                harta.flyTo([o.lat, o.lng], 13);
                gasit = true;
                break;
            }
        }

        if (!gasit) {
            alert("Nu am găsit orașul '" + orasCautat + "' în rețeaua noastră! Încearcă un oraș mare (ex: Bucuresti, Iasi, Timisoara).");
        }
    }
}

/* --- PROCESARE FORMULAR AJAX --- */
var form = document.getElementById("formular-contact");

if (form) {
    form.addEventListener("submit", async function(event) {
        event.preventDefault();
        
        var status = document.getElementById("mesaj-eroare");
        var successDiv = document.getElementById("mesaj-succes");
        var data = new FormData(event.target);

        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                form.style.display = "none";
                successDiv.style.display = "block";
                form.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        status.textContent = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        status.textContent = "Oops! A apărut o problemă la trimitere.";
                    }
                    status.style.display = "block";
                })
            }
        }).catch(error => {
            status.textContent = "Oops! A apărut o problemă la trimiterea formularului.";
            status.style.display = "block";
        });
    });
}

function reseteazaFormular() {
    document.getElementById("formular-contact").style.display = "block";
    document.getElementById("mesaj-succes").style.display = "none";
    document.getElementById("mesaj-eroare").style.display = "none";
}

/* --- ANIMATII LA SCROLL (INTERSECTION OBSERVER) --- */
document.addEventListener('DOMContentLoaded', function() {
    const observator = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('arata-scroll');
            }
        });
    });

    const elementeAscunse = document.querySelectorAll('.card-flota, .card-serviciu, .card-membru, .card-blog, .info-membru, .titlu-mare');
    
    elementeAscunse.forEach((el) => {
        el.classList.add('ascuns-scroll');
        observator.observe(el);
    });
});