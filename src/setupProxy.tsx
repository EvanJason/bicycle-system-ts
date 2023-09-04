// typescript http-proxy-middleware插件 设置可跨域
import * as express from 'express';
import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';

const app = express();

app.use('/juejin', createProxyMiddleware({ target: 'https://e.juejin.cn', changeOrigin: true }));
app.listen(3000);
