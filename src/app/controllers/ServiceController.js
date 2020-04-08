import { Op } from 'sequelize';
import { parseISO } from 'date-fns';

import Service from '../models/Service';

class ServiceController {
  // Lista os Services
  async index(req, res) {
    const {
      name,
      tempoPrev,
      valor,
      createdBefore,
      createdAfter,
      updatedBefore,
      updatedAfter,
      sort,
    } = req.query;

    const page = req.query.page || 1;
    const limit = req.query.limit || 25;

    let where = {};
    let order = [];

    if (name) {
      where = {
        ...where,
        name: {
          [Op.iLike]: name,
        },
      };
    }

    if (tempoPrev) {
      where = {
        ...where,
        tempoPrev: {
          [Op.iLike]: tempoPrev,
        },
      };
    }

    if (valor) {
      where = {
        ...where,
        valor: {
          [Op.iLike]: valor,
        },
      };
    }

    if (createdBefore) {
      where = {
        ...where,
        createdAt: {
          [Op.gte]: parseISO(createdBefore),
        },
      };
    }

    if (createdAfter) {
      where = {
        ...where,
        createdAt: {
          [Op.lte]: parseISO(createdAfter),
        },
      };
    }

    if (updatedBefore) {
      where = {
        ...where,
        updatedAt: {
          [Op.gte]: parseISO(updatedBefore),
        },
      };
    }

    if (updatedAfter) {
      where = {
        ...where,
        updatedAt: {
          [Op.lte]: parseISO(updatedAfter),
        },
      };
    }

    if (sort) {
      order = sort.split(',').map(item => item.split(':'));
    }

    const data = await Service.findAll({
      where,
      order,
      limit,
      offset: limit * page - limit,
    });
    return res.json(data);
  }

  // Recupera um Service
  async show(req, res) {
    const service = await Service.findByPk(req.params.id);

    if (!service) {
      return res.status(404).json();
    }
    return res.json(service);
  }

  // Cria um Service
  async store(req, res) {
    const service = await Service.create(req.body);

    return res.status(201).json(service);
  }

  // Atualiza um Service
  async update(req, res) {
    const service = await Service.findByPk(req.params.id);

    if (!service) {
      return res.status(404).json();
    }

    await service.update(req.body);

    return res.json(service);
  }

  // Exclui um Service
  async delete(req, res) {
    const service = await Service.findByPk(req.params.id);

    if (!service) {
      return res.status(404).json();
    }

    await service.destroy();
    return res.json();
  }
}

export default new ServiceController();
