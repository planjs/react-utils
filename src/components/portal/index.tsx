import React from 'react';
import ReactDOM from 'react-dom';

export type PortalRef = {};

export interface PortalProps {
  didUpdate?: (prevProps: PortalProps) => void;
  getContainer: () => Element;
  children?: React.ReactNode;
}

const Portal = React.forwardRef<PortalRef, PortalProps>((props, ref) => {
  const { didUpdate, getContainer, children } = props;

  const containerRef = React.useRef<Element>();

  React.useImperativeHandle(ref, () => ({}));

  const initRef = React.useRef(false);
  if (!initRef.current) {
    containerRef.current = getContainer();
    initRef.current = true;
  }

  React.useEffect(() => {
    didUpdate?.(props);
  });

  React.useEffect(() => {
    return () => {
      containerRef.current?.parentNode?.removeChild(containerRef.current);
    };
  }, []);

  return containerRef.current ? ReactDOM.createPortal(children, containerRef.current) : null;
});

export default Portal;
