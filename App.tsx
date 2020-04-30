import React, { useEffect } from "react";
import { Provider } from "react-redux";
import AppContainer from "./src/routes/AppNavigator";
import RegisterPush from "./src/helpers/register-push";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import allReducers from "./src/redux/reducers";
import rootSaga from "./src/redux/sagas/rootSaga";
import { AppThemeProvider } from "./themeContext";
import * as Permissions from "expo-permissions";
console.disableYellowBox = true;
const sagaMiddleware = createSagaMiddleware();
let store = createStore(allReducers, applyMiddleware(sagaMiddleware));

const getPermissionAsync = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status !== "granted") {
    alert("Sorry, we need camera roll permissions to make this work!");
  }
};

const MainApp = () => {
  useEffect(() => {
    RegisterPush();
    getPermissionAsync();
  }, []);

  return (
    <Provider store={store}>
      <AppThemeProvider>
        <AppContainer />
      </AppThemeProvider>
    </Provider>
  );
};
sagaMiddleware.run(rootSaga);

export default MainApp;
