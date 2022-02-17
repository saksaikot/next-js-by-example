const sharp = require("sharp");
const axios = require("axios");

async function generateImageBlur(url) {
  const imageBuffer = await axios
    .get(url, { responseType: "arraybuffer" })
    .then((res) => {
      console.log(`Resizing Image!`);
      return (
        sharp(res.data)
          .resize({ width: 16 })
          .webp()
          // toFile("1.webp");
          .toBuffer()
      );
    })
    .catch((err) => {
      console.log(`Couldn't process: ${err}`);
    });
  const imageBase64 =
    "data:image/webp;base64," + imageBuffer.toString("base64");
  console.log(imageBase64);
  return imageBase64;
}
generateImageBlur(
  `http://127.0.0.1:1337/uploads/snake_plant_93a885318c_495df58fbd.jpg`
);
