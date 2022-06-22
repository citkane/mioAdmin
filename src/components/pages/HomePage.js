import mioFrame from 'images/mioFrame.jpg';
import microservices from 'images/microservices.jpg';
import topology from 'images/topology.jpg';

let mioApp;
export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.session = props.session;
        mioApp = props.session;
    }
    componentDidMount(){
        mioApp.leftMainMenu.toggleMainMenu(false);
    }
    render(){
        return (
            <div id="mio-homePage">
                <div className="inner">
                    <div>
                        <h1>UI architecture</h1>
                        <img className = "wireframe" src={mioFrame} />

                    </div>
                </div>
            </div>
        )
    }
}
/*
<h1>System Topology</h1>
<img className = "topologu" src={topology} />
<h1>Microservice architecture</h1>
<img className = "microservices" src={microservices} />
*/