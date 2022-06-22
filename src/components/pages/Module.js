let mioApp;
export default class Module extends React.Component {
    constructor(props) {
        super(props);
        mioApp = props.session;
        this.state = {
            Module: null
        }
    }
    setModule(moduleName) {
        const proceed = (module, moduleName) => {
            mioApp.modules[moduleName] = module.default;
            this.setState({
                Module: module.default.Module,
                moduleName
            }, () => {
                mioApp.leftMainMenu.toggleMainMenu(false);
            })
        }
        if(moduleName.startsWith('@mio-core')) {
            moduleName = moduleName.split('/')[1];
            import(
                /* webpackChunkName: "mio-core/module" */
                `@mio-core/${moduleName}/src/module.js`
            )
                .then((module) => proceed(module, `core_${moduleName}`))
                .catch(err => console.error(err))
        } else {
            import(
                /* webpackChunkName: "modules/mio-module" */
                `modules/${moduleName}/src/module.js`
            )
                .then((module) => proceed(module, moduleName))
                .catch(err => console.error(err))
        }
    }
    componentDidMount(){
        this.setModule(this.props.moduleName);
    }
    componentDidUpdate(prevProps){
        if(prevProps.moduleName !== this.props.moduleName) {
            mioApp.resetAppContent();
            this.setModule(this.props.moduleName);
        }
    }
    componentWillUnmount(){
        mioApp.resetAppContent();
    }
    render(){
        if(!this.state.Module) return null;
        const ActiveModule = this.state.Module;
        return <ActiveModule
            module={mioApp.modules[this.state.moduleName]}
            mioApp={mioApp}
            chrome={{
                topUserBar: mioApp.topUserBar,
                leftMainMenu: mioApp.leftMainMenu,
                contentDrawerLeft: mioApp.appContent.contentDrawerLeft,
                contentDrawerTop: mioApp.appContent.contentDrawerTop,
                contentDrawerBottom: mioApp.appContent.contentDrawerBottom,
                contentDrawerRight: mioApp.appContent.contentDrawerRight
            }}
        />;
    }
}