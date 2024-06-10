

import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import SliderSkeleton from '../skeleton/SliderSkeleton';
import FeaturesSkeleton from '../skeleton/FeaturesSkeleton';
import CategoriesSkeleton from '../skeleton/CategoriesSkeleton';
import BrandsSkeleton from '../skeleton/BrandsSkeleton';
import ProductsSkeleton from '../skeleton/ProductsSkeleton';
import Brands from '../components/product/Brands';
import Slider from '../components/product/Slider';
import Categories from '../components/product/Categories';
import Products from '../components/product/Products';
import Features from '../components/features/Features';
import ProductStore from '../store/ProductStore';
import FeatureStore from '../store/FeatureStore';



const HomePage = () => {


    const {BrandListRequest,CategoryListRequest,SliderListRequest,ListByRemarkRequest} = ProductStore();

    const {FeatureListRequest} = FeatureStore();

   useEffect( () => {
        (async ()=>{
            await SliderListRequest();
            await FeatureListRequest();
            await BrandListRequest();
            await CategoryListRequest();
            await ListByRemarkRequest();
        })()
    },[]);

    return (
        <Layout>
            <Slider/>
            <Features/>
            <Categories/>
            <Products/>
            <Brands/>

        </Layout>
    );
};

export default HomePage;