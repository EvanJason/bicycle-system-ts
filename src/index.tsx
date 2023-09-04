import React from 'react';
import ReactDOM from 'react-dom';
import { Config } from './config/public';
import reportWebVitals from './reportWebVitals';

// import App from './App'
// import Home from './pages/route_demo/route1/home'; //路由demo1
// import Router from './pages/route_demo/route3/router'; //路由demo2,demo3
import Router from './router';

/* redux集成进去 */
import { Provider } from 'react-redux'
import configStore from './redux/store/configStore';
import { AppStateProvider } from './components/ContextProvider';
const store = configStore();

ReactDOM.render(
  <AppStateProvider>
    <Provider store={store}>
      <Router />
    </Provider>
  </AppStateProvider>
  ,

  document.getElementById('root')
);
// <React.StrictMode> 严格模式


console.log("\n %c " + Config.getVersion() + " %c Lcar管理系统 ",
  "color: #ffffff; background: #1890ff; padding:5px;font-size:14px;margin: 10px 0 20px;font-family:'Arial','Microsoft YaHei','黑体','宋体',sans-serif;",
  "background: #030307; padding:5px 10px;font-size:14px;color:#ffffff;margin: 10px 0 20px;font-family:'Arial','Microsoft YaHei','黑体','宋体',sans-serif;");

window.document.title = 'Lcar Management System'

/* 上线的版本去除掉控制台打印 */
if (process.env.NODE_ENV === 'production') {
  window.console.log = function () { };
  window.console.warn = function () { };
  window.console.info = function () { };
  window.console.debug = function () { };
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
