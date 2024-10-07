const canciones = [
  {
    cancion: "/assets/don-jose.mp3",
    imagen: "/assets/ribereños.jpg",
    titulo: "Don José",
    artista: "Los Ribereños",
  },
  {
    cancion: "/assets/amor-en-venecia.mp3",
    imagen: "/assets/tottis.jpg",
    titulo: "Amor en Venecia",
    artista: "Tottis",
  },
  {
    cancion: "/assets/my-way.mp3",
    imagen: "/assets/sinatra.jpg",
    titulo: "My Way",
    artista: "Frank Sinatra",
  },
  {
    cancion: "/assets/somewhere-over-the-rainbow.mp3",
    imagen: "/assets/israel.jpg",
    titulo: "Somewhere Over The Rainbow",
    artista: "Israel Kamakawiwo'ole",
  },
];

let progress = document.getElementById("progress");
let song = document.getElementById("song");
const playBtn = document.getElementById("play-btn");
const backwardBtn = document.getElementById("backward-btn");
const forwardBtn = document.getElementById("forward-btn");
const playBtnContainer = document.getElementById("play-btn-container");
const backwardBtnContainer = document.getElementById("backward-btn-container");
const forwardBtnContainer = document.getElementById("forward-btn-container");
const songContainer = document.querySelector(".song-container");

let currentSongIndex = 0;

const updateSongInfo = (index) => {
  songContainer.innerHTML = `<div class="cont-img">
    <img src="${canciones[index].imagen}" alt="artist image" id="artist-img"/>
    </div>
    <h1 id="artist">${canciones[index].artista}</h1>
    <p id="song-title">${canciones[index].titulo}</p>`;
  song.src = canciones[index].cancion;
  song.play();
};

updateSongInfo(0);

song.onloadedmetadata = () => {
  progress.max = song.duration;
  progress.value = song.currentTime;
};

const playPauseSong = () => {
  if (playBtn.classList.contains("fa-pause")) {
    song.pause();
    playBtn.classList.remove("fa-pause");
    playBtnContainer.classList.remove("party-time");
    playBtn.classList.add("fa-play");
  } else {
    song.play();
    setInterval(() => {
      progress.value = song.currentTime;
    }, 500);
    playBtn.classList.add("fa-pause");
    playBtnContainer.classList.add("party-time");
    playBtn.classList.remove("fa-play");
  }
};

progress.onchange = () => {
  song.play();
  song.currentTime = progress.value;
  playBtn.classList.add("fa-pause");
  playBtn.classList.remove("fa-play");
};

playBtnContainer.addEventListener("click", () => {
  playPauseSong();
});

backwardBtnContainer.addEventListener("click", () => {
  currentSongIndex--;
  playBtn.classList.remove("fa-pause");
  if (currentSongIndex < 0) {
    currentSongIndex = canciones.length - 1;
  }
  updateSongInfo(currentSongIndex);
  playPauseSong();
});

forwardBtnContainer.addEventListener("click", () => {
  currentSongIndex++;
  playBtn.classList.remove("fa-pause");
  if (currentSongIndex >= canciones.length) {
    currentSongIndex = 0;
  }
  updateSongInfo(currentSongIndex);
  playPauseSong();
});
