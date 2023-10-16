import './utils/ignore-warnings';
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {ReactContainerContextProvider, setupDependencies} from '_DI';
import {AppNavigationContainer} from '_navigators';
import type {IContainer} from '_DI';

function App() {
  const [rootContainer, setRootContainer] = useState<IContainer | undefined>(
    undefined,
  );

  useEffect(() => {
    const container = setupDependencies();
    setRootContainer(container);
  }, []);

  if (!rootContainer) return null;

  return (
    <ReactContainerContextProvider value={rootContainer}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <StatusBar
          translucent={true}
          barStyle={'light-content'}
          backgroundColor={'transparent'}
        />
        <AppNavigationContainer />
      </SafeAreaProvider>
    </ReactContainerContextProvider>
  );
}

export default App;
