
import { Router } from "express";
import { getAll, getById } from "../../controllers/balcar/fluxoInpe.routes";

const router = Router();

router.get("/all", getAll);
router.get("/:id", getById);

export default router;

