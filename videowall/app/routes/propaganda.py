from typing import List
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException # type: ignore
from sqlalchemy.orm import Session # type: ignore
from app.database import SessionLocal
from app.schemas.propaganda import PropagandaCreate
from datetime import datetime, timedelta
from app.models import model
from app.crud.propaganda import criar_propaganda

from app.schemas import propaganda


router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/propagandas/")
async def criar(empresa_id: str = Form(...),
                titulo: str = Form(...),
                descricao: str = Form(None),
                imagem: UploadFile = File(...),
                db: Session = Depends(get_db)):

    propaganda_data = PropagandaCreate(
        empresa_id=empresa_id,
        titulo=titulo,
        descricao=descricao,
    )
    nova_propaganda = criar_propaganda(db, propaganda_data, imagem)
    return {"id": nova_propaganda.id, "titulo": nova_propaganda.titulo}


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/empresa/status", response_model=model.EmpresaStatusResponse)
async def atualizar_status_empresa(
    request_data: model.EmpresaStatusRequest,
    db: Session = Depends(get_db)
):
    # Log dos dados recebidos
    print("📥 Dados recebidos no videowall:", request_data.dict())
    
    # Extrai os dados do request
    empresa_id = request_data.empresa_id
    nome = request_data.nome
    cnpj = request_data.cnpj
    email = request_data.email
    telefone = request_data.telefone
    plano_ativo = request_data.plano_ativo

    # Verifica se a empresa existe no banco
    empresa = db.query(model.Empresa).filter(model.Empresa.id == empresa_id).first()

    if not empresa:
        # Se a empresa não existe, cria uma nova
        empresa = model.Empresa(
            id=empresa_id,
            nome=nome,
            cnpj=cnpj,
            email=email,
            telefone=telefone,
            plano_ativo=plano_ativo,
            criado_em=datetime.utcnow()
        )
        db.add(empresa)
    else:
        # Caso a empresa já exista, atualiza os dados
        empresa.nome = nome
        empresa.cnpj = cnpj
        empresa.email = email
        empresa.telefone = telefone
        empresa.plano_ativo = plano_ativo

    # Atualiza data de assinatura se o plano estiver ativo
    if plano_ativo:
        empresa.data_ultima_assinatura = datetime.utcnow()
    else:
        empresa.data_ultima_assinatura = None
        # Exclui propagandas associadas se plano inativo
        db.query(model.Propaganda).filter(model.Propaganda.empresa_id == empresa.id).delete()

    db.commit()
    db.refresh(empresa)

    return {
        "status": "ok",
        "empresa_id": str(empresa.id),
        "plano_ativo": empresa.plano_ativo
    }

@router.get("/propagandas/aprovadas", response_model=List[propaganda.PropagandaOut])
async def listar_propagandas_aprovadas(db: Session = Depends(get_db)):
    propagandas = db.query(model.Propaganda).filter(model.Propaganda.status == "APROVADA").all()
    return propagandas

# @router.post("/empresa/delete")
# def excluir_propagandas_inativas(db: Session):
#     # Buscar empresas com plano inativo há mais de 3 meses
#     limite_data = datetime.utcnow() - timedelta(days=90)
#     empresas_inativas = db.query(Empresa).filter(
#         Empresa.plano_ativo == False,
#         Empresa.data_ultima_assinatura < limite_data
#     ).all()

#     for empresa in empresas_inativas:
#         # Excluir propagandas da empresa
#         db.query(Propaganda).filter(Propaganda.empresa_id == empresa.id).delete()

#     db.commit()