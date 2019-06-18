import { createServer } from 'http';
import './app/configs/database';
import App from './app/app';
import params from './app/configs/params';

createServer(App()).listen(params.apiPort, () => {
    console.info(`Listening ${params.apiPort} port.`);
});
