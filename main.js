window.onload = () => {
  const song_img_el = document.querySelector("#song-image");
  const song_title_el = document.querySelector("#song-title");
  const song_artist_el = document.querySelector("#song-artist");
  const song_next_up_el = document.querySelector("#song-next-up");

  const play_btn = document.querySelector("#play-btn");
  const play_btn_icon = document.querySelector("#play-icon");
  const prev_btn = document.querySelector("#prev-btn");
  const next_btn = document.querySelector("#next-btn");

  const audio_player = document.querySelector("#music-player");

  let current_song_index;
  let next_song_index;

  let songs = [
    {
      title: "April Showers",
      artist: "May Flowers",
      song_path:
        "./assets/Music/April Showers   May Flowers   Spring Break [Lofi Fruits Release].mp3",
      img_path: "./assets/album-photos/song-1.jpeg",
    },
    {
      title: "Better Days",
      artist: "Tulip Fields",
      song_path:
        "./assets/Music/Better Days   Tulip Fields   Aroma [Lofi Fruits Release].mp3",
      img_path: "./assets/album-photos/song-2.jpeg",
    },
    {
      title: "Chilling In Tokyo",
      artist: "Aroma",
      song_path:
        "./assets/Music/Chilling In Tokyo ☯ Japanese Lofi HipHop Mix [Lofi Fruits Release].mp3",
      img_path: "./assets/album-photos/song-3.jpeg",
    },
    {
      title: "Easy On Me",
      artist: "Spring Break",
      song_path: "./assets/Music/Easy On Me [Lofi Fruits Release].mp3",
      img_path: "./assets/album-photos/song-4.jpeg",
    },
    {
      title: "Gaming Lofi",
      artist: "Late Night",
      song_path:
        "./assets/Music/Gaming Lofi    Late Night Gaming [Lofi Fruits Release].mp3",
      img_path: "./assets/album-photos/song-5.jpeg",
    },
    {
      title: "Im Not Okay",
      artist: "LoFi",
      song_path: "./assets/Music/Im Not Okay.mp3",
      img_path: "./assets/album-photos/song-6.jpeg",
    },
    {
      title: "Outdoor Fun",
      artist: "Delightful",
      song_path:
        "./assets/Music/Outdoor Fun   Delightful [Lofi Fruits Release].mp3",
      img_path: "./assets/album-photos/song-7.jpeg",
    },
    {
      title: "Pinecone",
      artist: "Buzzing Bees",
      song_path:
        "./assets/Music/Pinecone   Buzzing Bees   Strawberry Sugar [Lofi Fruits Release].mp3",
      img_path: "./assets/album-photos/song-8.jpeg",
    },
    {
      title: "Pixel Lofi Track",
      artist: "Vitural Reality Zone Out",
      song_path:
        "./assets/Music/Pixel Lofi Track   Virtual Reality Zone Out [Lofi Fruits Release].mp3",
      img_path: "./assets/album-photos/song-9.jpeg",
    },
    {
      title: "Spring Nights",
      artist: "The End of Spring",
      song_path:
        "./assets/Music/Spring Nights   The End of Spring [Lofi Fruits Release].mp3",
      img_path: "./assets/album-photos/song-10.jpeg",
    },
  ];

  play_btn.addEventListener("click", TogglePlaySong);
  next_btn.addEventListener("click", () => ChangeSong());
  prev_btn.addEventListener("click", () => ChangeSong(false));

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

  function ChangeSong(next = true) {
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
  }

  function UpdatePlayer() {
    let song = songs[current_song_index];

    song_img_el.style = "background-image: url('" + song.img_path + "')";
    song_title_el.innerText = song.title;
    song_artist_el.innerText = song.artist;

    song_next_up_el.innerText =
      songs[next_song_index].title + " by " + songs[next_song_index].artist;

    audio_player.src = song.song_path;
  }


};
