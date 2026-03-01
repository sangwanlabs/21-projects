import Lesson from "../models/lesson.model.js";

export const createLesson = async (req, res) => {
  const lesson = await Lesson.create({
    title: req.body.title,
    content: req.body.content,
    module: req.body.moduleId,
  });

  res.status(201).json(lesson);
};

export const getLessons = async (req, res) => {
  const lessons = await Lesson.find({ module: req.params.moduleId });
  res.json(lessons);
};
