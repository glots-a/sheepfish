import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {persitor, store} from './src/redux/store';
import {Theme} from './src/navigators';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persitor}>
        <GestureHandlerRootView style={{flex: 1}}>
          <Theme />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default App;
