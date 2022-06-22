import {setContent, toggleOpen} from './methods';
import ToggleButton from './ToggleButton';

export default class ContentDrawerBottom extends React.Component {
    constructor(props) {
        super(props);
        this.session = props.session;

        this.setContent = setContent.bind(this);
        this.toggleOpen = toggleOpen.bind(this);

        this.session.appContent.contentDrawerBottom = {
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
                id="mio-contentDrawerBottom"
                className={`
                    contentDrawer bottom nocontent
                    ${this.state.open ? 'open' : 'closed'}
                `}
            >
                <ToggleButton
                    className = "bottom"
                    open={this.state.open}
                    toggle={(state, pin) => this.toggleOpen(state, pin)}
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