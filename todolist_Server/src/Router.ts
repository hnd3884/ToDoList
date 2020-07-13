import { Application } from "express";
import {WorkControllerInstance} from "./Controllers/WorkController";
import AbstractController from "Controllers/AbstractController";

export default class Router {
    private _app: Application;
    private _workController: AbstractController;
    constructor(app: Application) {
        this._app = app;
        this._workController = WorkControllerInstance;
        this.WorkRouteHandler();
    }

    //----Work handle route----//
    WorkRouteHandler() {
        this._app.get('/get-works', async (req, res) => this._workController.GetData(req,res));
        this._app.post('/add-work', async (req, res) => this._workController.AddData(req,res));
        this._app.delete('/delete-work', async (req, res) => this._workController.DeleteData(req,res));
        this._app.get('/get-work', async (req, res) => this._workController.GetDataById(req,res,));
        this._app.put('/update-work', async (req, res) => this._workController.UpdateData(req,res));
    }
}