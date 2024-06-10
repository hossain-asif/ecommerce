import React, { useEffect } from 'react';
import FeatureStore from '../store/FeatureStore';
import Layout from '../components/layout/Layout';
import LegalContents from '../components/features/LegalContents';

const PrivacyPolicyPage = () => {
    let {LegalDetailsRequest} = FeatureStore();

    useEffect(() => {

        (async ()=>{
            await LegalDetailsRequest("privacy");
        })()
    }, [])

    return (
        <Layout>
            <LegalContents/>
        </Layout>
    );
};

export default PrivacyPolicyPage;