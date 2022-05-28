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
					Parceiro.id AS IDdoParceiro,
					Parceiro.Razao AS NomeDoParceiro,
					TipoAntecipacao.Nome AS TipoAntecipação,
					Fatura.NotaFiscal AS NotaFiscal,
					Fatura.ValorRecebido as ValorRecebido,
					Fatura.ValorTaxado as ValorTaxado,
					Fatura.Data as Data,
					Fatura.Status as Status
                FROM Fatura
                    INNER JOIN Parceiro ON Parceiro.id = Fatura.Parceiro_id
                    INNER JOIN TipoAntecipacao ON TipoAntecipacao.id = Fatura.TipoAntecipacao_id`;
    
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

app.get('/getRanking', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = `SELECT
                    Parceiro.id,
					Parceiro.Razao AS RazaoSocial,
					Parceiro.QuantidadeAntecipacao AS QuantidadeAntecipacao,
					(SELECT SUM(Fatura.ValorRecebido) FROM Fatura WHERE Fatura.Parceiro_id = Parceiro.id) AS ValorAntecipado
				FROM Parceiro
				ORDER BY Parceiro.QuantidadeAntecipacao DESC`;
    
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

app.get('/getGeneralVision', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = `SELECT
					(SELECT SUM(Parceiro.QuantidadeAntecipacao) FROM Parceiro) As TotalDeAntecipações,
					SUM(Fatura.ValorRecebido) As ValorTotalAntecipado,
					SUM(Fatura.ValorTaxado) As ValorTotalTaxado,
					(SELECT TipoAntecipacao.Nome FROM TipoAntecipacao WHERE TipoAntecipacao.Quantidade = (SELECT MAX(TipoAntecipacao.Quantidade) FROM TipoAntecipacao)) As TipoMaisAntecipado
				FROM Fatura`;
    
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
                    Parceiro.QuantidadeAntecipacao AS QuantidadeAntecipação,
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
                FROM Parceiro
                    INNER JOIN Login ON Login.Parceiro_id = Parceiro.id
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