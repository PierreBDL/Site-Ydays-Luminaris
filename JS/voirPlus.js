// Chargement du JSON au démarrage
loadEvents();

function VoirPlus(button, eventKey, colorBorder) {
    const plusInfosContainer = document.getElementById("PlusInfosContainer");
    const plusInfos = document.getElementById("PlusInfos");

    plusInfos.style.display = "block";
    plusInfosContainer.style.display = "flex";

    // Parent
    const friseItem = button.closest(".friseItem");

    // Récupérer le titre et la description de l'élément friseItem
    const title = friseItem.querySelector("h3").innerText;
    const description = friseItem.querySelector("p").innerText;

    // Promesse pour le JSON
    let voirPlus = eventsData;

    // Récupérer le JSON de l'événement
    const event = voirPlus.find(e => e.id === eventKey);

    if (!event) {
        console.error("Erreur: L'événement avec l'ID '" + eventKey + "' n'a pas été trouvé dans le JSON.");
        return;
    }

    // Remplir les infos
    document.querySelector("#PlusInfos h2").innerHTML = event.title;

    const p = document.querySelector("#PlusInfos p");
    const descriptionContainer = document.getElementById("descriptionContainer");

    // Toujours afficher la description
    descriptionContainer.innerHTML = event.description || "Aucune description disponible.";

    // Afficher les tâches si présentes
    if (event.tasks && event.tasks.length > 0) {
        p.innerHTML = "<strong>Développeurs :</strong><br>";
        event.tasks.forEach(task => {
            p.innerHTML += `<span class="${task.status}">- ${task.text}</span><br>`;
        });
        p.style.display = "block";
    } else {
        p.innerHTML = "";
        p.style.display = "none";
    }

    // Supprimer les images existantes
    const oldVideos = imagesContainer.querySelectorAll("video");
    oldVideos.forEach(oldVideo => {
        oldVideo.pause();
        oldVideo.removeAttribute('src');
        oldVideo.load();
    });

    // Ajout des images
    const imagesContainer = document.getElementById("carrousel");
    imagesContainer.innerHTML = ""; // Clear
    if (event.images && event.images.length > 0) {
        event.images.forEach(src => {
            if (src.toLowerCase().includes("image")) {
                const img = document.createElement("img");
                img.src = "Images" + src;
                img.style.maxWidth = "100%";
                img.style.maxHeight = "400px";
                img.style.display = "block";
                img.style.margin = "auto";
                img.style.objectFit = "contain";
                img.alt = "Image supplémentaire";
                img.classList.add("ImageVoirPlus");
                imagesContainer.appendChild(img);
            } else if (src.toLowerCase().includes("video")) {
                const video = document.createElement("video");
                video.src = "Images" + src;
                video.controls = true;
                video.alt = "Vidéo supplémentaire";
                video.loop = true;
                video.muted = true;
                video.autoplay = true;
                video.style.maxWidth = "100%";
                video.style.maxHeight = "400px";
                video.style.display = "block";
                video.style.margin = "auto";
                video.style.objectFit = "contain";
                video.classList.add("ImageVoirPlus");
                video.preload = "auto";
                imagesContainer.appendChild(video);
            }
        });
    }

    // Appliquer la bordure colorée
    document.getElementById("PlusInfos").style.border = `2px solid ${colorBorder || 'black'}`;

    // Réinitialiser le carrousel
    index = 0;
    UpdateCarrousel();

    // Afficher le conteneur des infos
    document.getElementById("PlusInfos").classList.add("visible");

    // Fermer au clic en dehors du popup
    plusInfosContainer.addEventListener("click", function (event) {
        if (event.target === plusInfosContainer) {
            closeInfos();
            closeImageZoom();
        }
    });

    // Si event 11 -> enlever le "3d"
    if (event.id === "event11") {
        document.getElementById("name3D").innerHTML = "";
    } else {
        document.getElementById("name3D").innerHTML = "<strong>3Ds :</strong><br>";
    }

    // Ancre vers caroussel
    /*document.getElementById("PlusInfos").scrollIntoView({
        behavior: "smooth"
    });*/
}

function closeInfos() {
    const plusInfosContainer = document.getElementById("PlusInfosContainer");
    const plusInfos = document.getElementById("PlusInfos");

    plusInfosContainer.classList.remove("visible");
    plusInfos.classList.remove("visible");

    plusInfos.style.display = "none";
    plusInfosContainer.style.display = "none";

    // Supprime les vidéos
    const oldVideos = imagesContainer.querySelectorAll("video");
    oldVideos.forEach(oldVideo => {
        oldVideo.pause();
        oldVideo.removeAttribute('src');
        oldVideo.load();
    });

    // Réinitialiser le carrousel
    index = 0;
    UpdateCarrousel();

    // Remonter en haut de la page
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Promesse pour le JSON
let eventsData = [];

async function loadEvents() {
    const response = await fetch("./Json/events.json");
    const data = await response.json();
    eventsData = data.events;
}


document.getElementById('carrousel').addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        const imageZoom = document.getElementById('imageZoom');
        imageZoom.src = e.target.src;
        imageZoom.style.display = 'flex';

        // Arrière flou pour le reste de la page sauf pour l'image zoomée
        document.getElementById('PlusInfos').style.filter = 'blur(5px)';
        document.getElementById('PlusInfos').style.pointerEvents = 'none';
        document.getElementById('friseContainer').style.filter = 'blur(5px)';
        document.getElementById('friseContainer').style.pointerEvents = 'none';
    }
});

document.getElementById('imageZoom').addEventListener('click', closeImageZoom);

function closeImageZoom() {
    const imageZoom = document.getElementById('imageZoom');
    imageZoom.style.display = 'none';
    imageZoom.src = '';

    // Retirer le flou et réactiver les interactions
    document.getElementById('PlusInfos').style.filter = 'none';
    document.getElementById('PlusInfos').style.pointerEvents = 'auto';
    document.getElementById('friseContainer').style.filter = 'none';
    document.getElementById('friseContainer').style.pointerEvents = 'auto';
}