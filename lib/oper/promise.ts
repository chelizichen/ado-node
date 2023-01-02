import  {EventEmitter} from 'events'
/**
 * @description Promise/A 标准 
 */
var ArcPromise = function(asyncCallBack:(resolve:any,reject:any)=>void){
    this.state = "ready"
    this.data = ""
    this.error = ""
    this.resolve = this.resolve.bind(this)
    this.then = this.then.bind(this)
    this.reject = this.reject.bind(this)
    this.catch = this.catch.bind(this)
    this.Events = new EventEmitter()
    asyncCallBack(this.resolve,this.reject)
}


ArcPromise.prototype.resolve = function<T>(data:T){
    this.state = "resolve"
    this.data = data
    this.Events.emit("success")
}

ArcPromise.prototype.then = function(thenCallBack:any){
    this.Events.on("success", ()=> thenCallBack(this.data))
    return this
}

ArcPromise.prototype.reject = function(error:any){
    this.state = "reject"
    this.error = error
    this.Events.emit("error")

}

ArcPromise.prototype.catch = function(errorCallBack:any){
    this.Events.on("error", ()=> errorCallBack(this.error))
    return this
}

export {
    ArcPromise
}
