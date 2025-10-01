<<<<<<< HEAD
import { Request, Response } from "express";
import { simaPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

// Mapeamento
const mapRowToSima = (row: any) => ({
    idsima: row.idsima,
    datahora: row.datahora,

    // Dados de medição
    regno: row.regno,
    nofsamples: row.nofsamples,
    proamag: row.proamag,
    dirvt: row.dirvt,
    intensvt: row.intensvt,
    u_vel: row.u_vel,
    v_vel: row.v_vel,
    tempag1: row.tempag1,
    tempag2: row.tempag2,
    tempag3: row.tempag3,
    tempag4: row.tempag4,
    tempar: row.tempar,
    ur: row.ur,
    tempar_r: row.tempar_r,
    pressatm: row.pressatm,
    radincid: row.radincid,
    radrefl: row.radrefl,
    bateria: row.bateria,
    sonda_temp: row.sonda_temp,
    sonda_cond: row.sonda_cond,
    sonda_DOsat: row.sonda_dosat,
    sonda_DO: row.sonda_do,
    sonda_pH: row.sonda_ph,
    sonda_NH4: row.sonda_nh4,
    sonda_NO3: row.sonda_no3,
    sonda_turb: row.sonda_turb,
    sonda_chl: row.sonda_chl,
    sonda_bateria: row.sonda_bateria,
    corr_norte: row.corr_norte,
    corr_leste: row.corr_leste,
    co2_low: row.co2_low,
    co2_high: row.co2_high,
    precipitacao: row.precipitacao,

    // Objeto Aninhado para a Estação
    estacao: row.idestacao
        ? {
            idestacao: row.idestacao,
            rotulo: row.estacao_rotulo,
            lat: row.estacao_lat,
            lng: row.estacao_lng,
            inicio: row.estacao_inicio,
            fim: row.estacao_fim,
        }
        : undefined,
});

// getAll
export const getAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || PAGE_SIZE;
        const offset = (page - 1) * limit;

        const result = await simaPool.query(
            `
            SELECT 
                a.*,
                b.idestacao,
                b.rotulo AS estacao_rotulo,
                b.lat AS estacao_lat,
                b.lng AS estacao_lng
            FROM tbsima a
            LEFT JOIN tbestacao b ON a.idestacao = b.idestacao
            ORDER BY a.datahora DESC
            LIMIT $1 OFFSET $2
            `,
            [limit, offset],
        );

        const countResult = await simaPool.query("SELECT COUNT(*) FROM tbsima");
        const total = Number(countResult.rows[0].count);

        // Mapeia o resultado para o padrão aninhado
        const data = result.rows.map(mapRowToSima);

        res.status(200).json({
            success: true,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data,
        });

    } catch (error: any) {
        logger.error("Erro ao consultar tbsima", {
            message: error.message,
            stack: error.stack,
        });
        res.status(500).json({
            success: false,
            error: "Erro ao realizar operação.", 
        });
    }
};

// getById
export const getById = async (req: Request, res: Response): Promise<void> => {
    try {
        const idsima = Number(req.params.idsima);
        if (isNaN(idsima)) {
            // PADRÃO APLICADO
            res.status(400).json({ success: false, error: `ID ${req.params.idsima} inválido.` });
            return;
        }

        const result = await simaPool.query(
            `
            SELECT 
                a.*,
                b.idestacao,
                b.rotulo AS estacao_rotulo,
                b.lat AS estacao_lat,
                b.lng AS estacao_lng,
                b.inicio AS estacao_inicio,
                b.fim AS estacao_fim
            FROM tbsima a
            LEFT JOIN tbestacao b ON a.idestacao = b.idestacao
            WHERE a.idsima = $1
            `,
            [idsima],
        );

        if (result.rows.length === 0) {
            res.status(404).json({ success: false, error: "Registro de dados SIMA não encontrado.", });
            return;
        }

        // Mapeia o resultado único para o padrão aninhado
        const data = mapRowToSima(result.rows[0]);

        res.status(200).json({ success: true, data, });

    } catch (error: any) {
        logger.error(`Erro ao consultar registro por ID na tabela tbsima: ${req.params.idsima}`, {
            message: error.message, stack: error.stack,
        });
        res.status(500).json({
            success: false,
            error: "Erro ao realizar operação.", 
        });
    }
};
=======
import { Request, Response } from "express";
import { simaPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // consulta com paginação
    const result = await simaPool.query(
      `
      SELECT 
        idsima,
        idestacao,
        datahora,
        regno,
        nofsamples,
        proamag,
        dirvt,
        intensvt,
        u_vel,
        v_vel,
        tempag1,
        tempag2,
        tempag3,
        tempag4,
        tempar,
        ur,
        tempar_r,
        pressatm,
        radincid,
        radrefl,
        bateria,
        sonda_temp,
        sonda_cond,
        sonda_DOsat,
        sonda_DO,
        sonda_pH,
        sonda_NH4,
        sonda_NO3,
        sonda_turb,
        sonda_chl,
        sonda_bateria,
        corr_norte,
        corr_leste,
        co2_low,
        co2_high,
        precipitacao
      FROM tbsima
      ORDER BY datahora DESC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    // total de registros
    const countResult = await simaPool.query("SELECT COUNT(*) FROM tbsima");
    const total = Number(countResult.rows[0].count);

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: result.rows,
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbsima", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};

export const getEstacoes = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await simaPool.query(
      `
      SELECT 
        idestacao,
        rotulo,
        lat,
        lng,
        inicio,
        fim
      FROM tbestacao
      ORDER BY rotulo
      `,
    );

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbsima", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};

export const getByEstacao = async (req: Request, res: Response): Promise<void> => {
  try {
    const idestacao = Number(req.query.idestacao) || "32445";
    const inicio = req.query.inicio || "2000-01-01";
    const fim = req.query.fim || "2020-01-01";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // consulta com paginação
    const result = await simaPool.query(
      `
      SELECT 
        idsima,
        idestacao,
        datahora,
        regno,
        nofsamples,
        proamag,
        dirvt,
        intensvt,
        u_vel,
        v_vel,
        tempag1,
        tempag2,
        tempag3,
        tempag4,
        tempar,
        ur,
        tempar_r,
        pressatm,
        radincid,
        radrefl,
        bateria,
        sonda_temp,
        sonda_cond,
        sonda_DOsat,
        sonda_DO,
        sonda_pH,
        sonda_NH4,
        sonda_NO3,
        sonda_turb,
        sonda_chl,
        sonda_bateria,
        corr_norte,
        corr_leste,
        co2_low,
        co2_high,
        precipitacao
      FROM tbsima
      WHERE idestacao = $1 AND datahora >= $2 AND datahora <= $3
      ORDER BY datahora DESC
      LIMIT $4 OFFSET $5
      `,
      [idestacao, inicio, fim, limit, offset],
    );

    // total de registros
    const countResult = await simaPool.query(
      "SELECT COUNT(*) FROM tbsima WHERE idestacao = $1 AND datahora >= $2 AND datahora <= $3",
      [idestacao, inicio, fim],
    );
    const total = Number(countResult.rows[0].count);

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      inicio,
      fim,
      totalPages: Math.ceil(total / limit),
      data: result.rows,
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbsima", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
>>>>>>> 5494df092a3a68cb3749465d78683a7c59e8e092
