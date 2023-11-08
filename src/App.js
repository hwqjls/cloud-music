import { IconStyle } from './assets/iconfont/iconfont';
import { GlobalStyle } from './style';

import { Provider } from 'react-redux'
import store from './store/index'

import { RouterProvider } from 'react-router-dom';
import router from './routes/index.js';

import { Data } from './application/Singers/data'

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      <Data>
        <RouterProvider router={router} />
      </Data>
    </Provider>
  );
}

export default App;