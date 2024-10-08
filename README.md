## Para rodar a aplicação, siga os passos abaixo:

1. Clone o repositório:

   - git clone https://github.com/irineub/desafioTecnico-IBBI-APP.git
   
   - cd desafioTecnico-IBBI-APP


3. Inicie os containers usando Docker Compose:

   - docker-compose up --build

4. Acesse a aplicação:
   
    - O Frontend que eu desenvolvi usando angular vai estar rodando em: `http://localhost:4200`
    - O Backend desenvolvido com python vai está rodando em : `http://localhost:80/docs` acesse para ver a documentação gerada pelo FastAPI

você pode fazer o primeiro login de administrador e cadastrar produtos com :
- usuário: admin
- senha: admin
e você terá acesso a todas as funcionalidades da aplicação 
      
## Demonstração
- Clique para assistir um video de demonstração:
- [![Assista uma demonstração](https://img.youtube.com/vi/QdSKtQYHkTU/0.jpg)](https://www.youtube.com/watch?v=QdSKtQYHkTU)

## Aplicação Desenvolvida por Irineu Brito usando Angular para o frontend e Python para o backend
- Rodando em docker
### Backend
- Feito em python com FastAPI
- Usado Alembic para fazer as migrações, criar tabelas no banco.
- Feito alguns testes
- Banco de dados Postgres
- SqlAlchemy como ORM para comunicação com o banco
- Autenticação dos endpoints utilizando JWT

### Frontend
- Autenticação dos endpoints utilizando JWT
- Proteção e divisão de rotas por token e cargo (Cliente, Vendedor, Admin)
- feito em Angular versão 18
- utilizado angular material
- utilizado bibliotecas exibir graficos
- utilizado api publica para cotação do dolar
- utilizado pre processador de CSS SASS

  ### Funcionalidades - Você pode ver todas em pratica no video acima
  Telas do Frontend
  - Telas Cadastro de Usuario e Login (O usuario cadastrado é um cliente)
  - Tela Inicial Home (Onde o usuario cliente pode ver os produtos para comprar)
  ## Pagina do Vendedor(Somente o cargo Vendedor e Admin tem acesso)
    - Vendedor pode
    - ver os produtos que ele cadastrou bem como suas respectivas quantidades em estoque e o nivel de estoque(Baixo, Em Alerta, Bom)
    - editar, excluir e cadastrar um novo produto alem tambem de poder cadastrar e excluir categorias de produtos.
  ## Paginas de administrador(Somente usuario com o cargo admin tem acesso)
     - Dashboard (Historico de ultimas vendas, grafico de barra com produtos mais vendidos e grafico donut com as categorias mais vendidas)
     - Gerenciamento de Usuarios(administrador pode gerenciar os usuarios cadastrados, pesquisar usuario, editar(cargo e nome de usuario), e apagar usuarios )



