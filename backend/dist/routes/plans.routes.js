"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const plans_controller_1 = require("../controllers/plans.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticateToken); // Todas as rotas protegidas
router.get('/', plans_controller_1.getPlans);
router.get('/:id', plans_controller_1.getPlanById);
router.post('/', plans_controller_1.createPlan);
router.put('/:id', plans_controller_1.updatePlan);
router.delete('/:id', plans_controller_1.deletePlan);
exports.default = router;
