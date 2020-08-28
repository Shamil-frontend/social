import React from 'react';
import PropTypes from 'prop-types';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ReactTooltip from 'react-bootstrap/Tooltip';

const Tooltip = ({ title, placement, children }) => (
  <OverlayTrigger placement={placement} overlay={<ReactTooltip id={title}>{title}</ReactTooltip>}>
    {children}
  </OverlayTrigger>
);

Tooltip.defaultProps = {
  placement: 'auto',
};

Tooltip.propTypes = {
  title: PropTypes.string.isRequired,
  placement: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export default Tooltip;
