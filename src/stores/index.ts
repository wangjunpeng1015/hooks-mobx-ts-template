import React from 'react';

interface Context {
  [_: string]: any;
}
const context: Context = {};

const req = require["context"]('.', true, /Store$/);
req.keys().forEach((key: any) => {
  const name = key.match(/([a-zA-Z0-9].*)$/)[1];
  const Store = req(key).default;
  context[name] = new Store();
});

export const storesContext = React.createContext(context);

export function appStores() {
  return React.useContext(storesContext);
}
