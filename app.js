/*Desenvolva um sistema CRUD utilizando Express.js para gerenciar
livros e estudantes, além de permitir o aluguel de livros por parte dos
estudantes. O sistema deve ser capaz de realizar operações de criação,
leitura, atualização e deleção (CRUD) para livros e estudantes, e
gerenciar os aluguéis de livros.� Atributos do Estudante

• id
• nome
• matrícula
• curso
• ano 🤓 */

const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose 
 .connect("mongodb://localhost:27017/livraria")// não seria livraria
 .then(() => console.log("Conectando o MongoDB"))
 .catch((erro)=> console.error("Conectando o MongoDB", erro));

const esquemaEstudante = new mongoose.Schema({
   id:{ type: String, required: true},
   nome:{ type: String, required: true},
   matrícula:{ type: String, required: true},
   curso:{ type: String, required: true},
   ano:{ type: String, required: true},

})
const Estudante = mongoose.model("Estudante", esquemaEstudante);

async function criarEstudante(id, nome, matrícula, curso, ano) { 
    try {
      const novoEstudante = new Estudante({ id, nome, matrícula, curso, ano});
      return await novoEstudante.save();
    } catch (erro) {
      console.error("Erro ao criar Estudante:", erro);
      throw erro;
    }
  }
   

    app.post("/Estudante", async (req, res) => {
    try {
      const {id, nome, matrícula, ano } = req.body;
      const novoEstudante = await criarEstudante(id,nome,matrícula,curso,ano);
      res
        .status(201)
        .json({ mensagem: "Estudante foi criado com sucesso 🤓!! ", Estudante: novoEstudante });
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao criar estudante", erro: erro.message });
    }
  });
    async function obterEstudantes() { // arrumar ou ver isso aqui que esta estranho 😁
    try {
      return await Estudante.find();
    } catch (erro) {
      console.error("Erro ao obter Estudantes:", erro);
      throw erro;
    }
  }
  /*• id,nome,matrícula, curso,ano*/

  app.get("/Estudante", async (req, res) => {
    try {
      const Estudantes = await Estudante.findByIdAndUpdate(
        id,
        { id, nome, matrícula, curso, ano },
        { new: true, runValidators: true }
      );
      return estudanteAtualizado;
    } catch (erro) {
      console.error("Erro ao atualizar o Estudante:", erro);
      throw erro;
    }
  }
  )
  app.put("/Estudante/:id", async (req, res) => { 
    try { 
    const  {id} = req.params;
    const {título, ano, maricula, curso} = req.body;
    const EstudanteAtualizado = await atualiazarEstudante(
      id,
       nome,
       matrícula,
       curso,
       ano 
    );
    if(estudenteAtualizado){
      res 
      .status(200)
      .json( { 
        mensagem: "Estudante atualizado com sucesso ",
        estudante: estudanteAtualizado,
      })
    }else{ 
      res.status(404).json({mensagem:"Estudante não encontrado"});
    }
   }  catch(erro){ 
    res 
    .status(500)
    .json ({mensagem:"Erro ao atualizar o estudante", erro : erro.menssage})
    }
  });

  async function deletarEstudante(id) {
    try {
      const estudanteDeletado = await Estudante.findByIdAndDelete(id);
      return estudanteDeletado;
    } catch (erro) {
      console.error("Erro ao deletar estudante:", erro);
      throw erro;
    }
  }
  
  app.delete("/Estudantes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const estudanteDeletado = await deletarEstudante(id);
      if (estudanteDeletado) {
        res
          .status(200)
          .json({ mensagem: "Estudante deletado com sucesso", livro: livroDeletado });
      } else {
        res.status(404).json({ mensagem: "Estudante não encontrado" });
      }
    } catch (erro) {
      res
        .status(500)
        .json({ mensagem: "Erro ao deletar estudante", erro: erro.message });
    }
  });
  
  const port = 3000;
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
  
  
  
  