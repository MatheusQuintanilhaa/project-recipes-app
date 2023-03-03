import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import CookContext from './CookContext';

const INITIAL_STATE = { inicial: 'incial' };

function CookProvider({ children }) {
  const [state] = useState(INITIAL_STATE);
  const memo = useMemo(() => ({
    state,
  }), [state]);

  return (
    <CookContext.Provider value={ memo }>{children}</CookContext.Provider>
  );
}

CookProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default CookProvider;

// fonte :https://gist.github.com/ANDREHORMAN1994/e299f113e3e750276e8da0a8982b59f4
