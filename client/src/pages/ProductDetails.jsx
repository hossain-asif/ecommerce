

import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductStore from '../store/ProductStore';
import Brands from './../components/product/Brands';
import Details from '../components/product/Details';
import Layout from './../components/layout/Layout';

const ProductDetails = () => {
    
   let {DetailsRequest, ReviewListRequest,BrandList, BrandListRequest} = ProductStore(); 


    let {id} = useParams();

    useEffect(() => {
        (async ()=>{
            await DetailsRequest(id);
            await ReviewListRequest(id);

            if(BrandList===null){
                await BrandListRequest();
            }

        })()
    
    }, [])
    
    

    return (
        <Layout>
            <Details/>
            <Brands />
        </Layout>
    );
};

export default ProductDetails;