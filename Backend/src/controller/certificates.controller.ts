import { Request, Response } from "express";
import { Certificate } from "../entity/certificates.entity";
import { AppDataSource } from "../core/database-config";

// 1. Get all certificates (with pagination)
export const Certificates = async (req: Request, res: Response) => {
    try {
        const take = 50;
        const page = parseInt((req.query.page as string) || "1");

        const repository = AppDataSource.getRepository(Certificate);

        const [data, total] = await repository.findAndCount({
            take,
            skip: (page - 1) * take,
            order: {
                N_T_M_Certificate_ID: "DESC"
            }
        });

        res.send({
            data,
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        });

    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

// 2. Get active certificates only (for frontend display)
export const ActiveCertificates = async (req: Request, res: Response) => {
    try {
        const repository = AppDataSource.getRepository(Certificate);

        const data = await repository.find({
            where: {
                B_Active: 1
            },
            order: {
                N_T_M_Certificate_ID: "DESC"
            }
        });

        if(data.length>0){
            res.send({
                success: true,
                success_code: 200,
                data
            });
        }
        else{
             res.send({
                success: false,
                success_code: 201,
                data
            });
        }

        

    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

// 3. Get single certificate (for edit/view)
export const GetCertificate = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);

        const repository = AppDataSource.getRepository(Certificate);

        const certificate = await repository.findOne({
            where: { N_T_M_Certificate_ID: id }
        });

        if (!certificate) {
            return res.status(404).json({
                message: "Certificate not found"
            });
        }

        res.send({
            data: certificate
        });

    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};