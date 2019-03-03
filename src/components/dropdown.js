import React from 'react';
import { createPortal } from 'react-dom';

const { Provider, Consumer } = React.createContext(
  document ? document.body : null
);

const Dropdown = ({ visible, children, disablePortal }) => {
  if (!visible) return null;

  if (disablePortal) {
    return children;
  }

  return (
    <Consumer>
      {contextNode =>
        contextNode ? createPortal(children, contextNode) : null}
    </Consumer>
  );
};

export { Provider };
export default Dropdown;
