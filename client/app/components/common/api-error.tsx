import React, { SFC } from 'react';
import posed from 'react-pose';

const Div = posed.div({
  enter: {
    x: 0,
    opacity: 1,
    transition: { duration: 500 },
  },
  exit: {
    x: -100,
    opacity: 0,
    transition: { duration: 500 },
  },
});

const ApiError: SFC<{}> = () => (
  <Div className="alert alert-danger cb-alert-heading error-message" role="alert">
    <h2>500 Internal Error</h2>
    <p>Something went wrong</p>
  </Div>
);

export default ApiError;
