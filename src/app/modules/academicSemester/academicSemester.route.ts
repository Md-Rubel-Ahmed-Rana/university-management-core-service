import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterController } from "./academicSemester.controller";
import { AcademicSemesterValidator } from "./academicSemester.validator";

const router = Router();

router.post("/", validateRequest(AcademicSemesterValidator.createZod) , AcademicSemesterController.insertIntoDB);


export const AcademicSemesterRoutes = router