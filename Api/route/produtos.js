import express from 'express';
import { addProdutos, deleteProdutos, getProdutos, updateProdutos } from '../controllers/produto.js';
const router = express.Router()

router.get('/',getProdutos)
router.post('/',addProdutos)
router.put('/:id',updateProdutos) 
router.delete('/:id',deleteProdutos)



export default router;