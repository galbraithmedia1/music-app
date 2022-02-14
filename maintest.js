window.onload = () => {
  const song_img_el = document.querySelector("#song-image");
  const song_title_el = document.querySelector("#song-title");
  const song_artist_el = document.querySelector("#song-artist");
  const song_next_up_el = document.querySelector("#song-next-up");

  const play_btn = document.querySelector("#play-btn");
  const play_btn_icon = document.querySelector("#play-icon");
  const prev_btn = document.querySelector("#prev-btn");
  const next_btn = document.querySelector("#next-btn");
  const progress = document.querySelector("#progress");
  const progressContainer = document.querySelector("#progress-container");

  const audio_player = document.querySelector("#music-player");

  let current_song_index;
  let next_song_index;

  play_btn.addEventListener("click", TogglePlaySong);
  next_btn.addEventListener("click", () => ChangeSong());
  prev_btn.addEventListener("click", () => ChangeSong(false));

  const baseURL = `http://localhost:4000/api/songs`

  const getAllSongs = () => axios.get(baseURL).then(res.data).catch(errCallback)

  InitPlayer();

  function InitPlayer() {
    current_song_index = 0;
    next_song_index = current_song_index + 1;
    UpdatePlayer();
  }

  function TogglePlaySong() {
    if (audio_player.paused) {
      audio_player.play();
      play_btn_icon.classList.remove("fa-play");
      play_btn_icon.classList.add("fa-pause");
    } else {
      audio_player.pause();
      play_btn_icon.classList.add("fa-play");
      play_btn_icon.classList.remove("fa-pause");
    }
  }

  axios.get("http://localhost:4000/api/songs").then(function ChangeSong(next = true) {
    if (next) {
      current_song_index++;
      next_song_index = current_song_index + 1;

      if (current_song_index > songs.length - 1) {
        current_song_index = 0;
        next_song_index = current_song_index + 1;
      }
      if (next_song_index > songs.length - 1) {
        next_song_index = 0;
      }
    } else {
      current_song_index--;
      next_song_index = current_song_index + 1;

      if (current_song_index < 0) {
        current_song_index = songs.length - 1;
        next_song_index = 0;
      }
    }
    UpdatePlayer();
    TogglePlaySong();
  })


    // axios.get("http://localhost:4000/api/songs").then(function (response) {
    //   const data = response.data;
    //   console.log(data)
    //   TogglePlaySong();
    // });
  



  function UpdatePlayer() {
    let song = songs[current_song_index];

    song_img_el.style = "background-image: url('" + song.img_path + "')";
    song_title_el.innerText = song.title;
    song_artist_el.innerText = song.artist;

    song_next_up_el.innerText =
      songs[next_song_index].title + " by " + songs[next_song_index].artist;

    audio_player.src = song.song_path;
  }

  function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    console.log(progressPercent);
  }

  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio_player.duration;

    audio_player.currentTime = (clickX / width) * duration;
  }

  audio_player.addEventListener("timeupdate", updateProgress);
  progressContainer.addEventListener("click", setProgress);
};
