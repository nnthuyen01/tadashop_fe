import PropTypes from 'prop-types';
import './GlobalStyles.scss';
import './Util.scss';
import './bootstrap.min.css';
function GlobalStyles({ children }) {
    return children;
}
GlobalStyles.propTypes = {
    children: PropTypes.node.isRequired,
};
export default GlobalStyles;
