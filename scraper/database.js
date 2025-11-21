// scraper/database.js
const mysql = require('mysql2/promise');
const config = require('./config'); 
const logger = require('./logger'); 

let pool;

async function connectMySQL() {
    const host = config.mysql.host;
    const user = config.mysql.user;
    const password = config.mysql.password;
    const database = config.mysql.database;
    const port = config.mysql.port ? Number(config.mysql.port) : 3306;

    logger.info(`⚙️ Conectando ao MySQL em ${host}:${port} (db=${database})...`);

    pool = mysql.createPool({
        host,
        port,               // 👈 agora usa a porta do config.ini
        user,
        password,
        database,
        waitForConnections: true,
        connectionLimit: 10
    });

    logger.info('✅ Banco MySQL conectado (scraper)!');
    return pool;
}

function getPool() {
    if (!pool) throw new Error('MySQL não conectado');
    return pool;
}

module.exports = { connectMySQL, getPool };
