"use strict";
const _ = require("lodash");
const sharp = require("sharp");
// const { encode } = require("blurhash");
module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    strapi.contentType("plugin::upload.file").attributes.placeholder_webp = {
      type: "string",
    };

    strapi.plugin("upload").services.upload.uploadFileAndPersist =
      async function (fileData, { user } = {}) {
        const config = strapi.config.get("plugin.upload");

        const { getDimensions, generateThumbnail, generateResponsiveFormats } =
          strapi.plugin("upload").service("image-manipulation");

        await strapi.plugin("upload").provider.upload(fileData);

        const thumbnailFile = await generateThumbnail(fileData);

        if (thumbnailFile) {
          await strapi.plugin("upload").provider.upload(thumbnailFile);
          // Begin Override

          const encodeImageToBlurhash = (imageBuffer) =>
            sharp(imageBuffer).resize({ width: 4 }).webp().toBuffer();

          const imageBuffer = await encodeImageToBlurhash(thumbnailFile.buffer);
          const imageBase64 = imageBuffer.toString("base64");
          // Add a custom field to add a blurHash

          fileData.placeholder_webp = imageBase64;

          // End Override
          delete thumbnailFile.buffer;
          _.set(fileData, "formats.thumbnail", thumbnailFile);
        }

        const formats = await generateResponsiveFormats(fileData);

        if (Array.isArray(formats) && formats.length > 0) {
          for (const format of formats) {
            if (!format) continue;

            const { key, file } = format;

            await strapi.plugin("upload").provider.upload(file);

            delete file.buffer;

            _.set(fileData, ["formats", key], file);
          }
        }
        const { width, height } = await getDimensions(fileData.buffer);

        delete fileData.buffer;

        _.assign(fileData, {
          provider: config.provider,
          width,
          height,
        });

        return this.add(fileData, { user });
      };
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
