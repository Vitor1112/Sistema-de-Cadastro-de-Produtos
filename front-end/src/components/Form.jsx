// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from 'react'
import { toast } from "react-toastify";
import FormContainer from '../Css/FormContainer'
import DivArea from '../Css/DivArea'
import Label from '../Css/Label'
import Input from '../Css/Input'
import Button from '../Css/Button'
import axios from 'axios';


const Form = ({onEdit,setOnEdit,getProducts}) => {

    const ref = useRef()

    useEffect(()=>{
        if(onEdit){
            const product = ref.current

            product.nome.value = onEdit.nome;
            product.preco.value = onEdit.preco;
            product.estoque.value = onEdit.estoque;
            product.fone.value = onEdit.fone;
        }
    },[onEdit])
    
 const handleSubmit = async(event)=>{

    event.preventDefault()

    const product = ref.current

    if(!product.nome.value || !product.preco.value || !product.estoque.value || !product.fone.value) {
        return toast.warn("Preencha todos os campos!");
    }
    if(onEdit){
        await axios.put(`http://localhost:4000/${onEdit.id}`,{
            nome: product.nome.value,
            preco: product.preco.value,
            estoque: product.estoque.value,
            fone: product.fone.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }else{
        await axios.post('http://localhost:4000', {
            nome: product.nome.value,
            preco: product.preco.value,
            estoque: product.estoque.value,
            fone: product.fone.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }
    product.nome.value = ''
    product.preco.value = ''
    product.estoque.value = ''
    product.fone.value = ''
   
    setOnEdit(null)// para ele volta ser nulo
    getProducts()// funçao de mostra item na tela 
 }



  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
        <DivArea>
            <Label>Nome</Label>
            <Input name='nome' type='text'/>
        </DivArea>
        <DivArea>
            <Label>Preço</Label>
            <Input name='preco' type='text' />
        </DivArea>
        <DivArea>
            <Label>Estoque</Label>
            <Input name='estoque' type='text'/>
        </DivArea>
        <DivArea>
            <Label>Fone</Label>
            <Input name='fone'type='text'/>
        </DivArea>
        <Button type='submit'>Salvar</Button>
    </FormContainer>
  )
}

export default Form
