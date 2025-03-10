import express from 'express'
import cors from 'cors'
import router from './route/produtos.js'
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express()



app.use(cors()) /// ele severve para evitar error no cabeçalho quando fizer requisão no Api  usanod frontiend , sem esta usando o Insonimia 
app.use(express.json())
app.use(express.urlencoded({extended:true}))/* Para que meu codigo consiga ler valores que digitar no corpo para requição do body */
app.use('/',router)/* Onde estão todos caminnhos das routas que amazena os produtos */







app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso http://localhost:${PORT}`);
});