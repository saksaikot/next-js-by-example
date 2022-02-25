const { createCoreController } = require("@strapi/strapi").factories;
const { parseMultipartData, sanitizeEntity } = require("@strapi/utils");
const { isObject } = require("lodash/fp");
const UID = "api::cart-item.cart-item";
const parseBody = (ctx) => {
  if (ctx.is("multipart")) {
    return parseMultipartData(ctx);
  }

  const { data } = ctx.request.body || {};

  return { data };
};
module.exports = createCoreController(UID, ({ strapi }) => ({
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
    const user_id = ctx.state.user.id;

    ctx.query = {
      ...ctx.query,
      local: "en",
      "filters[user_id][$eq]": user_id,
    };

    // Calling the default core action
    const { data, meta } = await super.find(ctx);

    return { data: data, meta };
  },

  // Method 3: Replacing a core action
  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.service(UID).findOne(id, query);
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
  async create(ctx) {
    const { query } = ctx.request;

    const { data, files } = parseBody(ctx);
    const user_id = ctx.state.user.id;
    const where = {
      user_id,
      product_id: data.product,
    };
    if (!isObject(data)) {
      return ctx.badRequest('Missing "data" payload in the request body');
    }

    const sanitizedInputData = await this.sanitizeInput(data, ctx);
    const extra = {
      user_id,
      product_id: data.product,
      users_permissions_user: user_id,
    };

    let entity;
    const oldEntity = await strapi.db.query(UID).findOne({ where });
    if (oldEntity) {
      entity = await strapi
        .service(UID)
        .update(oldEntity.id, { ...query, data: sanitizedInputData, files });
    } else {
      entity = await strapi.service(UID).create({
        ...query,
        data: { ...sanitizedInputData, ...extra },
        files,
      });
    }

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
  async delete(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;
    const cartItem = await strapi.db.query(UID).findOne({
      where: {
        id: ctx.params.id,
        user_id: ctx.state.user.id,
      },
    });
    // console.log(cartItem);
    if (!cartItem) {
      return ctx.NotFound(`Entry not found`);
    }
    const entity = await strapi.service(UID).delete(id, query);
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
