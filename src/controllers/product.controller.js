const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAll = async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
};

const getById = async (req, res) => {
  const product = await prisma.product.findUnique({ 
    where: { id: parseInt(req.params.id) } 
  });
  res.json(product);
};

const create = async (req, res) => {
  const product = await prisma.product.create({ data: req.body });
  res.status(201).json(product);
};

const update = async (req, res) => {
  const product = await prisma.product.update({ 
    where: { id: parseInt(req.params.id) }, 
    data: req.body 
  });
  res.json(product);
};

const del = async (req, res) => {
  await prisma.product.delete({ where: { id: parseInt(req.params.id) } });
  res.json({ message: 'deleted' });
};

module.exports = { getAll, getById, create, update, delete: del };