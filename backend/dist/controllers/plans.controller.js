"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlan = exports.updatePlan = exports.createPlan = exports.getPlanById = exports.getPlans = exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
const getPlans = async (_, res) => {
    try {
        const plans = await exports.prisma.plan.findMany();
        res.json(plans);
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao buscar planos', error: err });
    }
};
exports.getPlans = getPlans;
const getPlanById = async (req, res) => {
    const { id } = req.params;
    try {
        const plan = await exports.prisma.plan.findUnique({ where: { id } });
        if (!plan)
            return res.status(404).json({ message: 'Plano não encontrado' });
        res.json(plan);
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao buscar plano', error: err });
    }
};
exports.getPlanById = getPlanById;
const createPlan = async (req, res) => {
    const data = req.body;
    try {
        const newPlan = await exports.prisma.plan.create({ data });
        res.status(201).json(newPlan);
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao criar plano', error: err });
    }
};
exports.createPlan = createPlan;
const updatePlan = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const updated = await exports.prisma.plan.update({
            where: { id },
            data,
        });
        res.json(updated);
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao atualizar plano', error: err });
    }
};
exports.updatePlan = updatePlan;
const deletePlan = async (req, res) => {
    const { id } = req.params;
    try {
        await exports.prisma.plan.delete({ where: { id } });
        res.status(204).send();
    }
    catch (err) {
        res.status(500).json({ message: 'Erro ao deletar plano', error: err });
    }
};
exports.deletePlan = deletePlan;
