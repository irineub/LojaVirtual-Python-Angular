## Para rodar a aplicação, siga os passos abaixo:

1. Clone o repositório:

   - git clone https://github.com/irineub/desafioTecnico-IBBI-APP.git
   
   - cd desafioTecnico-IBBI-APP


3. Inicie os containers usando Docker Compose:

   - docker-compose up --build

4. Acesse a aplicação:
   
    - O Frontend que eu desenvolvi usando angular vai estar rodando em: `http://localhost:4200`
    - O Backend desenvolvido com python vai está rodando em : `http://localhost:80`
      
## Demonstração
- Clique para assistir um video de demonstração:
- [![Assista uma demonstração](https://img.youtube.com/vi/QdSKtQYHkTU/0.jpg)](https://www.youtube.com/watch?v=QdSKtQYHkTU)

## Aplicação Desenvolvida por Irineu Brito usando Angular para o frontend e Python para o backend
- Rodando em docker
### Backend
- Feito em python
- Usado Alembic para fazer as migrações, criar tabelas no banco.
- Feito alguns testes
- Banco de dados Postgres
- SqlAlchemy como ORM para comunicação com o banco
- Autenticação dos endpoints utilizando JWT

### Frontend
- Autenticação dos endpoints utilizando JWT
- feito em Angular versão 18
- utilizado angular material
- utilizado bibliotecas exibir graficos
- utilizado api publica para cotação do dolar
- utilizado pre processador de CSS SASS




