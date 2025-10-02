<<<<<<< HEAD
import express from "express";
import abioticocoluna from "./abioticocoluna.routes"
import campanha from "./campanha.routes";
import instituicao from "./instituicao.routes";
import reservatorio from "./reservatorio.routes";
import sitio from "./sitio.routes";
import campanhaPT from './campanhaPorTabela.routes';
import carbono from './carbono.routes';
import campoPT from './campoPorTabela.routes';
import concentracaoGA from './concentracaoGasAgua.routes';
import concentracaoGS from './concentracaoGasSedimento.routes';
import dadosPrecipitacao from './dadosPrecipitacao.routes';
import dadosRepresa from './dadosRepresa.routes';
import difusao from './difusao.routes';
import duplaDA from './duplaDessorcaoAgua.routes';
import fluxoBI from './fluxoBolhasInpe.routes';
import fluxoCarbono from './fluxoCarbono.routes';
import fluxoDifusivo from './fluxoDifusivo.routes';
import fluxoDInpe from './fluxoDifusivoInpe.routes';
import gasesEB from './gasesEmBolhas.routes';
import horiba from './horiba.routes';

const router = express.Router();

router.use("/abioticocoluna", abioticocoluna);
router.use("/campanha", campanha);
router.use("/instituicao", instituicao);
router.use("/reservatorio", reservatorio);
router.use("/sitio", sitio);
router.use("/campanhaportabela", campanhaPT);
router.use("/carbono", carbono);
router.use("/campoportabela", campoPT);
router.use("/concentracaogasagua", concentracaoGA);
router.use("/concentracaogassedimento", concentracaoGS);
router.use("/dadosprecipitacao", dadosPrecipitacao);
router.use("/dadosrepresa", dadosRepresa);
router.use("/difusao", difusao);
router.use("/dupladessorcaoagua", duplaDA);
router.use("/fluxobolhasinpe", fluxoBI);
router.use("/fluxocarbono", fluxoCarbono);
router.use("/fluxodifusivo", fluxoDifusivo); 
router.use("/fluxodifusivoinpe", fluxoDInpe);
router.use("/gasesembolhas", gasesEB);
router.use("/horiba", horiba);

export default router;
=======
import express from "express";
import abioticocoluna from "./abioticocoluna.routes";
import campanha from "./campanha.routes";
import instituicao from "./instituicao.routes";
import reservatorio from "./reservatorio.routes";
import sitio from "./sitio.routes";

const router = express.Router();

router.use("/abioticocoluna", abioticocoluna);
router.use("/campanha", campanha);
router.use("/instituicao", instituicao);
router.use("/reservatorio", reservatorio);
router.use("/sitio", sitio);

export default router;
>>>>>>> 5494df092a3a68cb3749465d78683a7c59e8e092
