"use strict";
const { sanitizeEntity } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Retrieve records.
   *
   * @return {Array}
   */

  async findList(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.infos.search(ctx.query);
    } else {
      entities = await strapi.services.infos.find(ctx.query);
    }

    entities.map((entry) => {
      delete entry.content;
    });

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.infos })
    );
  },
};
