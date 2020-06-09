import { Op } from 'sequelize';
import { parseISO } from 'date-fns';

import ServiceType from '../models/ServiceType';

class ServiceTypeController {
  // Lista os tipos de Serviços
  async index(req, res) {
    const {
      name,
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

    const data = await ServiceType.findAll({
      where,
      order,
      limit,
      offset: limit * page - limit,
    });
    return res.json(data);
  }

  // Recupera um tipo de serviço
  async show(req, res) {
    const serviceType = await ServiceType.findByPk(req.params.id);

    if (!serviceType) {
      return res.status(404).json();
    }
    return res.json(serviceType);
  }

  // Cria um tipo de serviço
  async store(req, res) {
    const serviceType = await ServiceType.create(req.body);

    return res.status(201).json(serviceType);
  }

  // Atualiza um tipo de serviço
  async update(req, res) {
    const serviceType = await ServiceType.findByPk(req.params.id);

    if (!serviceType) {
      return res.status(404).json();
    }

    await serviceType.update(req.body);

    return res.json(serviceType);
  }

  // Exclui um tipo de serviço
  async delete(req, res) {
    const serviceType = await ServiceType.findByPk(req.params.id);

    if (!serviceType) {
      return res.status(404).json();
    }

    await serviceType.destroy();
    return res.json();
  }
}

export default new ServiceTypeController();
