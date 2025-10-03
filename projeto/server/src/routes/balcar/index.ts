
import express from "express";
import fluxoinpe from "./fluxoinpe.routes";
import campanha from "./campanha.routes";
import instituicao from "./instituicao.routes";
import sitio from "./sitio.routes";
import reservatorio from "./reservatorio.routes";
import tabelacampo from "./tabelacampo.routes";

const router = express.Router();

router.use("/fluxoinpe", fluxoinpe);
router.use("/campanha", campanha);
router.use("/instituicao", instituicao);
router.use("/sitio", sitio);
router.use("/reservatorio", reservatorio);
router.use("/tabelacampo", tabelacampo);

export default router;

