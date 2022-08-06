import React from 'react';
import { object, func, string } from 'prop-types';

export interface LoadScriptProps {
  attributes: Partial<HTMLScriptElement>;
  onCreate: () => void;
  onError: () => void;
  onLoad: () => void;
  url: string;
}

class LoadScript extends React.Component<LoadScriptProps> {
  static propTypes = {
    attributes: object,
    onCreate: func,
    onError: func.isRequired,
    onLoad: func.isRequired,
    url: string.isRequired,
  };

  static defaultProps: Partial<LoadScriptProps> = {
    onCreate: () => {},
    onError: () => {},
    onLoad: () => {},
  };

  static scriptObservers: {
    [url: string]: {
      [scriptLoaderId: string]: LoadScriptProps;
    };
  } = {};

  static loadedScripts: Record<string, boolean> = {};

  static erroredScripts: Record<string, boolean> = {};

  static idCount = 0;

  scriptLoaderId: string = '';

  constructor(props: LoadScriptProps) {
    super(props);
    this.scriptLoaderId = `id${LoadScript.idCount++}`; // eslint-disable-line space-unary-ops, no-plusplus
  }

  componentDidMount() {
    const { onError, onLoad, url } = this.props;

    if (LoadScript.loadedScripts[url]) {
      onLoad();
      return;
    }

    if (LoadScript.erroredScripts[url]) {
      onError();
      return;
    }

    if (LoadScript.scriptObservers[url]) {
      LoadScript.scriptObservers[url][this.scriptLoaderId] = this.props;
      return;
    }

    LoadScript.scriptObservers[url] = {
      [this.scriptLoaderId]: this.props,
    };

    this.createScript();
  }

  componentWillUnmount() {
    const { url } = this.props;
    const observers = LoadScript.scriptObservers[url];

    if (observers) {
      delete observers[this.scriptLoaderId];
    }
  }

  createScript() {
    const { onCreate, url, attributes } = this.props;
    const script = document.createElement('script');

    onCreate();

    if (attributes) {
      Object.keys(attributes).forEach((prop) => {
        script.setAttribute(prop, attributes[prop as keyof HTMLScriptElement] as string);
      });
    }

    script.src = url;

    if (!script.hasAttribute('async')) {
      script.async = true;
    }

    const callObserverFuncAndRemoveObserver = (
      shouldRemoveObserver: (observer: LoadScriptProps) => boolean,
    ) => {
      const observers = LoadScript.scriptObservers[url];
      Object.keys(observers).forEach((key) => {
        if (shouldRemoveObserver(observers[key])) {
          delete LoadScript.scriptObservers[url][this.scriptLoaderId];
        }
      });
    };
    script.onload = () => {
      LoadScript.loadedScripts[url] = true;
      callObserverFuncAndRemoveObserver((observer) => {
        observer.onLoad();
        return true;
      });
    };

    script.onerror = () => {
      LoadScript.erroredScripts[url] = true;
      callObserverFuncAndRemoveObserver((observer) => {
        observer.onError();
        return true;
      });
    };

    document.body.appendChild(script);
  }

  render() {
    return null;
  }
}

export default LoadScript;
