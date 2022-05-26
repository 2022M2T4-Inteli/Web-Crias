const express = require('express'); 
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'DataBase/BancoHurb.db';

const hostname = '127.0.0.1';
const port = 5555;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.get('/getPartnerName', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = `SELECT
                    Parceiro.Razao AS RazaoSocial
                FROM Parceiro
                Where Parceiro.id = 1`;
    
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});


app.get('/getPartialPartnerData', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = `SELECT
                    Parceiro.id,
                    Parceiro.Razao AS RazaoSocial,
                    Parceiro.Celular AS Celular,
                    Endereco.Estado AS Estado
                FROM Parceiro
                    INNER JOIN Endereco ON Endereco.Parceiro_id = Parceiro.id`;
    
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

app.get('/getPartnerData', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = `SELECT
                    Parceiro.id,
                    Parceiro.Razao AS RazaoSocial,
                    Parceiro.CNPJ AS CNPJ,
                    Parceiro.Celular AS Celular,
                    Endereco.Logradouro AS Logradouro,
                    Endereco.Nome AS NomedaRua,
                    Endereco.Numero AS NúmerodaRua,
                    Endereco.Bairro AS Bairro,
                    Endereco.Estado AS Estado,
                    Endereco.CEP AS CEP,
                    ContaBancaria.TitularDaConta AS TitulardaConta,
                    ContaBancaria.NumeroDaConta AS NúmerodaConta,
                    ContaBancaria.Agencia AS Agência
                FROM Parceiro
                    INNER JOIN Endereco ON Endereco.Parceiro_id = Parceiro.id
                    INNER JOIN ContaBancaria ON ContaBancaria.Parceiro_id = Parceiro.id;`;
    
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

app.post('/postPartnerData', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = `INSERT INTO Parceiro (razao, cnpj, celular)
                VALUES 
                    (?, ?, ?)`
    
    let param = [];
    param.push(req.body.razao, req.body.cnpj, req.body.celular);

	db.all(sql, param,  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});