var images = [];
var currentIndex = 0;
var moves = 0;
var startTime;
var timerInterval;

window.onload = function () {
    initGioco();

    function initGioco() {
        caricaImmagini();
        startTime = new Date();
        avviaTimer();

        var imgElement1 = document.getElementById('img1');
        var imgElement3 = document.getElementById('img3');
        var imgElement4 = document.getElementById('img4');
        if (imgElement1 && imgElement3 && imgElement4) {
            imgElement1.addEventListener('click', gestisciClickImmagine);
            imgElement3.addEventListener('click', gestisciClickImmagine);
            imgElement4.addEventListener('click', gestisciClickImmagine);
        } else {
            console.error("Elementi con gli ID non trovati.");
        }
    }

    function caricaImmagini() {
        try {
            fetch("DB/index.php")
                .then(response => response.json())
                .then(data => {
                    images = data;
                    currentIndex = 0;
                    aggiornaSchermo();
                })
                .catch(error => {
                    console.error('Errore nel recupero dei percorsi delle immagini:', error);
                });
        } catch (error) {
            console.error('Errore nel recupero dei percorsi delle immagini:', error);
        }
    }

    function aggiornaSchermo() {
        var imgElement1 = document.getElementById('img1');
        var imgElement3 = document.getElementById('img3');
        var imgElement4 = document.getElementById('img4');

        if (currentIndex < images.length) {
            imgElement1.src = images[currentIndex].img1;
            imgElement3.src = images[currentIndex].img3;
            imgElement4.src = images[currentIndex].img2;
        } else {
            console.log("Hai completato tutte le sequenze!");
        }
    }

    function gestisciClickImmagine() {
        if (currentIndex < images.length) {
            moves++;
            currentIndex++;
            aggiornaSchermo();

            if (moves % 3 === 0) {
                caricaImmagini();
            }
        }
    }

    function avviaTimer() {
        timerInterval = setInterval(aggiornaTimer, 1000);
    }

    function aggiornaTimer() {
        const currentTime = new Date();
        const tempoTrascorso = (currentTime - startTime) / 1000;
        document.querySelector('footer').textContent = `Tempo trascorso: ${tempoTrascorso.toFixed(0)}s | Mosse: ${moves}`;
    }
};
/*non va nulla se non il tempo*/