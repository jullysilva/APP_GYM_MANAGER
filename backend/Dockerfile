# Use uma imagem Node.js oficial como a base da nossa imagem
FROM node:16-alpine

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json (se disponível)
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todos os arquivos do projeto para o diretório de trabalho
COPY . .

# Instale o Prisma Client
RUN npx prisma generate

# Compile o TypeScript para JavaScript
RUN npm run build

# Exponha a porta que o aplicativo usará
EXPOSE 3333

# Comando para rodar a aplicação
CMD ["npm", "start"]
 