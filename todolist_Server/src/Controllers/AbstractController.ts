import { Request, Response } from "express";
import AbstractStore from "Stores/AbstractStore";

export default class AbstractController {
    private _store: AbstractStore;
    constructor(store) {
        this._store = store;
    }

    // Get data API handler
    async GetData(req: Request, res: Response) {
        try {
            await this._store.GetData().then(items => {
                res.send({
                    success: true,
                    data: items
                });
                res.status(200).end();
            })
        } catch (error) {
            console.log(error);
            res.send({
                success: false,
                error: error
            }).status(500).end();
        }
    }

    // Add new data API handler
    async AddData(req: Request, res: Response) {
        try {
            let work = req.body;
            await this._store.AddData(work).then(value => {
                res.send({
                    success: true
                }).status(200).end();
            });
        } catch (error) {
            console.log(error);
            res.send({
                success: false,
                error: error
            }).status(500).end();
        }
    }

    // Delete data by id
    async DeleteData(req: Request, res: Response) {
        try {
            let id = req.body._id;
            await this._store.DeleteDataById(id).then(value => {
                res.send({
                    success: true
                }).status(200).end();
            });
        } catch (error) {
            console.log(error);
            res.send({
                success: false,
                error: error
            }).status(500).end();
        }
    }

    // Get data by id API handler
    async GetDataById(req: Request, res: Response) {
        try {
            let id = req.query.id;
            await this._store.GetDataById(id).then(item => {
                res.send({
                    success: true,
                    data: item
                })
                res.status(200).end();
            })
        } catch (error) {
            console.log(error);
            res.send({
                success: false,
                error: error
            }).status(500).end();
        }
    }

    // Update data API handler
    async UpdateData(req: Request, res: Response) {
        try {
            let id = req.query.id;
            let newValue = req.body;
            await this._store.UpdateData(id, newValue).then(value => {
                res.send({
                    success: true
                }).status(200).end();
            });
        } catch (err) {
            console.log(err);
            res.send({
                success: false,
                error: err
            }).status(500).end();
        }
    }
}