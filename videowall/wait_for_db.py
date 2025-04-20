import time
import psycopg2
import os

def wait_for_db():
    while True:
        try:
            print("⏳ tentando se conectar no banco...")
            conn = psycopg2.connect(
                dbname="plataforma",
                user="saas",
                password="senha_segura",
                host="172.17.0.1",
                port="5432"
            )
            conn.close()
            print("✅ Banco de dados está pronto!")
            break
        except psycopg2.OperationalError:
            print("⏳ Banco de dados não está pronto ainda. Aguardando 2 segundos...")
            time.sleep(2)

if __name__ == "__main__":
    wait_for_db()
