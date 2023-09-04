import React from 'react';
/* 国际化，设置语言，默认为英语 */
import { ConfigProvider } from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';

export default class App extends React.Component {
  render() {
    return (
      /* 项目入口，可以嵌套任何组件 */
      <div>
        {/* 国际化设置 ConfigProvider */}
        <ConfigProvider locale={locale}>
          {this.props.children}
        </ConfigProvider>
      </div>
    );
  }
}