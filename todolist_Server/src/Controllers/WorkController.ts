import {WorkStoreInstance} from "../Stores/WorkStore";
import AbstractController from "./AbstractController";

class WorkController extends AbstractController{
    constructor(store: any) {
        super(store);
    }
}

export const WorkControllerInstance = new WorkController(WorkStoreInstance);