const videoEl = document.querySelector("#videos");
const loadingEl = document.querySelector("#loading");
let loading = false;

// fetch from the API here
const fetchVideos = async () => {
  loading = true;
  const res = await fetch(`http://localhost:5000/videos`);
  let data;

  if (res && res.status === 200) {
    data = await res.json();
  }

  loading = false;
  return data || [];
};

const addVideosToDom = async () => {
  const videos = await fetchVideos();
  if (videos.length > 0) {
    if (!loading) {
      loadingEl.innerHTML = ``;
    }
    videos.forEach((video) => {
      const { title, date, description, tags } = video;
      const div = document.createElement("div");
      div.className = "video";
      div.innerHTML = `
        <h3>${title}</h3>
        <ul>
            <li><strong>Release date: </strong> ${date}</li>
            <li><strong>Description: </strong> ${description}</li>
        </ul>
        <div class="tags">
            ${tags}
        </div>
      `;
      videoEl.appendChild(div);
    });
  }

  if (videos.length === 0) {
    loadingEl.innerHTML = ``;

    videoEl.innerHTML = `<h1>No upcoming videos.</h1>`;
  }
};

addVideosToDom();
