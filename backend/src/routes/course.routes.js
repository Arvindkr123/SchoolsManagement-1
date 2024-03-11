import { Router } from "express";
import {
  createCourseController,
  createCourseCategoryController,
  createCourseTypeController,
  getCourseTypeController,
  updateCourseTypeController,
  deleteCourseTypeController,
  createCourseNumberOfYearController,
  getSingleNumberOfYearsController,
  updateNumberOfYearsCourseController,
  deleteNumberOfYearsCourseController,
} from "../controllers/course.controllers.js";
import { requireSignIn } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(requireSignIn, createCourseController);

//  Add Course Category
router
  .route("/addCategory")
  .post(requireSignIn, createCourseCategoryController);

// Add course Type
router.route("/courseType").post(requireSignIn, createCourseTypeController);
router
  .route("/courseType/:id")
  .get(getCourseTypeController)
  .put(requireSignIn, updateCourseTypeController)
  .delete(requireSignIn, deleteCourseTypeController);

// Add Course Number of Years
router
  .route("/numberOfYears")
  .post(requireSignIn, createCourseNumberOfYearController);
router
  .route("/numberOfYears/:id")
  .get(getSingleNumberOfYearsController)
  .put(requireSignIn, updateNumberOfYearsCourseController)
  .delete(requireSignIn, deleteNumberOfYearsCourseController);

export default router;
