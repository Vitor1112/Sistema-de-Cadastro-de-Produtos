import { db } from "../db.js";
export const getProdutos=(_, res)=>{
    const sql ='SELECT * FROM produtos'
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json(err); // Retorna status 500 em caso de erro
        } else {
            return res.status(200).json(data); // Retorna status 200 com os dados dos produtos
        }
    });
}

export const addProdutos = (request,response)=>{
    const sql = "INSERT INTO produtos(`nome`, `preco`, `estoque`, `fone`) VALUES(?)";
    const values =[
        request.body.nome,
        request.body.preco,
        request.body.estoque,
        request.body.fone,

    ];
    console.log(values);
    console.log(request.body);
    
    db.query(sql,[values],(error)=>{
        if (error)return response.json(error);
        return response.status(200).json('Produto cadastrado com sucesso')
    })
}

export const updateProdutos = (request,response)=>{
    const sql = "UPDATE produtos SET `nome` = ?, `preco` = ?, `estoque` = ?, `fone` = ? WHERE `id` = ?";
    const values =[
        request.body.nome,
        request.body.preco,
        request.body.estoque,
        request.body.fone,

    ];
    db.query(sql,[...values,request.params.id],(error)=>{
        if (error)return response.json(error);
        return response.status(200).json('Produto Atualizado com sucesso !')
    })
}
export const deleteProdutos = (request, response) => {
    // A consulta SQL deve ter um marcador de parâmetro para a substituição
    const sql = "DELETE FROM produtos WHERE `id` = ?";
    
    // O parâmetro deve ser passado como um array para a função db.query
    db.query(sql, [request.params.id], (error) => {
        if (error) {
            // Se houver um erro, retorne o erro como resposta JSON
            return response.status(500).json(error);
        }
        // Se a consulta for bem-sucedida, retorne uma mensagem de sucesso
        return response.status(200).json('Produto deletado com sucesso!');
    });
}