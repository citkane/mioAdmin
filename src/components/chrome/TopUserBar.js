let mioApp, Link;
export default class TopUserBar extends React.Component {
    constructor(props) {
        super(props);
        mioApp = props.session;
        mioApp.topUserBar = {
            setBreadcrumb: this.setBreadcrumb.bind(this),
            setMenuState: this.setMenuState.bind(this)
        }
        Link = mioApp.router.Link;
        this.state = {
            breadCrumb: props.breadCrumb,
            menuOpen: false
        }
    }
    setMenuState(state){
        this.setState({
            menuOpen: state
        });
    }
    setBreadcrumb(breadCrumb){
        this.setState({breadCrumb});
    }
    render(){
        const {firstname, lastname} = mioApp.user.credentials;
        return (
            <div id="mio-topUserBar">
                <div className='zone left'>
                    <button><Link to="/">Home</Link></button>
                    <button className="menuButton" onClick={() => {
                        mioApp.leftMainMenu.toggleMainMenu();
                    }}>
                        {this.state.menuOpen ? 'Close Menu' : 'Menu'}
                    </button>
                </div>
                <div className='zone mid'>
                    {this.state.breadCrumb}
                </div>
                <div className='zone right'>
                    <div className="username">{firstname} {lastname}</div>
                    <button onClick={() => mioApp.logOut()}>Log Out</button>
                    <button onClick={() => {
                        if (document.fullscreenElement) return document.exitFullscreen();
                        document.documentElement.requestFullscreen();
                    }}>fs</button>
                </div>
            </div>
        )
    }
}
