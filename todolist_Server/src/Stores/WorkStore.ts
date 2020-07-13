import AbstractSrote from './AbstractStore'
import { Work } from './Models/Work'

class WorkStore extends AbstractSrote{
    constructor(model: any){
        super(model);
    }
}

export const WorkStoreInstance =  new WorkStore(Work);