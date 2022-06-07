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

app.get('/serverStatus')

app.get('/getInvoiceData', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = `SELECT
                    Fatura.id,
					Estabelecimento.id AS IDdoParceiro,
					Estabelecimento.Razao AS NomeDoParceiro,
					TipoAntecipacao.Nome AS TipoAntecipação,
					Fatura.NotaFiscal AS NotaFiscal,
					Fatura.ValorRecebido as ValorRecebido,
					Fatura.ValorTaxado as ValorTaxado,
					Fatura.Data as Data,
					Fatura.Status as Status
                FROM Fatura
                    INNER JOIN Estabelecimento ON Estabelecimento.id = Fatura.Estabelecimento_id
                    INNER JOIN TipoAntecipacao ON TipoAntecipacao.id = Fatura.TipoAntecipacao_id
				WHERE Fatura.Status = "Finalizado"`;
    
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.send(JSON.stringify(rows));
	});
	db.close(); // Fecha o banco
});

app.get('/getPaidInvoiceData', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = `SELECT
                    Fatura.id,
					Estabelecimento.id AS IDdoParceiro,
					Estabelecimento.Razao AS NomeDoParceiro,
					TipoAntecipacao.Nome AS TipoAntecipação,
					Fatura.NotaFiscal AS NotaFiscal,
					Fatura.ValorRecebido as ValorRecebido,
					Fatura.ValorTaxado as ValorTaxado,
					Fatura.Data as Data,
					Fatura.Status as Status
                FROM Fatura
                    INNER JOIN Estabelecimento ON Estabelecimento.id = Fatura.Estabelecimento_id
                    INNER JOIN TipoAntecipacao ON TipoAntecipacao.id = Fatura.TipoAntecipacao_id
				WHERE Fatura.Status != "Finalizado"`;
    
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.send(JSON.stringify(rows));
	});
	db.close(); // Fecha o banco
});

app.get('/getRanking', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = `SELECT
					Estabelecimento.id,
					Estabelecimento.Razao AS RazaoSocial,
					Estabelecimento.QuantidadeAntecipacao AS QuantidadeAntecipacao,
					(SELECT SUM(Fatura.ValorRecebido) FROM Fatura WHERE Fatura.Estabelecimento_id = Estabelecimento.id) AS ValorAntecipado
				FROM Estabelecimento
				ORDER BY Estabelecimento.QuantidadeAntecipacao DESC`;
    
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.send(JSON.stringify(rows));
	});
	db.close(); // Fecha o banco
});

app.get('/getGeneralVision', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = `SELECT
					(SELECT SUM(Estabelecimento.QuantidadeAntecipacao) FROM Estabelecimento) As TotalDeAntecipações,
					SUM(Fatura.ValorRecebido) As ValorTotalAntecipado,
					SUM(Fatura.ValorTaxado) As ValorTotalTaxado,
					(SELECT TipoAntecipacao.Nome FROM TipoAntecipacao WHERE TipoAntecipacao.Quantidade = (SELECT MAX(TipoAntecipacao.Quantidade) FROM TipoAntecipacao)) As TipoMaisAntecipado
				FROM Fatura`;
    
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.send(JSON.stringify(rows));
	});
	db.close(); // Fecha o banco
});

app.get('/getPartnerData', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = `SELECT
					Estabelecimento.id,
                    Estabelecimento.Razao AS RazaoSocial,
                    Estabelecimento.CNPJ AS CNPJ,
                    Estabelecimento.Celular AS Celular,
                    Estabelecimento.QuantidadeAntecipacao AS QuantidadeAntecipação,
                    Login.Email AS Email,
                    Endereco.Logradouro AS Logradouro,
                    Endereco.Nome AS NomedoLogradouro,
                    Endereco.Numero AS Número,
                    Endereco.Bairro AS Bairro,
                    Endereco.Estado AS Estado,
                    Endereco.CEP AS CEP,
                    ContaBancaria.TitularDaConta AS TitulardaConta,
                    ContaBancaria.NumeroDaConta AS NúmerodaConta,
                    ContaBancaria.Agencia AS Agência
                FROM Estabelecimento
                    INNER JOIN Login ON Login.Estabelecimento_id = Estabelecimento.id
                    INNER JOIN Endereco ON Endereco.Estabelecimento_id = Estabelecimento.id
                    INNER JOIN ContaBancaria ON ContaBancaria.Estabelecimento_id = Estabelecimento.id;`;
    
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.send(JSON.stringify(rows));
	});
	db.close(); // Fecha o banco
});

app.get('/checkLogin', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = `SELECT * FROM Login`;
     
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.send(JSON.stringify(rows));
	});
	db.close(); // Fecha o banco
});

/*
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
*/