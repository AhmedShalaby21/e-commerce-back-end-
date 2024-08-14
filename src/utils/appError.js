export class appError extends Error{
    constructor(message , statuscode){
        super(message)
        this.statuscode = statuscode
    }
}