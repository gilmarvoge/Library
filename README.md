Fake Mock API Endpoints:
https://5fbcdf9f3f8f90001638c61a.mockapi.io/users
https://5fbcdf9f3f8f90001638c61a.mockapi.io/books
https://5fbcdf9f3f8f90001638c61a.mockapi.io/rents

Passos para executar app:
- npm install
- npm start

Usuário para login, caso não deseje criar um novo :
 Usuário: admin
 Senha: admin
  
Passos para executar os teste unitários do app:
- npm test

Docker
buildar a imagem
docker build -t sample:dev .
 criar o container 
docker run -v ${PWD}:/app -v /app/node_modules -p 3001:3000 --rm sample:dev
localhost:3001/