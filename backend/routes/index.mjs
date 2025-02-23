import express from 'express';
import port from '../utils/setPort.mjs';

const app = express();

app.get('/', (req, res) => {
    res.redirect('/mode');
});

//模式路由
import modeRoutes from './modeRoutes.mjs';

app.use(modeRoutes);

//设置路由
import setRoutes from './setRoutes.mjs';

app.use('/set', setRoutes);

//渲染页面路由
import renderRoutes from './renderRoutes.mjs';

app.use('/render', renderRoutes);

app.listen(port, () => {
});

