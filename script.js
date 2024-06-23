const preview = document.getElementById("imageElement");
const showZoomImage = document.getElementById("showZoomImage");
const magnifier = document.getElementById("magnifier");
const onChangeHandler = (event) => {
  const file = event.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imgElement = document.getElementById("imageElement");
      imgElement.src = e.target.result;
      imgElement.style.display = "block";
      document.querySelector(".image-preview span").style.display = "none";
    };
    reader.readAsDataURL(file);
  } else {
    const imgElement = document.getElementById("imageElement");
    imgElement.src = "";
    imgElement.style.display = "none";
    document.querySelector(".image-preview span").style.display = "block";
  }
};

preview.addEventListener("mousemove", (event) => {
  console.log("move");
  showZoomImage.style.display = "block";
  magnifier.style.display = "block";
  const { width, height, left, top } = preview.getBoundingClientRect();
  const imgElement = document.getElementById("imageElement");

  // Get mouse position relative to the image
  const x = event.clientX - left;
  const y = event.clientY - top;

  const magnifierImg =
    "https://m.media-amazon.com/images/G/31/apparel/rcxgs/tile._CB483369979_.gif";

  // Calculate background position
  const backgroundPosX = Math.floor((x / width) * 100);
  const backgroundPosY = Math.floor((y / height) * 100);
  //console.log(x, y, backgroundPosX, backgroundPosY);
  magnifier.style.backgroundImage = `url(${magnifierImg})`;
  magnifier.style.left = `${x}px`;
  magnifier.style.top = `${y}px`;
  if (x < 50 && y < 50) {
    magnifier.style.left = `50px`;
    magnifier.style.top = `50px`;
  } else if (x > width - 50 && y < 50) {
    magnifier.style.left = `${width - 50}px`;
    magnifier.style.top = `50px`;
  } else if (y > height - 50 && x < 50) {
    magnifier.style.left = `50px`;
    magnifier.style.top = `${height - 50}px`;
  } else if (y > height - 50 && x > width - 50) {
    magnifier.style.left = `${width - 50}px`;
    magnifier.style.top = `${height - 50}px`;
  } else if (x < 50) {
    magnifier.style.left = `50px`;
    magnifier.style.top = `${y}px`;
  } else if (y < 50) {
    magnifier.style.left = `${x}px`;
    magnifier.style.top = `50px`;
  } else if (x > width - 50) {
    magnifier.style.left = `${width - 50}px`;
    magnifier.style.top = `${y}px`;
  } else if (y > height - 50) {
    magnifier.style.left = `${x}px`;
    magnifier.style.top = `${height - 50}px`;
  }
  // Show the zoom image with the correct background
  const zoomFactor = 2;
  showZoomImage.style.backgroundImage = `url(${imgElement.src})`;
  showZoomImage.style.backgroundPosition = `${backgroundPosX}% ${backgroundPosY}%`;
  showZoomImage.style.backgroundSize = `${width * zoomFactor}px ${
    height * zoomFactor
  }px`;
});

preview.addEventListener("mouseleave", (event) => {
  showZoomImage.style.display = "none";
  magnifier.style.display = "none";
});
