import sharp from "sharp";
async function generateImageBlur(url) {
  const imageBuffer = await fetch(url)
    .then((res) => res.buffer())
    .then((buffer) => {
      return sharp(buffer).resize({ width: 16 }).webp().toBuffer();
    })
    .catch((err) => {
      console.log(`Couldn't process: ${err}`);
    });
  const imageBase64 =
    "data:image/webp;base64," + imageBuffer.toString("base64");
  return imageBase64;
}

export async function addImageOptimization(
  items,
  largestContentfulPaintAmount
) {
  const optItems = [...items];

  const imageProps = {
    placeholder: false,
    blurDataURL: false,
    priority: true,
  };
  for (let index = 0; optItems.length > index; index++) {
    optItems[index].imageProps = imageProps;
    if (index >= largestContentfulPaintAmount) {
      const blurDataURL = await generateImageBlur(optItems[index].url);
      optItems[index].imageProps = {
        placeholder: "blur",
        blurDataURL: blurDataURL,
        priority: false,
      };
    }
  }
  return optItems;
}
