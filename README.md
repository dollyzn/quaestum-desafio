# Quaestum desafio

## Configuração do Backend

1. Clone o repositório

```bash
git clone https://github.com/dollyzn/quaestum-desafio
```

2. Entre na pasta do backend

```bash
cd backend
```

3. Instale as dependências

```bash
yarn install
```

4. Configure as variáveis de ambiente de acordo com o exemplo:

```env
FRONTEND_URL=http://localhost:3000
PORT=8080

DATABASE_URL="mysql://johndoe:randompassword@localhost:3306/mydb"

JWT_SECRET="your secret here"

COOKIE_SECRET="your secret here"
```

5. Crie o banco de dados

Certifique-se de que o seu servidor MySQL esteja em execução e crie o banco de dados especificado no arquivo `.env`.

6. Execute as migrações seed e generate do prisma:

```bash
npx prisma migrate dev

npx prisma db seed

npx prisma generate
```

7. Inicie o servidor backend

```bash
yarn start:dev
```

## Configuração do Frontend

1. Acesse a pasta do frontend e instale as dependências:

```bash
yarn install
```

2. Execute o frontend

```bash
yarn dev
```

Agora o aplicativo está em execução. Abra um navegador e acesse http://localhost:3000 para ver o aplicativo em funcionamento.

O email e a senha padrão para acessar a aplicação são:

Email: nata@example.com <br>
Senha: admin123
