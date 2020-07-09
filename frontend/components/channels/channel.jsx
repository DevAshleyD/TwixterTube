import React, {useEffect, useState} from 'react';
import { Link, 
    withRouter, 
    Switch, 
    Route,
    useRouteMatch
} from 'react-router-dom';
import NavBarContainer from '../nav_bar/nav_bar_container';
import SideBarContainer from '../sidebar/sidebar_container';
import ModalSidebarContainer from '../sidebar/modal_sidebar_container';
import Banner from './banner';
import ChannelPannel from './channel_pannel';

const Channel = (props) => {
    // const [state, setState] = useState({
    //     loaded: false,
    //     skip: 0,
    //     loadedSubscription: false
    // });

    // const {
    //     loaded,
    //     skip,
    //     loadedSubscription
    // } = state;

    const [loaded, setLoaded] = useState(false);
    const [loadedCreator, setLoadedCreator] = useState(false);
    const [loadedSubscription, setLoadedSubscription] = useState(false);
    const [skip, setSkip] = useState(0);

    const match = useRouteMatch();
    const authorId = match.params.authorId;

    // :content_creator_id, :subscriber_id
    
    useEffect( () => {
        console.log('HERE IS PROPS: ', props );
        console.log('HERE IS MATCH: ', match );
        
        if (props.currentUser) {
            console.log('IN CURRENTUSER CONDITIONAL:  ');
            props.getSubscription({
                content_creator_id: authorId,
                subscriber_id: props.currentUser.id
            }).then( 
                () => {
                    console.log("CURRENT USER NO ERROR");
                    // setState({ ...state, loadedSubscription: true })
                    setLoadedSubscription(true);
                },
                (err) => {
                    console.log("CURRENT USER ERROR");
                    // setState({ ...state, loadedSubscription: true })
                    setLoadedSubscription(true);
                }
            )
        }

        props.fetchContentCreator(authorId).then( () => {
            setLoadedCreator(true);
        })

        props.fetchContentCreatorVids(authorId).then( () => {
            setLoaded(true);
        })
        
    }, [match.url, props.currentUser])

    if (loaded === false
        ||
        loadedSubscription === false
        ||
        props.author === null
        ||
        loadedCreator === false) {
        return (
            <div>
                <NavBarContainer url={props.match.url} />
                <ModalSidebarContainer />
                <SideBarContainer url={props.match.url} />

                <div className="channel-main-container">
                    <h1>
                        Loading...
                    </h1>
                </div>
            </div>
        )
    }

    console.log("LOADED, HERE IZ THE PROPPSSSSSS!!:  ", props)

    let subscribedStying = props.currentUser && props.subscription ? 
        "subscribed-styling-button" : "non-subscribed-styling-button"

    return (
        <div>
            <NavBarContainer url={props.match.url} />
            <ModalSidebarContainer />
            <SideBarContainer url={props.match.url} />

            <div className="channel-main-container">
                <Banner userId={props.match.params.authorId} />
                <ChannelPannel
                    subscribedStying={subscribedStying}
                    author={props.author}
                />
                
                {/* <Switch>
                    <Route  />
                    <Route  />
                    <Route  />

                </Switch> */}
            </div>
        </div>
    )

}

export default withRouter(Channel);