<<<<<<< HEAD
import express from "express";
import sima from "./sima.routes";
import simaoffline from "./simaoffline.routes";
import sensor from './sensor.routes';
import estacao from './estacao.routes';
import campotabela from './campoTabela.routes';

const router = express.Router();

router.use("/sima", sima);
router.use("/simaoffline", simaoffline);
router.use("/sensor", sensor);
router.use("/estacao", estacao);
router.use("/campotabela", campotabela);

export default router;
=======
import express from "express";
import sima from "./sima.routes";
import simaoffline from "./simaoffline.routes";

const router = express.Router();

router.use("/sima", sima);
router.use("/simaoffline", simaoffline);

export default router;
>>>>>>> 5494df092a3a68cb3749465d78683a7c59e8e092
