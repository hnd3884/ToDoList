import { Application } from "express";
import IndexController from "./Controllers/IndexController";
import * as Config from './Config'

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
        // Get all works route
        this._app.get(Config.TODOLIST_ENDPOINT_GET_ALL_WORKS, async (req, res) => {
            this._indexController.GetWorks().then(items => {
                res.send({
                    success: true,
                    data: items
                });
                res.status(200).end();
            })
        })

        // Add new work route
        this._app.post(Config.TODOLIST_ENDPOINT_ADD_WORK, async (req, res) => {
            this._indexController.AddWork(req.body).then(value => {
                res.status(200).end();
            });
        })

        // Delete work by id route
        this._app.delete(Config.TODOLIST_ENDPOINT_DELETE_WORK, async (req, res) => {
            this._indexController.DeleteWork(req.body._id).then(value => {
                res.status(200).end();
            });
        })

        // Get work by id route
        this._app.get(Config.TODOLIST_ENDPOINT_GET_WORK_BY_ID, async (req, res) => {
            this._indexController.GetWorkById(req.query.id.toString()).then(item => {
                res.send(item);
                res.status(200).end();
            });
        })

        // Update work
        this._app.put(Config.TODOLIST_ENDPOINT_UPDATE_WORK, async (req, res) => {
            this._indexController.UpdateWork(req.query.id.toString(), req.body).then(value => {
                res.status(200).end();
            })
        })
    }
}