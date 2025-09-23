import { Router } from "express";
import { getAll, getById } from "../../controllers/furnas/abioticocoluna.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:id", getById);

export default router;
