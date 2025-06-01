const API_KEY = 'AIzaSyDvYe-t6Et0Y8XAshw3AijtpFXlDjjPB44';
const FOLDER_ID = '1LIdRZxyRNkw_UocUQx9ZIgnn9JYtCAUg';
const videoListEl = document.getElementById("videoList");
const playerEl = document.getElementById("player");
const nowPlayingEl = document.getElementById("nowPlaying");
const videoListContainer = document.getElementById("videoListContainer");
const showListBtn = document.getElementById("showListBtn");

const apiUrl = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+mimeType+contains+'video'&key=${API_KEY}&fields=files(id,name,mimeType)`;

let videoData = [];

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    if (!data.files || data.files.length === 0) {
      videoListEl.innerHTML = "<li>Nenhum vídeo encontrado.</li>";
      return;
    }

    videoData = data.files;
    renderList(videoData);
    playVideo(videoData[0]); // Toca o primeiro vídeo
  })
  .catch(err => {
    console.error("Erro ao buscar vídeos:", err);
    videoListEl.innerHTML = "<li>Erro ao carregar vídeos.</li>";
  });

function renderList(videos) {
  videoListEl.innerHTML = "";

  videos.forEach((file, index) => {
    const li = document.createElement("li");
    li.textContent = file.name;
    li.onclick = () => {
      playVideo(file);
    };
    videoListEl.appendChild(li);
  });
}

function playVideo(file) {
  const videoUrl = `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media&key=${API_KEY}`;
  playerEl.src = videoUrl;
  playerEl.play();
  nowPlayingEl.textContent = `REPRODUZINDO AGORA: ${file.name}`;
}

function toggleFullscreen() {
  videoListContainer.style.display = 'none';
  document.querySelector('.video-player').style.width = '100%';
  showListBtn.style.display = 'block';
}

function showList() {
  videoListContainer.style.display = 'block';
  document.querySelector('.video-player').style.width = '80%';
  showListBtn.style.display = 'none';
}
