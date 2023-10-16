import {createContext, useContext} from 'react';
import type {IContainer} from '_DI';

const ReactContainerContext = createContext<IContainer>({} as IContainer);

export const ReactContainerContextProvider = ReactContainerContext.Provider;

// eslint-disable-next-line react-hooks/rules-of-hooks
export const inject = () => useContext(ReactContainerContext);
