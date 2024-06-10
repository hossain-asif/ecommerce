

import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import ProductStore from '../store/ProductStore';
import { useParams } from 'react-router-dom';
import ProductList from '../components/product/ProductList';

const ProductByCategory = () => {

    const {ListByCategoryRequest} = ProductStore();

    const {id} = useParams();

    useEffect(()=>{
        (async ()=>{
            await ListByCategoryRequest(id);
        })()
    },[id]);

    return (
        <Layout>
            <ProductList/>
        </Layout>
    );
};

export default ProductByCategory;