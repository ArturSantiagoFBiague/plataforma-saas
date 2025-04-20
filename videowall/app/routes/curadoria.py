# app/routes/curadoria.py
from fastapi import APIRouter, HTTPException, Depends  # type: ignore
from sqlalchemy.orm import Session # type: ignore
from sqlalchemy import text # type: ignore
from app.models import model
from app.schemas import propaganda
from app.database import SessionLocal
from typing import List
from datetime import datetime

router = APIRouter()
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Rota para listar todas as propagandas com status PENDENTE
@router.get("/propagandas/pendentes")
async def listar_propagandas_pendentes(db: Session = Depends(get_db)):
    propagandas_pendentes = db.query(model.Propaganda).filter(model.Propaganda.status == "PENDENTE").all()
    
    if not propagandas_pendentes:
        raise HTTPException(status_code=404, detail="Nenhuma propaganda pendente encontrada.")
    
    return propagandas_pendentes


# app/routes/curadoria.py

@router.post("/propagandas/curadoria")
async def curadoria_propagandas(payload: List[propaganda.PropagandaCuradoria], db: Session = Depends(get_db)):
    for item in payload:
        propaganda = db.query(model.Propaganda).filter(model.Propaganda.id == item.id).first()
        if not propaganda:
            continue  # Skip if propaganda not found

        # Update status
        propaganda.status = item.status
        propaganda.atualizado_em = datetime.utcnow()  # Using Python's datetime
        db.commit()

        # If approved, create display data
        if item.status == "APROVADA":
            dados_exibicao = model.dados_exibicao(
                propaganda_id=item.id,
                inicio_exibicao=item.inicio_exibicao,
                fim_exibicao=item.fim_exibicao,
                prioridade=item.prioridade if item.prioridade else 2,
                frequencia=item.frequencia if item.frequencia else 1,
            )
            db.add(dados_exibicao)
            db.commit()

    return {"message": "Curadoria concluída com sucesso!"}