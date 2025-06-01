const API_KEY = 'AIzaSyDvYe-t6Et0Y8XAshw3AijtpFXlDjjPB44';
const FOLDER_ID = '1LIdRZxyRNkw_UocUQx9ZIgnn9JYtCAUg';
const videoListEl = document.getElementById("videoList");
const playerEl = document.getElementById("player");

const apiUrl = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+mimeType+contains+'video'&key=${API_KEY}&fields=files(id,name,mimeType)`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    if (!data.files || data.files.length === 0) {
      videoListEl.innerHTML = "<li>Nenhum vídeo encontrado.</li>";
      return;
    }

    data.files.forEach((file, index) => {
      const li = document.createElement("li");
      li.textContent = file.name;
      const videoUrl = `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media&key=${API_KEY}`;

      li.onclick = () => {
        playerEl.src = videoUrl;
        playerEl.play();
      };

      videoListEl.appendChild(li);

      if (index === 0) {
        playerEl.src = videoUrl;
      }
    });
  })
  .catch(err => {
    console.error("Erro ao buscar vídeos:", err);
    videoListEl.innerHTML = "<li>Erro ao carregar vídeos.</li>";
  });

function toggleFullscreen() {
  document.querySelector('.video-list').style.display = 'none';
  document.querySelector('.video-player').style.width = '100%';
}
