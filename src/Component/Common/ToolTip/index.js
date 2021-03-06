import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.scss';

let popup = null;
let appendAnchor = null;

const createContainer = () => {
    const div = document.createElement('div');
    div.className = 'tool-tip';
    return div;
};

const getAnchor = () => {
    if (appendAnchor) {
        return appendAnchor;
    } else {
        appendAnchor = document.querySelector('#root');
        return appendAnchor;
    }
};

const DIRECTION = {
    TOP: 'top',
    Bottom: 'bottom',
};

/**
 * hover时的提示（文字或自定义组件）
 */
class ToolTipContent extends PureComponent {
    static propTypes = {
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        target: PropTypes.object.isRequired,
    };

    state = {
        left: 0,
        top: 0,
    };

    componentDidMount() {
        this.adjustUI();
    }

    adjustUI = () => {
        const {y, target} = this.props;
        const {clientWidth, clientHeight} = this.refContent;
        const width = parseInt(clientWidth);
        const height = parseInt(clientHeight);
        const rect = target.getBoundingClientRect();
        let margin = 10;
        let left = rect.left + rect.width / 2 - width / 2;
        let top = Math.max(y + margin, rect.bottom + margin);
        let anchor = getAnchor();
        if (left + width > anchor.clientWidth) {
            left = (rect.left - rect.width / 2) - width;
            top = rect.top - height / 2 + rect.height / 2;
        }
        if (top + height > anchor.clientHeight) {
            top = rect.top - rect.height / 2 - height;
        }
        this.setState({
            left, top
        })
    };

    render() {
        const {title} = this.props;
        const {left, top} = this.state;
        return (
            <div className='content'
                 ref={comp => this.refContent = comp}
                 style={{left, top}}>{title}</div>
        );
    }
}

export default class ToolTip extends PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        direction: PropTypes.oneOf(Object.values(DIRECTION)),
        children: PropTypes.object,
    };

    componentWillUnmount() {
        if (popup && popup.isConnected && appendAnchor) {
            ReactDOM.unmountComponentAtNode(popup);
            appendAnchor.removeChild(popup);
        }
    }

    handleMouseEnter = (e) => {
        const {pageX: x, pageY: y, currentTarget: target} = e;
        const {title} = this.props;
        if (!title || title === '') {
            return false;
        }
        if (!popup) {
            popup = createContainer();
        }
        if (!appendAnchor) {
            appendAnchor = getAnchor();
        }
        appendAnchor.appendChild(popup);
        ReactDOM.render(
            <ToolTipContent
                x={x} y={y}
                title={title} target={target}/>, popup)
    };

    handleMouseLeave = (e) => {
        if (popup && popup.isConnected && appendAnchor) {
            ReactDOM.unmountComponentAtNode(popup);
            appendAnchor.removeChild(popup);
        }
    };

    handleClick = (e) => {
        const {onClick, children} = this.props;
        if (onClick) {
            onClick(e);
        } else if (typeof children === 'object' && children.props.onClick) {
            children.props.onClick();
        }
    };

    render() {
        let {children} = this.props;
        if (typeof children !== 'object') {
            children = <span>{children}</span>
        }
        const props = {
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave,
            onClick: this.handleClick,
        };
        return React.cloneElement(children, props);
    }
}