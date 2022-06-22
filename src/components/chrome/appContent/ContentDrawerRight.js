import {setContent, toggleOpen} from './methods';
import ToggleButton from './ToggleButton';

export default class contentDrawerRight extends React.Component {
    constructor(props) {
        super(props);
        this.session = props.session;

        this.setContent = setContent.bind(this);
        this.toggleOpen = toggleOpen.bind(this);

        this.session.appContent.contentDrawerRight = {
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
                id="mio-contentDrawerRight"
                className={`
                    contentDrawer right nocontent
                    ${this.state.open ? 'open' : 'closed'}`}
            >
                <ToggleButton
                    className = "right"
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