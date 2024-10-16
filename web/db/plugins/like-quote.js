/// <reference path="../global.d.ts" />
'use strict'

const S = require("fluent-json-schema");

/** @param {import('fastify').FastifyInstance} app */
module.exports = async function plugin(app) {
  async function incrementQuoteLikes(id) {
    const { db, sql } = app.platformatic;
    const result = await db.query(sql`
      UPDATE quotes SET likes = likes + 1 WHERE id=${id} RETURNING likes
    `);
    return result[0]?.likes;
  }

  const schema = {
    params: S.object().prop("id", app.getSchema("Quote").properties.id),
  };

  // Check if the route already exists
  if (!app.hasRoute({ method: 'POST', url: '/quotes/:id/like' })) {
    app.post("/quotes/:id/like", { schema }, async function (request, reply) {
      return { likes: await incrementQuoteLikes(request.params.id) };
    });
  }
};