const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function testConnection() {
  try {
    const ca = fs.readFileSync(path.join(__dirname, 'ca.pem'), 'utf8');
    
    const connection = await mysql.createConnection({
      host: 'gateway01.ap-southeast-1.prod.alicloud.tidbcloud.com',
      user: '3hzcNaomAyHbLAF.root',
      password: '92qPh9ktS5LMFw3r',
      database: 'sys',
      port: 4000,
      ssl: {
        ca: ca,
        rejectUnauthorized: true
      }
    });
    
    console.log('✅ Connected to TiDB successfully!');
    
    const [rows] = await connection.query('SELECT 1 as test');
    console.log('✅ Query test passed:', rows);
    
    await connection.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testConnection();
