import './app/configs/database';
import * as http from 'http';
import App from './app/app';
import params from './app/configs/params';

http.createServer(App()).listen(params.apiPort, () => {
    console.log(`Listening ${params.apiPort} port.`);
});
