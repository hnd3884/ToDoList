import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import Router from './Router';

class App {
    private _app: express.Application;
    private _router: Router;
    constructor() {
        this._app = express();
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({ extended: true }));
        this._app.use(cors());
        this._app.options('*', cors());
        this._router = new Router(this._app);
    }

    public get app(): express.Application {
        return this._app;
    }
}

export default new App().app;