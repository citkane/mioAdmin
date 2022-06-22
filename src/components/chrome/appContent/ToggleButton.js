export default class ToggleButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open
        }
    }
    toggle(){
        this.props.toggle(undefined, true);
    }
    UNSAFE_componentWillReceiveProps(newProps){
        this.setState({
            open: newProps.open
        })
    }
    render(){
        return (
            <div
                className={`
                    toggleButton
                    ${this.props.className}
                    ${this.state.open ? 'open' : 'closed'}
                `}
                onClick={() => this.toggle()}
            >
                {this.state.open ? 'X' : 'o'}
            </div>
        )
    }
}