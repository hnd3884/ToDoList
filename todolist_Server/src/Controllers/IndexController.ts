import WorkStore from "../Stores/WorkStore";

export default class IndexController {
    private _workStore: WorkStore;
    constructor(){
        this._workStore = new WorkStore();
    }

    // Get all works
    GetWorks(req, res){
        this._workStore.GetData().then(items => {
            res.send({
                success: true,
                data: items
            });
            res.status(200).end();
        });
    }

    // Add new work
    AddWork(req, res){
        let work = req.body;
        this._workStore.AddWork(work).then(value => {
            res.status(200).end();
        });
    }

    // Delete work by id
    DeleteWork(req, res){
        let id = req.body._id;
        this._workStore.DeleteWorkById(id).then(value => {
            res.status(200).end();
        });
    }

    // Get work by id
    GetWorkById(req,res){
        let id = req.query.id;
        this._workStore.GetWorkById(id).then(item => {
            res.send(item);
            res.status(200).end();
        });
    }
    
    // Update work
    UpdateWork(req,res){
        let id = req.query.id;
        let newValue = req.body;
        this._workStore.UpdateWork(id, newValue).then(value => {
            res.status(200).end();
        });
    }
}
