

import FeatureStore from '../../store/FeatureStore';
import Skeleton from "react-loading-skeleton";
import Parse from 'html-react-parser';
const LegalContents = () => {
    let {LegalDetails} = FeatureStore();

    if(LegalDetails === null){
        return(
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>

                    <Skeleton count={12} />
                    </div>

                </div>

            </div>
        )
    }
    else{
        return(


            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-12 p-3'>

                    {Parse(LegalDetails[0]['description'])}
                    </div>
                </div>
            </div>

        )
    }

};

export default LegalContents;