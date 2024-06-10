

import React, { useEffect } from 'react';
import Layout from './../components/layout/Layout';
import LegalContents from '../components/features/LegalContents';
import FeatureStore from '../store/FeatureStore';

const AboutPage = () => {

    let {LegalDetailsRequest} = FeatureStore();

    useEffect(() => {

        (async ()=>{
            await LegalDetailsRequest("about");
        })()
    }, [])

    return (
        <Layout>
            <LegalContents/>
        </Layout>
    );
};

export default AboutPage;