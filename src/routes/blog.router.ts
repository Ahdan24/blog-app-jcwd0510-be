import { Router } from "express";
import { getSamplesController } from "../controllers/sample.controller";
import { getBlogsController } from "../controllers/blog.controller";

const router = Router();

router.get("/", getBlogsController);

export default router;
