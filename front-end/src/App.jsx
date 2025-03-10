import React, { useEffect, useState } from "react";
import GlobalStyle from "./Global";
import Container from "./Css/Container";
import Title from "./Css/Title";
import Form from "./components/Form";
import Grid from "./components/Grid";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const [products, setProducts] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getProducts = async () => {
    try {
      const result = await axios.get("http://localhost:4000");
      setProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [setProducts]);
  
  return (
    <>
      <Container>
        <Title>Cadastro de Produto</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} setProducts={setProducts} />
        
        <Grid products={products} setProducts={setProducts} setOnEdit={setOnEdit} />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
      <GlobalStyle />
    </>
  );
};

export default App;
