const apiUrl = "https://script.google.com/macros/s/AKfycbzsmQnKOhYCWL0CzETpYb7MKu3NRJEi4wJar9SvK86Oi87saHFX-pXKyQ5nai7KCA9diw/exec";
const videoListEl = document.getElementById("videoList");
const playerEl = document.getElementById("player");

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    data.forEach((video, index) => {
      const li = document.createElement("li");
      li.textContent = video.name;
      li.onclick = () => {
        playerEl.src = video.url;
        playerEl.play();
      };
      videoListEl.appendChild(li);

      if (index === 0) {
        playerEl.src = video.url;
      }
    });
  })
  .catch(err => {
    console.error("Erro ao buscar vídeos:", err);
  });

function toggleFullscreen() {
  document.querySelector('.video-list').style.display = 'none';
  document.querySelector('.video-player').style.width = '100%';
}
