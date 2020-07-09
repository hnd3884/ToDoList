import { Application } from "express";
import IndexController from "./Controllers/IndexController";

export default class Router {
    private _app: Application;
    private _indexController: IndexController;
    constructor(app: Application) {
        this._app = app;
        this._indexController = new IndexController();
        this.WorkRouteHandler();
    }

    //----Work handle route----//
    WorkRouteHandler() {
        this._app.get('/get-works', async (req, res) => this._indexController.GetWorks(req,res));
        this._app.post('/add-work', async (req, res) => this._indexController.AddWork(req,res));
        this._app.delete('/delete-work', async (req, res) => this._indexController.DeleteWork(req,res));
        this._app.get('/get-work', async (req, res) => this._indexController.GetWorkById(req,res,));
        this._app.put('/update-work', async (req, res) => this._indexController.UpdateWork(req,res));
    }
}