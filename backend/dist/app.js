"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const client_1 = require("@prisma/client");
const express_2 = require("express");
// Carrega variáveis de ambiente do .env
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const router = (0, express_2.Router)();
// Middlewares globais
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
// Teste de conexão com banco
prisma.$connect()
    .then(() => console.log('✅ Banco de dados conectado com sucesso!'))
    .catch((err) => {
    console.error('❌ Erro ao conectar ao banco de dados:', err);
    process.exit(1);
});
// Example route
router.get('/auth', (req, res) => {
    res.json({ message: 'Auth route working!' });
});
// Rotas
app.use('/api', auth_routes_1.default);
// Middleware de rota não encontrada
app.use((req, res) => {
    res.status(404).json({ message: 'Rota não encontrada' });
});
exports.default = app;
