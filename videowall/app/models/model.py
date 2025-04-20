from sqlalchemy import Column, create_engine, MetaData, String, TIMESTAMP, ForeignKey, Integer, Boolean # type: ignore
from sqlalchemy.ext.declarative import declarative_base # type: ignore
from sqlalchemy.dialects.postgresql import UUID # type: ignore
from sqlalchemy.orm import relationship # type: ignore
from pydantic import BaseModel
import uuid
from app.database import Base

metadata = MetaData(schema='novoschema')
Base = declarative_base(metadata=metadata)

class Empresa(Base):
    __tablename__ = "empresas"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    nome = Column(String, nullable=False)
    cnpj = Column(String)
    email = Column(String)
    telefone = Column(String)
    plano_ativo = Column(Boolean, default="True")
    criado_em = Column(TIMESTAMP, server_default="now()")

class Propaganda(Base):
    __tablename__ = "propagandas"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    empresa_id = Column(UUID(as_uuid=True), ForeignKey("empresas.id"), nullable=False)
    titulo = Column(String, nullable=False)
    descricao = Column(String)
    imagem_caminho = Column(String, nullable=False)
    status = Column(String, default="PENDENTE")
    criado_em = Column(TIMESTAMP, server_default="now()")
    atualizado_em = Column(TIMESTAMP, server_default="now()")


class dados_exibicao(Base):
    __tablename__ = "dados_exibicao"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    propaganda_id = Column(UUID(as_uuid=True), ForeignKey("propagandas.id"), nullable=False)
    inicio_exibicao = Column(TIMESTAMP)
    fim_exibicao = Column(TIMESTAMP)
    prioridade = Column(Integer, default=2)  # 1=Alta, 2=Média, 3=Baixa
    frequencia = Column(Integer, default=1)  # Quantas vezes deve aparecer
    criado_em = Column(TIMESTAMP, server_default="now()")

class EmpresaStatusRequest(BaseModel):
    empresa_id: str
    nome: str
    cnpj: str
    email: str
    telefone: str
    plano_ativo: bool

class EmpresaStatusResponse(BaseModel):
    status: str
    empresa_id: str
    plano_ativo: bool

engine = create_engine('postgresql://saas:senha_segura@172.17.0.1:5432/plataforma')
Base.metadata.create_all(engine)
