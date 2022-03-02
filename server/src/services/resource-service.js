const models = require("../models/data-models");
const {
  ResourceViewModel,
} = require("../models/view-models/resource-view-model");
const { NotFound } = require("../common/errors");

const Model = models.Resource;

const getAll = async () => {
  const items = await Model.find();
  const viewModels = items.map((item) => ResourceViewModel.convert(item));
  return viewModels;
};

const save = async (resource) => {
  const model = await Model.createNew(resource);
  const savedItem = await model.save();
  return savedItem._id;
};

const update = async (resource) => {
  const { id } = resource;
  const model = await Model.findById(id);
  if (model) {
    model.name = resource.name;
    model.updatedAt = Date.now().toString();
    model.save();
    return model._id;
  }
  throw new NotFound(`Resource not found by the id: ${id}`);
};

const deleteById = async (id) => {
  const model = await Model.findById(id);
  if (model) {
    const result = await Model.deleteOne({ _id: id });
    return result;
  }

  throw new NotFound(`Resource not found by the id: ${id}`);
};
const getById = async (id) => {
  const model = await Model.findById(id);
  const viewModel = ResourceViewModel.convert(model);
  return viewModel;
};

module.exports = { getAll, save, update, deleteById, getById };
