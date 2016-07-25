import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';

const Loader = () => (
  <LinearProgress 
    mode="indeterminate"
    color={"#000"}
  />
);

export default Loader;