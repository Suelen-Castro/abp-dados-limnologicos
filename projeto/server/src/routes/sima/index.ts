
import express from "express";
import sima from "./sima.routes";
import simaoffline from "./simaOffline.routes";
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

