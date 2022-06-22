//import { BrowserRouter, Route, Link } from "react-router-dom";

let mioApp, Link;
export default class LeftMainMenu extends React.Component {
    constructor(props) {
        super(props);
        mioApp = props.session;
        mioApp.leftMainMenu = {
            toggleMainMenu: this.toggleMainMenu.bind(this)
        }
        Link = mioApp.router.Link;

        this.state = {
            open: false
        }
    }
    toggleMainMenu(state){
        if(typeof state === 'undefined') state = this.state.open ? false : true;
        mioApp.topUserBar.setMenuState(state);
        this.setState({
            open: state
        })
    }
    render(){
        return (
            <div id="mio-leftMainMenu" className={this.state.open ? 'open' : 'closed'}>
                <LinkTo to='/' name='Home' />
                {Object.keys(mioModuleMenu).map(menuItem => {
                    return (
                        <LinkTo to={`/${mioModuleMenu[menuItem]}`} name={menuItem} />
                    )
                })}
                <LinkTo to="/docs" name="VioApp Documentation" />
                <LinkTo to="/auth" name="Users and permissions" />
                <button id="colourButton" onClick={() => {
                    const tester = d3.select('.tester');
                    tester.classed('show', tester.classed('show') ? false : true);
                }}>Colours</button>
            </div>
        )
    }
}

function LinkTo(props){
    return (
        <div className="menuLink">
            <Link to={props.to}>{props.name}</Link>
        </div>
    )
}