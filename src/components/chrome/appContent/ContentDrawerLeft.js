import {setContent, toggleOpen} from './methods';
import ToggleButton from './ToggleButton';

export default class ContentDrawerLeft extends React.Component {
    constructor(props) {
        super(props);
        this.session = props.session;

        this.setContent = setContent.bind(this);
        this.toggleOpen = toggleOpen.bind(this);

        this.session.appContent.contentDrawerLeft = {
            setContent: this.setContent.bind(this),
            toggleOpen: this.toggleOpen.bind(this)
        };
        this.state = {
            open: false
        }
        this.item = new React.createRef();
    }
    componentDidUpdate(){
        const hasContent = !!this.item.current.querySelector('.inner > .inner').innerHTML.length;
        const item = d3.select(this.item.current)
        item.classed('nocontent', !hasContent)
    }
    render(){
        return (
            <div
                ref={this.item}
                id="mio-contentDrawerLeft"
                className={`
                    contentDrawer left nocontent
                    ${this.state.open ? 'open' : 'closed'}
                `}
            >
                <ToggleButton
                    className = "left"
                    open={this.state.open}
                    toggle={() => this.toggleOpen()}
                />
                <div className="inner">
                    <div className="inner">
                        {this.state.content}
                    </div>
                </div>
            </div>
        );
    }
}