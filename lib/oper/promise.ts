// @ts-nocheck

import  {EventEmitter} from 'events'
/**
 * @description Promise/A 标准 
 */
var ArcPromise = function(asyncCallBack:(resolve,reject)=>void){
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

ArcPromise.prototype.then = function(thenCallBack){
    this.Events.on("success", ()=> thenCallBack(this.data))
    return this
}

ArcPromise.prototype.reject = function(error){
    this.state = "reject"
    this.error = error
    this.Events.emit("error")

}

ArcPromise.prototype.catch = function(errorCallBack){
    this.Events.on("error", ()=> errorCallBack(this.error))
    return this
}

ArcPromise.all = function(AsyncCallBackArray:Array<typeof ArcPromise>){
    if(AsyncCallBackArray instanceof Array){
        let resultArray= []
        let len = AsyncCallBackArray.length
        let newArcPromise = new ArcPromise((resolve)=>{
            AsyncCallBackArray.forEach((el,index)=>{
                if(el instanceof ArcPromise){
                    el.then((data)=>{
                        resultArray[index] = data
                        len--;
                        if(len == 0){
                            resolve(resultArray)
                        }
                    })
                }
            })
        })
        return newArcPromise
    }else{
        throw new Error("all 方法的参数必须为 回调数组")
    }

}
export {
    ArcPromise
}
