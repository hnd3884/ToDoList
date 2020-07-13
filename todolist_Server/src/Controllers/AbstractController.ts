export default class AbstractController {
    private _store: any;
    constructor(store) {
        this._store = store;
    }

    // Get all works
    async GetData(req, res) {
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

    // Add new work
    async AddData(req, res) {
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

    // Delete work by id
    async DeleteData(req, res) {
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

    // Get work by id
    async GetDataById(req, res) {
        try {
            let id = req.query.id;
            await this._store.GetDataById(id).then(item => {
                //res.send(item);
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

    // Update work
    async UpdateData(req, res) {
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