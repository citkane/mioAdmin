import { BrowserRouter, Route, Link, NavLink, Navigate, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";
import TopUserBar from './chrome/TopUserBar';
import LeftMainMenu from './chrome/LeftMainMenu';
import ContentDrawerTop from './chrome/appContent/ContentDrawerTop';
import ContentDrawerBottom from './chrome/appContent/ContentDrawerBottom';
import ContentDrawerLeft from './chrome/appContent/ContentDrawerLeft';
import ContentDrawerRight from './chrome/appContent/ContentDrawerRight';
import HomePage from './pages/HomePage';
import Module from './pages/Module';

const history = createBrowserHistory();

let mioApp;
export default class App extends React.Component {
    constructor(props) {
        super(props);
        mioApp = props.session;
        mioApp.appContent = {};
        mioApp.resetAppContent = () => {
            Object.keys(mioApp.appContent).forEach(key => {
                mioApp.appContent[key].setContent(null);
            });
            mioApp.topUserBar.setBreadcrumb(null);
        }
        mioApp.router = {
            history,
            Link,
            NavLink,
            Redirect:Navigate
        }
    }
    render(){
        const _colors = [1,2,3,4];
        const _shades = ['dark', null, 'medium', 'light'];
        return (
            <BrowserRouter history={history}>
                <TopUserBar session={mioApp} />
                <div id="mio-chromeWrapper">
                    <LeftMainMenu session={mioApp} />
                    <ContentDrawerLeft session={mioApp} />
                    <div id="mio-appContent">
                        <ContentDrawerTop session={mioApp} />
                        <div className="inner">
                            <Routes>
                                <Route path={`/docs/`}>
                                    <Module session={mioApp} moduleName="@mio-core/docs" />
                                </Route>
                                <Route path={`/auth/`}>
                                    <Module session={mioApp} moduleName="@mio-core/auth" />
                                </Route>
                                {Object.keys(mioModuleMenu).map(menuItem => {
                                    return (
                                        <Route path={`/${mioModuleMenu[menuItem]}/`}>
                                            <Module session={mioApp} moduleName={mioModuleMenu[menuItem]} />
                                        </Route>
                                    )
                                })}
                                <Route exact path="/">
                                    <HomePage session={mioApp} />
                                </Route>
                            </Routes>

                            <div className="tester">
                                {
                                /**
                                * Add the dev mode colour pallet
                                * */
                                _colors.map(c => {
                                    return <div key={c}>
                                        {_shades.map(s => {
                                            const classname = `col-${c}${s ? '-' + s : ''}`;
                                            return <span key={c + s} className={classname}>
                                                {classname}
                                            </span>
                                        })}
                                    </div>
                                })}
                            </div>
                        </div>
                        <ContentDrawerBottom session={mioApp} />
                    </div>
                    <ContentDrawerRight session={mioApp} />
                </div>
            </BrowserRouter>
        )
    }
}