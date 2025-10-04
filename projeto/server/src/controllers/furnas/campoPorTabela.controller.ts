import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

// Mapeamento
const mapRowToCampoPorTabela = (row: any) => ({
    idCampoPorTabela: row.idcampoportabela,
    nome: row.nome,
    rotulo: row.rotulo,
    unidade: row.unidade,
    principal: row.principal,
    ordem: row.ordem,
    tipo: row.tipo,
    
    // Objeto Aninhado para a Tabela
    tabela: row.idtabela ? {
        idTabela: row.idtabela,
        nome: row.tabela_nome,
        rotulo: row.tabela_rotulo,
        excecao: row.tabela_excecao,
        sitio: row.tabela_sitio,
        campanha: row.tabela_campanha,
    } : undefined,
});

// getAll
export const getAll = async (req: Request, res: Response): Promise<void> => {
    try{
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || PAGE_SIZE;
        const offset = (page - 1) * limit;

        const result = await furnasPool.query(
            `
            SELECT
                a.idCampoPorTabela,
                a.nome,
                a.rotulo,
                a.unidade,
                a.principal,
                a.ordem,
                a.tipo,
                b.idTabela AS idtabela,
                b.nome AS tabela_nome,
                b.rotulo AS tabela_rotulo
            FROM tbcampoportabela a
            LEFT JOIN tbtabela b ON a.idTabela = b.idTabela
            ORDER BY b.nome, a.ordem
            LIMIT $1 OFFSET $2
            `, [limit, offset],
        );

        const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbcampoportabela");
        const total = Number(countResult.rows[0].count);

        const data = result.rows.map(mapRowToCampoPorTabela);

        res.status(200).json({success: true,
            page, limit, total,
            totalPages: Math.ceil (total / limit),
            data,
        });

    } catch(error:any){
        logger.error('Erro ao buscar campos por tabela:', {message: error.message, stack: error.stack,});
        res.status(500).json({success: false, error: "Erro ao realizar operação."});
    }
};

// getById
export const getById = async (req: Request, res: Response): Promise<void> => {
    try{
        const idCampoPorTabela = Number(req.params.idCampoPorTabela);
        if(isNaN(idCampoPorTabela)){
            res.status(400).json({success: false, error:`ID ${req.params.idCampoPorTabela} inválido.`,});
            return;
        }

        const result = await furnasPool.query(
            `
            SELECT 
                a.*,
                b.idTabela AS idtabela,
                b.nome AS tabela_nome,
                b.rotulo AS tabela_rotulo,
                b.excecao AS tabela_excecao,
                b.sitio AS tabela_sitio,
                b.campanha AS tabela_campanha
            FROM tbcampoportabela a
            LEFT JOIN tbtabela b ON a.idTabela = b.idTabela
            WHERE a.idCampoPorTabela = $1;
            `, [idCampoPorTabela],
        );

        if(result.rows.length === 0){
            res.status(404).json({success: false, error:"Registro de campo por tabela não encontrado.",});
            return;
        }

        const data = mapRowToCampoPorTabela(result.rows[0]);

        res.status(200).json({success:true, data,});

    }   catch(error:any){
        logger.error(`Erro ao buscar registro por ID na tabela campoportabela: ${req.params.idCampoPorTabela}`, {
            message: error.message, stack: error.stack});
        res.status(500).json({success: false, error:"Erro ao realizar operação.",});
    }
};