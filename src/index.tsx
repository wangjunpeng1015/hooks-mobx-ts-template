import React from 'react';
import { render } from 'react-dom';
import AppRouter from '@/routers/index';
import { ConfigProvider } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
// import 'antd/dist/antd.min.css';
// import './index.scss';

moment.locale('zh-cn');

const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <div>123</div>
      {/* <AppRouter /> */}
    </ConfigProvider>
  );
};

render(<App />, document.getElementById('root'));