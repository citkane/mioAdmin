function setContent(content) {
    const selected = d3.select(this.item.current);
    this.setState({
        content,
        open: !!content
    }, () => {
        selected.classed('noAni', false);
    })
    selected.classed('noAni', true)
}

function toggleOpen(state, pin){
    let newState = this.state.open ? false : true;
    if(typeof state !== 'undefined') {
        newState = state;
        if(newState && this.state.pinned === false) newState = false;
    }
    newState = {
        open: newState
    }
    if(pin) newState.pinned = newState.open;
    this.setState(newState);
}

export {
    setContent,
    toggleOpen
}
