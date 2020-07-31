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
import About from './about_page';
import Videos from './videos';
import Home from './home';

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
    // const [path, setPath] = useState('home');

    const match = useRouteMatch();
    const authorId = match.params.authorId;

    // :content_creator_id, :subscriber_id

    const pathname = () => {
        let url = props.location.pathname;
        let split = url.split("/");
        return split[split.length - 1]
    }

    const url = () => {
        let url = props.location.pathname;
        return url;
    }

    const location = pathname();
    const urlString = url();

    const loadHome = () => {
        props.fetchMostViewedVideo(authorId).then( () => {
            debugger
            setLoaded(true);
            setSkip(0);
        })
    }

    const loadVideos = () => {
        props.fetchContentCreatorVids(authorId).then( () => {
            debugger
            setLoaded(true);
            setSkip(0);
        })
    }

    const loadAbout = () => {
        /*
            may not need this function as about description, if not null
        */

        props.fetchContentCreatorAbout(authorId).then( () => {
            debugger
            setLoaded(true);
            setSkip(0);
        })
    }

    console.log("HERE IS THE URL TERMINATION VARIABLE:  ", location)
    console.log("WHAT DOES MATCH LOOK LIKE:  ", match)
    
    useEffect( () => {
        console.log("INSTANTIATING USE-EFFECT!")
        
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
        } else {
            setLoadedSubscription(true)
        }

        props.fetchContentCreator(authorId).then( () => {
            setLoadedCreator(true);
        })

        if (location === "videos") {
            loadVideos();
        } else if (location === "about") {
            //verify if action works by dispatching in window
            loadAbout();
        } else {
            loadHome();
        }
        
    }, [location, urlString])

    console.log("STATUS OF VARIABLES: ", loaded, loadedSubscription, props.author, loadedCreator)

    const loadingScreen = () => {
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

    if (loaded === false
        ||
        loadedSubscription === false
        ||
        props.author === null
        ||
        loadedCreator === false) {
            return loadingScreen();
    }

    console.log("LOADED, HERE IZ THE PROPPSSSSSS!!:  ", props);

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
                    location={location}
                />
                
                <Switch>
                    {/* <Route  />
                    <Route  /> */}
                    <Route exact path={`${match.path}/videos`} component={() => <Videos videos={props.videos} author={props.author}/>} />
                    <Route exact path={`${match.path}/about`} component={() => <About author={props.author} />} />
                    <Route exact path={`${match.path}`} component={() => <Home video={props.videos}/>} />

                    {/* 
                        Refactor Routes prop threading to Link prop threading to channel_pannel for next push
                        and give props there
                    */}

                </Switch>
            </div>
        </div>
    )

}

export default withRouter(Channel);