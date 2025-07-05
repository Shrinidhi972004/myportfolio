import React from 'react';
import { StyleSheetManager } from 'styled-components';
import { shouldForwardProp } from '../utils/propFilter';

const GlobalStyleManager = ({ children }) => {
  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      {children}
    </StyleSheetManager>
  );
};

export default GlobalStyleManager;
