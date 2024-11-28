import { thunk } from 'redux-thunk'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from 'react-redux'
import {rootReducer} from "./store/reducers/root-reducer";
import PrivateRoutes from "./pages/private-route";
import StartPage from "./pages/start-page";
import CodePage from "./pages/code-page";
import { configureStore } from '@reduxjs/toolkit'
import './i18n';
import HomePage from "./pages/home-page";
import PrivateHeader from "./pages/private-header";
import MytestsPage from "./pages/mytests-page";
import CreateTestPage from "./pages/create-test-page";
import CreateRunPage from "./pages/creat-run-page";
import TestRunPage from "./pages/test-run-page";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

function App() {
  return <Provider store={store}>
    <BrowserRouter>
      <Routes>
          <Route element={<StartPage/>} path="/"/>
          <Route element={<CodePage/>} path="/code"/>
          <Route element={<PrivateRoutes />}>
              <Route element={<PrivateHeader/>}>
                  <Route element={<HomePage/>} path={"/home"}/>
                  <Route element={<MytestsPage/>} path={"/mytests"}/>
                  <Route element={<CreateTestPage/>} path={"/create"}/>
                  <Route element={<CreateRunPage/>} path={'/create/run/:testId'}/>
                  <Route element={<TestRunPage/>} path={'/run/:testRunId'}/>
              </Route>
          </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
}

export default App;
