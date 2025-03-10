import React from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "../Css/Table";
import {FaEdit, FaTrash} from "react-icons/fa"
import axios from 'axios'
import{toast} from 'react-toastify'

const Grid = ({products,setProducts,setOnEdit}) => {

  const handleDelete = async (id) => {
    try {
        const { data } = await axios.delete(`http://localhost:4000/${id}`);
        const newArray = products.filter((product) => product.id !== id);

        setProducts(newArray);
        toast.success(data);
    } catch ({ data }) {
        toast.error(data);
    }
};
 /* Para editar item */
const handleEdit = (item) => {
  setOnEdit(item)
}

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Preço</Th>
          <Th>Estoque</Th>
        </Tr>
      </Thead>
      <Tbody>
        {products.map((item, index )=>(
        <Tr key={index}>
            <Td width="30%">{item.nome}</Td>
            <Td width="30%">{item.preco}</Td>
            <Td width="20%">{item.estoque}</Td>
            <Td><FaEdit onClick={() => handleEdit(item)} /></Td>
            <Td><FaTrash onClick={ () => handleDelete(item.id)}/></Td>
        </Tr>

        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
