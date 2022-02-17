import Image from "next/image";
import React from "react";

export default function OptImage({
  src,
  height,
  width,
  imageProps,
  className,
}) {
  return (
    <Image
      src={src}
      alt=""
      width={width}
      height={height}
      quality={90}
      {...imageProps}
      // layout="fixed"
    />
  );
}
