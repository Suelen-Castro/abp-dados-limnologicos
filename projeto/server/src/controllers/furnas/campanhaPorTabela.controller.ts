import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

// Mapeamento
const mapRowToCampanhaPorTabela = (row: any) => ({
    idCampanha: row.idcampanha,
    idTabela: row.idtabela,

    // Objeto Aninhado para a Campanha
    campanha: row.idcampanha ? {
        idcampanha: row.idcampanha,
        nroCampanha: row.nrocampanha,
        dataInicio: row.campanha_datainicio,
        dataFim: row.campanha_datafim,
        // Informação do Reservatório (somente disponível no getById)
        reservatorio: row.idreservatorio ? {
            idreservatorio: row.idreservatorio,
            nome: row.reservatorio_nome,
        } : undefined,
    } : undefined,
    
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
                a.idCampanha,
                a.idTabela,
                b.idCampanha AS idcampanha,
                b.nroCampanha,
                c.idTabela AS idtabela,
                c.nome AS tabela_nome,
                c.rotulo AS tabela_rotulo
            FROM tbcampanhaportabela a
            LEFT JOIN tbcampanha b ON a.idCampanha = b.idCampanha
            LEFT JOIN tbtabela c ON a.idTabela = c.idTabela
            ORDER BY b.nroCampanha DESC, c.nome
            LIMIT $1 OFFSET $2
            `, [limit, offset],
        );

        const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbcampanhaportabela");
        const total = Number(countResult.rows[0].count);

        // Mapeia o resultado para o padrão aninhado, mantendo a listagem concisa
        const data = result.rows.map((row: any) => ({
            ...mapRowToCampanhaPorTabela(row),
            campanha: row.idcampanha ? { idcampanha: row.idcampanha, nroCampanha: row.nrocampanha } : undefined,
            tabela: row.idtabela ? { idTabela: row.idtabela, nome: row.tabela_nome, rotulo: row.tabela_rotulo } : undefined,
        }));


        res.status(200).json({
            success: true,
            page, limit, total,
            totalPages: Math.ceil(total / limit),
            data,
        });

    }   catch(error:any){
        logger.error('Erro ao buscar relações Campanha por Tabela:', {message: error.message, stack: error.stack,});

        res.status(500).json({success: false, error: "Erro ao realizar operação.",});
    }
};


export const getById = async (req: Request, res: Response): Promise<void> => {
    try{
        const idCampanha = Number(req.params.idCampanha);
        const idTabela = Number(req.params.idTabela);

        if(isNaN(idCampanha) || isNaN(idTabela)){
            res.status(400).json({success: false, error: `IDs ${req.params.idCampanha}/${req.params.idTabela} inválidos.`,});
            return;
        }

        const result = await furnasPool.query(
            `
            SELECT 
                a.idCampanha,
                a.idTabela,
                b.idCampanha AS idcampanha,
                b.nroCampanha,
                b.dataInicio AS campanha_datainicio,
                b.dataFim AS campanha_datafim,
                b.idReservatorio AS idreservatorio,
                c.idTabela AS idtabela,
                c.nome AS tabela_nome,
                c.rotulo AS tabela_rotulo,
                c.excecao AS tabela_excecao,
                c.sitio AS tabela_sitio,
                c.campanha AS tabela_campanha,
                d.nome AS reservatorio_nome
            FROM tbcampanhaportabela a
            LEFT JOIN tbcampanha b ON a.idCampanha = b.idCampanha
            LEFT JOIN tbtabela c ON a.idTabela = c.idTabela
            LEFT JOIN tbreservatorio d ON b.idReservatorio = d.idReservatorio
            WHERE a.idCampanha = $1 AND a.idTabela = $2;
            `, [idCampanha, idTabela],
        );

        if(result.rows.length === 0){
            res.status(404).json({success: false, error: "Registro de relacionamento Campanha-Tabela não encontrado.",});
            return;
        }

        // Mapeia o resultado único para o padrão aninhado
        const data = mapRowToCampanhaPorTabela(result.rows[0]);

        res.status(200).json({success: true, data,});

    }   catch(error:any){
        logger.error(`Erro ao buscar registro por ID composto na tabela tbcampanhaportabela: Campanha ID ${req.params.idCampanha}, Tabela ID ${req.params.idTabela}`, {
            message: error.message, stack: error.stack,});

        res.status(500).json({success: false, error: "Erro ao realizar operação.",});
    }
};