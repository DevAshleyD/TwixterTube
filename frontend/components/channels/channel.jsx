import React, {useEffect, useState} from 'react';
import NavBarContainer from '../nav_bar/nav_bar_container';
import SideBarContainer from '../sidebar/sidebar_container';
import ModalSidebarContainer from '../sidebar/modal_sidebar_container';

const Channel = (props) => {
    // const [] = useState();
    
    useEffect( () => {
        console.log('HERE IS PROPS: ', props );
        console.log('HERE IS AUTHOR ID: ', typeof props.match.params.authorId );
    }, [])
    
    
    
    
    
    return (
        <div>
            <NavBarContainer url={props.match.url} />
            <ModalSidebarContainer />
            <SideBarContainer url={props.match.url} />

            <div className="channel-main-container">
                HELLO THIS CHANNEL
            </div>
        </div>
    )

}

export default Channel;