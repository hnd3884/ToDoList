import WorkStore from "../Store/WorkStore";

export default class IndexController {
    private _workStore: WorkStore;
    constructor(){
        this._workStore = new WorkStore();
    }

    // Get all works
    GetWorks(){
        return this._workStore.GetData();
    }

    // Add new work
    AddWork(work){
        return this._workStore.AddWork(work);
    }

    // Delete work by id
    DeleteWork(id){
        return this._workStore.DeleteWorkById(id);
    }

    // Get work by id
    GetWorkById(id){
        return this._workStore.GetWorkById(id);
    }
    
    // Update work
    UpdateWork(id, newValue){
        return this._workStore.UpdateWork(id, newValue);
    }
}
