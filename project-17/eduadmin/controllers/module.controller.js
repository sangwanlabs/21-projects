import Module from "../models/module.model.js";

export const createModule = async (req, res) => {
  const module = await Module.create({
    title: req.body.title,
    course: req.body.courseId,
  });

  res.status(201).json(module);
};

export const getModules = async (req, res) => {
  const modules = await Module.find({ course: req.params.courseId });
  res.json(modules);
};
