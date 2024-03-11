import asyncHandler from "../middlewares/asyncHandler.js";
import categoryModel from "../models/course/category.model.js";
import CourseTypeModel from "../models/course/courseType.models.js";
import CourseModel from "../models/course/courses.models.js";
import NumberOfYearsModel from "../models/course/numberOfYears.models.js";

export const createCourseController = asyncHandler(async (req, res, next) => {
  try {
    const { title, description, tags } = req.body;
    console.log(title, description, tags, req.user._id);
    let course = new CourseModel({
      title: title,
      description: description,
      tags: tags,
      createdBy: req.user._id,
    });
    await course.save();
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// ---------------------------Course Category Controller -------------------------
export const createCourseCategoryController = asyncHandler(
  async (req, res, next) => {
    try {
      const { category } = req.body;
      let newCategory = new categoryModel({ category, user: req.user._id });
      await newCategory.save();
      res.status(200).json(newCategory);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

// ============================= Course Type Controllers =======================================
export const createCourseTypeController = asyncHandler(
  async (req, res, next) => {
    try {
      const { courseType } = req.body;
      let newCourseType = new CourseTypeModel({
        courseType,
        user: req.user._id,
      });
      await newCourseType.save();
      res.status(200).json(newCourseType);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

export const getCourseTypeController = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    let courseType = await CourseTypeModel.findById(id);

    res.status(200).json(courseType);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export const updateCourseTypeController = asyncHandler(
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { courseType } = req.body;
      let olCourseType = await CourseTypeModel.findById(id);
      olCourseType.courseType = courseType || olCourseType.courseType;
      olCourseType.user = req.user._id || olCourseType.user;
      await olCourseType.save();
      res.status(200).json(olCourseType); // Corrected to olCourseType
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);
export const deleteCourseTypeController = asyncHandler(
  async (req, res, next) => {
    try {
      const { id } = req.params;
      //console.log(id);
      let deletedCourseType = await CourseTypeModel.findByIdAndDelete(id);
      res.status(200).json(deletedCourseType);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

// ============================= Course Number of Years  Controllers =======================================
export const createCourseNumberOfYearController = asyncHandler(
  async (req, res, next) => {
    try {
      const { numberOfYears } = req.body;
      let newCourseNumberOfYears = new NumberOfYearsModel({
        numberOfYears,
        user: req.user._id,
      });
      await newCourseNumberOfYears.save();
      res.status(200).json(newCourseNumberOfYears);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);
export const getSingleNumberOfYearsController = asyncHandler(
  async (req, res, next) => {
    try {
      let result = await NumberOfYearsModel.findById(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);
export const deleteNumberOfYearsCourseController = asyncHandler(
  async (req, res, next) => {
    try {
      let result = await NumberOfYearsModel.findByIdAndDelete(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

export const updateNumberOfYearsCourseController = asyncHandler(
  async (req, res, next) => {
    try {
      const { numberOfYears } = req.body;
      let result = await NumberOfYearsModel.findById(req.params.id);
      result.numberOfYears = numberOfYears || result.numberOfYears;
      result.user = req.user._id || result.user;
      let updated = await result.save();
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);
