"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticateToken); // Todas as rotas protegidas
router.get('/', users_controller_1.getUsers);
router.get('/:id', users_controller_1.getUserById);
router.put('/:id', users_controller_1.updateUser);
router.delete('/:id', users_controller_1.deleteUser);
exports.default = router;
