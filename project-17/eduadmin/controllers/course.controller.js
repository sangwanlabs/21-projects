import Course from "../models/course.model.js";

export const createCourse = async (req, res) => {
  const course = await Course.create({
    title: req.body.title,
    description: req.body.description,
    instructor: req.user._id,
  });

  res.status(201).json(course);
};

export const getCourses = async (req, res) => {
  const courses = await Course.find().populate("instructor", "name email");
  res.json(courses);
};
