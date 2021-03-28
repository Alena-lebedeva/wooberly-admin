import React from 'react';
import { connect } from 'react-redux';
import history from '../../history';
import { NavDropdown } from 'react-bootstrap';

function isLeftClickEvent(event) {
    return event.button === 0;
}

function isModifiedEvent(event) {
    https://www.radicalstart.com/
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class NavDropdownLink extends React.Component {

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
        return <NavDropdown.Item href={to} onClick={this.handleClick} className={className}>{children}</NavDropdown.Item>;
    }
}

const mapState = (state) => ({});
const mapDispatch = {
    
};
export default connect(mapState, mapDispatch)(NavDropdownLink);
