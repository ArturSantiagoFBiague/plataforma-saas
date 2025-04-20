from app.config import UPLOAD_DIR
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.models.model import Propaganda, Empresa
import os
import shutil

def criar_propaganda(db: Session, propaganda_data, file):
    # Verificar se a empresa existe
    empresa = db.query(Empresa).filter(Empresa.id == propaganda_data.empresa_id).first()
    if not empresa:
        raise ValueError(f"Empresa com id {propaganda_data.empresa_id} não existe.")
    
    # Salvar imagem
    file_location = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)

    # Criar no banco
    nova_propaganda = Propaganda(
        empresa_id=propaganda_data.empresa_id,
        titulo=propaganda_data.titulo,
        descricao=propaganda_data.descricao,
        imagem_caminho=file_location,
    )
    db.add(nova_propaganda)
    
    try:
        db.commit()
        db.refresh(nova_propaganda)
    except IntegrityError as e:
        db.rollback()
        raise ValueError(f"Erro de integridade: {str(e)}")
    
    return nova_propaganda
