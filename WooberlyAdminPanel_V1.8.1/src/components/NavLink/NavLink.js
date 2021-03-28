import React from 'react';
import { connect } from 'react-redux';
import history from '../../history';
import { Nav } from 'react-bootstrap';

function isLeftClickEvent(event) {
    return event.button === 0;
}
function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class NavLink extends React.Component {

    handleClick = (event) => {
        const { noLink } = this.props;

        if (this.props.onClick) {
            this.props.onClick(event);
        }

        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
            return;
        }

        if (event.defaultPrevented === true) {
            return;
        }

        event.preventDefault();

        if (!noLink) {
            history.push(this.props.to);
        }
    };

    render() {
        const { to, children, className } = this.props;
        return <Nav.Link href={to} onClick={this.handleClick} className={className}>{children}</Nav.Link>;
    }
}

const mapState = (state) => ({});
const mapDispatch = {

};
export default connect(mapState, mapDispatch)(NavLink);
