'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class _objectName_Service extends Service {
  async findAll(payload) {
    const { ctx } = this;
    const { limit, offset, prop_order, order, name } = payload;
    const where = {};
    const Order = [];
    name ? (where.name = { [Op.like]: `%${name}%` }) : null;
    prop_order && order ? Order.push([prop_order, order]) : null;
    return await ctx.model.TaskTypes.findAndCountAll({
      limit,
      offset,
      where,
      order: Order,
    });
  }

  async findOne(id) {
    const { ctx } = this;
    return await ctx.model.TaskTypes.findOne({ where: { id } });
  }

  async create(payload) {
    const { ctx } = this;
    return await ctx.model.TaskTypes.create(payload);
  }

  async update(payload) {
    const { ctx } = this;
    return await ctx.model.TaskTypes.update(payload, {
      where: { id: payload.id },
    });
  }

  async destroy(payload) {
    const { ctx } = this;
    return await ctx.model.TaskTypes.destroy({
      where: { id: payload.ids },
    });
  }
}

module.exports = _objectName_Service;