import {Request, Response} from 'express';
import { simaPool } from '../../configs/db';
import { logger } from '../../configs/logger';

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getAll = async (req: Request, res: Response): Promise<void> => {
    try{
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || PAGE_SIZE;
        const offset = (page - 1) * limit;

        // consulta com paginação
        const result = await simaPool.query(
            `
            SELECT *
            FROM tbsensor
                ORDER BY nome
                LIMIT $1 OFFSET $2;
            `,
            [limit, offset],
        );

        // total de registros
        const countResult = await simaPool.query("SELECT COUNT(*) FROM tbsensor");
        const total = Number(countResult.rows[0].count);

        res.status(200).json({success: true, page, limit, total, totalPages: Math.ceil(total / limit), data: result.rows,});

    } catch(error:any){
        logger.error("Erro ao consultar tbsensor", {message: error.message, stack: error.stack,});

        res.status(500).json({success: false, error: "Erro ao realizar operação.",}); 
    }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
    try{
        const idSensor = Number(req.params.idSensor);
        if(isNaN(idSensor)){
            res.status(400).json({success: false, error: `ID ${req.params.idSensor} inválido.`});
            return;
        }

        const result = await simaPool.query(
            `
            SELECT *
            FROM tbsensor
                WHERE idSensor = $1;
            `, [idSensor],
        );

        if(result.rows.length === 0){
            res.status(404).json({success: false, error: "Registro de sensor não encontrado.",});
            return;
        }

        res.status(200).json({success: true, data: result.rows[0],});

    } catch(error:any){
        logger.error(`Erro ao consultar registro por ID na tabela tbsensor: ${req.params.idSensor}`, {message: error.message, stack: error.stack,});

        res.status(500).json({success: false, error: "Erro ao realizar operação.",});
    }
};