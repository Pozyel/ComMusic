
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);


//inicia o servidor
app.listen(port);
console.log('API funcionando!');



function execSQLQuery(sqlQry, res) {
    const connection = mysql.createConnection({
        host: 'remotemysql.com',
        port: '3306',
        user: 'kqqU4yPhkU',
        password: 'mqb4P3hWq9',
        database: 'kqqU4yPhkU'
    });

    connection.query(sqlQry, function (error, results, fields) {
        if (error)
            res.json(error);
        else
            res.json(results);
        connection.end();
        console.log('executou!');
    });
}
//Mostrar Todos os Usuarios cadastrados
//router.get('/usuarios', (req, res) =>{
  //  execSQLQuery('SELECT * FROM Usuario', res);
//});
//Pesquisar somente um Usuario
router.get('/usuarios/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE idUsuario=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM Usuario' + filter, res);
});

//Excluir um Usuario
router.delete('/clientes/:id', (req, res) =>{
    execSQLQuery('DELETE FROM Usuario WHERE  idUsuario=' + parseInt(req.params.id), res);
});

//Adicionar um Usuario
router.post('/usuarios', (req, res) =>{
    const nome = req.body.nome.substring(0,150);
    const senha = req.body.senha.substring(0,11);
    execSQLQuery(`INSERT INTO Usuario(Nome, CPF) VALUES('${nome}','${cpf}')`, res);
});
//Atualizar um Usuario
router.patch('/clientes/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const nome = req.body.nome.substring(0,150);
    const cpf = req.body.cpf.substring(0,11);
    execSQLQuery(`UPDATE Usuario SET Nome='${nome}', CPF='${cpf}' WHERE idUsuario=${id}`, res);
});

