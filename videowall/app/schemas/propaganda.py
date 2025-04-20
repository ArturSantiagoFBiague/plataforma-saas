from pydantic import BaseModel # type: ignore
from uuid import UUID
from typing import List, Optional
from datetime import datetime


class PropagandaCreate(BaseModel):
    empresa_id: UUID
    titulo: str
    descricao: str | None = None

class PropagandaCuradoria(BaseModel):
    id: UUID
    status: str  # "APROVADA" ou "REJEITADA"
    inicio_exibicao: Optional[datetime] = None
    fim_exibicao: Optional[datetime] = None
    prioridade: Optional[int] = 2  # padrão = média
    frequencia: Optional[int] = 1  # padrão = 1


class PropagandaOut(BaseModel):
    id: UUID
    empresa_id: UUID
    titulo: str
    descricao: str
    imagem_caminho: str
    status: str
    criado_em: datetime
    atualizado_em: datetime

    class Config:
        orm_mode = True