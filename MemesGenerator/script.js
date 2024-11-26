const canvas = document.getElementById("memeCanvas");
const ctx = canvas.getContext("2d");
const imageInput = document.getElementById("imageInput");
const fileNameDisplay = document.getElementById("file-name");
let uploadedImage = null;

// Update file name on file input change
imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    fileNameDisplay.textContent = file.name;
  } else {
    fileNameDisplay.textContent = "Chưa chọn tệp";
  }
});

// Load the image onto the canvas
imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const img = new Image();
    img.src = e.target.result;
    img.onload = () => {
      uploadedImage = img;
      drawImage();
    };
  };

  reader.readAsDataURL(file);
});

// Draw image and text on canvas
function drawImage() {
  if (uploadedImage) {
    // Clear canvas and set canvas dimensions to fit the image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);

    // Get text values
    const topText = document.getElementById("topText").value;
    const bottomText = document.getElementById("bottomText").value;

    // Set text styles
    ctx.font = "30px Impact";
    ctx.fillStyle = "red";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.textAlign = "center";

    // Draw top text
    ctx.fillText(topText, canvas.width / 2, 50);
    ctx.strokeText(topText, canvas.width / 2, 50);

    // Draw bottom text
    ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
  }
}

// Generate meme by drawing text on the uploaded image
function generateMeme() {
  drawImage();
}

// Download the meme as an image
function downloadMeme() {
  const link = document.createElement("a");
  link.download = "meme.png";
  link.href = canvas.toDataURL();
  link.click();
}
