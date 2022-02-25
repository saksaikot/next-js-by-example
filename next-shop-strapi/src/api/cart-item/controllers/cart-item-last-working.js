const { createCoreController } = require("@strapi/strapi").factories;
const { parseMultipartData, sanitizeEntity } = require("@strapi/utils");
const { isObject } = require("lodash/fp");

const parseBody = (ctx) => {
  if (ctx.is("multipart")) {
    return parseMultipartData(ctx);
  }

  const { data } = ctx.request.body || {};

  return { data };
};
module.exports = createCoreController(
  "api::cart-item.cart-item",
  ({ strapi }) => ({
    // Method 1: Creating an entirely custom action
    async exampleAction(ctx) {
      try {
        ctx.body = "ok";
      } catch (err) {
        ctx.body = err;
      }
    },

    // Method 2: Wrapping a core action (leaves core logic in place)
    async find(ctx) {
      // some custom logic here
      ctx.query = { ...ctx.query, local: "en" };

      // Calling the default core action
      const { data, meta } = await super.find(ctx);
      // const result = await strapi.db
      //   .query("api::cart-item.cart-item")
      //   .findMany({
      //     populate: ["product.picture"],
      //   });
      // const cartItems = result.map((item) => {
      //   const {
      //     id,
      //     Quantity,
      //     product,
      //     product: { title, price, picture },
      //   } = item;
      //   const {
      //     placeholder_webp,
      //     formats: {
      //       xsmall: { url },
      //     },
      //   } = picture[0];
      //   // console.log(url);
      //   return {
      //     id,
      //     Quantity,
      //     title,
      //     price,
      //     product: product.id,
      //     placeholder_webp,
      //     url,
      //   };
      // });
      const entries = await strapi.db
        .query("api::cart-item.cart-item")
        .findMany({
          where: {
            user_id: { $eq: ctx.state.user.id },
          },
        });
      console.log(entries);
      // some more custom logic
      // meta.date = Date.now();

      return { data: entries, meta };
    },

    // Method 3: Replacing a core action
    async findOne(ctx) {
      const { id } = ctx.params;
      const { query } = ctx;

      const entity = await strapi
        .service("api::cart-item.cart-item")
        .findOne(id, query);
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },
    // async create(ctx) {
    //   // let entity;
    //   // const { create } = strapi.db.query("api::cart-item.cart-item");
    //   // if (ctx.is("multipart")) {
    //   //   const { data, files } = parseMultipartData(ctx);
    //   //   // data.user = ctx.state.user.id;
    //   //   data.user_id = ctx.state.user.id;
    //   //   data.users_permissions_user = ctx.state.user.id;
    //   //   entity = await create({ data }, { files });
    //   // } else {
    //   //   ctx.request.body.user = ctx.state.user.id;
    //   //   ctx.request.body.user_id = ctx.state.user.id;
    //   //   entity = await create(ctx.request.body);
    //   // }
    //   // return { data: entity };
    //   // some logic here
    //   // ctx.request.body.user = ctx.state.user.id;
    //   const user_id = ctx.state.user.id;
    //   const users_permissions_user = user_id;
    //   // ctx.request.body.data = {
    //   //   ...ctx.request.body.data,
    //   //   user_id,
    //   //   users_permissions_user,
    //   // };
    //   // console.log(
    //   //   ctx.request.body,
    //   //   typeof ctx.request.body,
    //   //   "data",
    //   //   ctx.request.body.data
    //   // );
    //   // const response = await super.create(ctx);

    //   if (ctx.is("multipart")) {
    //     try {
    //       // console.log("inside try", ctx.request.body.data);
    //       let data = JSON.parse(ctx.request.body.data);
    //       const { product } = data;
    //       data = {
    //         ...data,
    //         user_id,
    //         users_permissions_user,
    //         user: user_id,
    //         product_id: product,
    //       };
    //       ctx.request.body.data = JSON.stringify(data);
    //     } catch (error) {
    //       return ctx.badRequest("'data' field is missing");
    //     }
    //   } else {
    //     ctx.request.body.user_id = user_id;
    //     ctx.request.body.users_permissions_user = users_permissions_user;
    //     ctx.request.body.product_id = ctx.request.body.product;
    //   }
    //   console.log(ctx.request.body);
    //   // some more logic
    //   const response = await super.create(ctx);

    //   return response;
    // },
    async create(ctx) {
      const UID = "api::cart-item.cart-item";
      const { query } = ctx.request;

      const { data, files } = parseBody(ctx);
      const user_id = ctx.state.user.id;
      const where = {
        user_id,
        product_id: data.product,
      };

      const entries = await strapi.db.query(UID).findOne({ where });
      if (entries) {
        const updatedEntry = await strapi.db.query(UID).update({
          where,
          data: {
            quantity: data.product.quantity,
          },
        });
      }
      console.log("[entries]", entries);
      if (!isObject(data)) {
        return ctx.badRequest('Missing "data" payload in the request body');
      }

      const sanitizedInputData = await this.sanitizeInput(data, ctx);
      const extra = {
        user_id,
        product_id: data.product,
        users_permissions_user: user_id,
      };
      const entity = await strapi
        .service(UID)
        .create({ ...query, data: { ...sanitizedInputData, ...extra }, files });
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },
    async delete(ctx) {
      const { id } = ctx.params;
      const { query } = ctx;
      const cartItem = await strapi.services(UID).find({
        id: ctx.params.id,
        user_id: ctx.state.user.id,
      });

      if (!cartItem) {
        return ctx.unauthorized(`You can't update this entry`);
      }
      const entity = await strapi.service(UID).delete(id, query);
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },
  })
);
