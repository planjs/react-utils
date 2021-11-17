import React from 'react';
import hoistNonReactStatic from '../utils/hoistNonReactStatic';

function withSafeSetState() {
  return function enhanceWithSafeSetState<T extends typeof React.Component>(WrappedComponent: T) {
    let isMounted = false;
    const { componentDidMount, componentWillUnmount, setState } = WrappedComponent.prototype;

    WrappedComponent.prototype.componentDidMount = function () {
      isMounted = true;
      if (componentDidMount) {
        // @ts-ignore
        // eslint-disable-next-line prefer-rest-params
        componentDidMount.apply(this, arguments);
      }
    };

    WrappedComponent.prototype.componentWillUnmount = function () {
      isMounted = false;
      if (componentWillUnmount) {
        // @ts-ignore
        // eslint-disable-next-line prefer-rest-params
        componentWillUnmount.apply(this, arguments);
      }
    };

    WrappedComponent.prototype.setState = function () {
      if (isMounted && setState) {
        // @ts-ignore
        // eslint-disable-next-line prefer-rest-params
        setState.apply(this, arguments);
      }
    };

    const WithSafeSetState = (props: any) => {
      return <WrappedComponent {...props} />;
    };

    return hoistNonReactStatic(WithSafeSetState, WrappedComponent);
  };
}

export default withSafeSetState;
