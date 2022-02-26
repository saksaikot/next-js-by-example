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

export function addImageOptimization(items, largestContentfulPaintAmount = 0) {
  const optItems = [...items];

  // const imageProps = {
  //   placeholder: false,
  //   blurDataURL: false,
  //   priority: true,
  // };
  for (let index = 0; optItems.length > index; index++) {
    // optItems[index].imageProps = imageProps;
    // const blurDataURL = await generateImageBlur(optItems[index].url);
    // console.log(optItems[index]);
    optItems[index].imageProps = {
      placeholder: "blur",
      blurDataURL: addBase64ImageString(optItems[index].placeholder_webp),
      priority: true,
    };
    if (index >= largestContentfulPaintAmount) {
      optItems[index].imageProps.priority = false;
    }
  }
  return optItems;
}

function addBase64ImageString(base64) {
  return `data:image/webp;base64,` + base64;
}
