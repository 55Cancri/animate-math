import React, { Component } from 'react';

interface Props {
  children: any;
}

export class ErrorBoundary extends Component<Props> {
  state = { hasError: false };

  static getDerivedStateFromError = error =>
    // update state so the next render will show the fallback UI.
    ({ hasError: true });

  componentDidCatch = (error, info) =>
    // you can also log the error to an error reporting service
    // logErrorToMyService(error, info);
    console.log('log error here.', error, info);

  render = () => {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      // you can render any custom fallback ui
      return <h1>Something went wrong.</h1>;
    }

    return children;
  };
}

export default ErrorBoundary;
