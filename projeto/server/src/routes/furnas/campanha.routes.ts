<<<<<<< HEAD
import { Router } from "express";
import { getAll, getById } from "../../controllers/furnas/campanha.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idcampanha", getById);

export default router;
=======
import { Router } from "express";
import { getAll } from "../../controllers/furnas/campanha.controller";

const router = Router();

router.get("/all", getAll);

export default router;
>>>>>>> 5494df092a3a68cb3749465d78683a7c59e8e092
