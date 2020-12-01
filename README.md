Fake Mock API Endpoints:
- https://5fbcdf9f3f8f90001638c61a.mockapi.io/users
- https://5fbcdf9f3f8f90001638c61a.mockapi.io/books
- https://5fbcdf9f3f8f90001638c61a.mockapi.io/rents

Passos para executar app:
- npm install
-  <b>npm run dev </b>

Usuário para login, caso não deseje criar um novo :
- Usuário: admin
- Senha: admin
  
Executar os teste unitários do app:
- npm test

Docker em modo de desenvolvimento
- Build imagem do app
- docker build -t library:dev .

Start docker imagem
- docker run -v ${PWD}:/app -v /app/node_modules -p 3001:3000 --rm library:dev

Criar o Container a partir da imagem
- docker-compose up -d --build

Aplicação pelo docker roda no localhost:3001


Docker produção heroku
- docker build -t registry.heroku.com/library-design/web . 
- docker push registry.heroku.com/library-design/web

