import { Router } from "express";
import { AcademicSemesterController } from "./academicSemester.controller";

const router = Router();

router.post("/", AcademicSemesterController.insertIntoDB);


export const AcademicSemesterRoutes = router