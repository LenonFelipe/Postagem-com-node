
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post')
// config

    // template engine
        app.engine('handlebars', handlebars.engine(({defaultLayout: 'main', runtimeOptions: {
            allowProtoPropertiesByDefault: true, allowProtoMethodsByDefault: true,
        }})));
        app.set('view engine', 'handlebars');

    // Body Parser
        app.use(bodyParser.urlencoded({extended: false})) 
        app.use(bodyParser.json());

    // Rotas    
        app.get("/", (req, res) => {
            Post.findAll({order: [["id", "DESC"]]}).then((posts) => {
                console.log(posts)
                res.render("done", {posts: posts})
            })
        })

        app.get('/cadastro', (req, res) => {
            res.render("formulario")
        })

    // Rota para recebimento de dados do formulário 
        app.post('/add', (req,res) => {
            Post.create({
                titulo: req.body.titulo,
                conteudo: req.body.conteudo
            }).then(() => {
                res.redirect("/")
            }).catch((erro) => {
                res.send("Houve um erro " + erro)
            })
        })

        app.get("/deletar/:id", function(req, res){
            Post.destroy({where: {"id": req.params.id}}).then(function(){
                res.send("Postagem excluída com sucesso!")
            }).catch(function(erro){
                res.send("Esta postagem não existe!")
            })
        })


app.listen(8081, () => {
    console.log("Servidor aberto na porta 8081")
});





