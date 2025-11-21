# Imagem oficial do Puppeteer com Chrome já configurado
FROM ghcr.io/puppeteer/puppeteer:22

# Usamos root para instalar dependências
USER root

# Diretório base do app
WORKDIR /usr/src/app

# Copia apenas a pasta scraper para dentro do container
COPY scraper ./scraper

# Copia o config.ini para dentro do container
COPY config.ini ./config.ini

# Instala dependências DENTRO da pasta /usr/src/app/scraper
WORKDIR /usr/src/app/scraper
RUN npm install --omit=dev

# Ajusta permissões para rodar com o usuário padrão do Puppeteer
RUN chown -R pptruser:pptruser /usr/src/app

# Volta a rodar como usuário normal
USER pptruser

# Comando padrão: rodar o scraper
CMD ["node", "scraper.js"]
