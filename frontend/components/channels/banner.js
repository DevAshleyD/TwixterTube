import React, { useState, useEffect } from 'react';
import {fetchBanner, uploadBanner} from '../../util/user_util';

const Banner = (props) => {
    const [loaded, setLoaded] = useState(false);
    const [bannerUrl, setBannerUrl] = 
        useState('https://twixtertube-dev.s3-us-west-1.amazonaws.com/twixter_logo.png');
    const [defaultBanner, setDefaultBanner] = useState(true);

    const init = () => {
        fetchBanner(props.userId).then( 
            data => {
                setBannerUrl(data.bannerUrl)
                setDefaultBanner(false);
            },
            err => 
                setBannerUrl('https://twixtertube-dev.s3-us-west-1.amazonaws.com/twixter_logo.png')
        )
    }

    useEffect(() => {
        // console.log('WHAT IS USERID:  ', props.userId)
        init();
        setLoaded(true);
    }, [])
    
    if (loaded === false) {
        return (
            <div>
                {null}
            </div>
        )
    }

    const altAttribute = defaultBanner ? 'Twixter-Logo' : bannerUrl;
    
    return (
        <div className="banner-main-container">
            <img className="banner-image" src={bannerUrl} alt={altAttribute} />
        </div>
    )
}   
    
export default Banner;