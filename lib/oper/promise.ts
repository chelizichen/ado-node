// @ts-nocheck

import { EventEmitter } from 'events'


var ArcPromise = function (asyncCallBack) {
    this.state = "ready";
    this.data = "";
    this.error = "";
    this.resolve = this.resolve.bind(this);
    this.then = this.then.bind(this);
    this.reject = this.reject.bind(this);
    this.catch = this.catch.bind(this);
    this.Events = new EventEmitter();
    asyncCallBack(this.resolve, this.reject);
};

ArcPromise.prototype.resolve = function (data) {
    this.state = "resolve";
    this.data = data;
    this.Events.emit("success");
};
/**
 * @description 如果状态已经变更为 resolve 则直接执行 callback 回调函数
 * @param {(reject:data)=>ArcPromise} thenCallBack
 */
ArcPromise.prototype.then = function (thenCallBack) {
    if (this.state == "resolve") {
        thenCallBack(this.data);
    } else {
        this.Events.on("success", () => thenCallBack(this.data));
    }
    return this;
};

ArcPromise.prototype.reject = function (error) {
    this.state = "reject";
    this.error = error;
    this.Events.emit("error");
};

/**
 * @description 如果状态已经变更为 reject 则直接执行 callback 回调函数
 * @param {any} error
 */
ArcPromise.prototype.catch = function (errorCallBack) {
    if (this.state == "reject") {
        thenCallBack(this.data);
    } else {
        this.Events.on("error", () => errorCallBack(this.error));
    }
    return this;
};
/**
 * @description 异步并发执行
 * @param {Array<ArcPromise>} AsyncCallBackArray
 */
ArcPromise.all = function (AsyncCallBackArray) {
    if (AsyncCallBackArray instanceof Array) {
        let resultArray = [];
        let len = AsyncCallBackArray.length;
        let newArcPromise = new ArcPromise((resolve) => {
            AsyncCallBackArray.forEach((el, index) => {
                el.then((data) => {
                    resultArray[index] = data;
                    len--;
                    if (len == 0) {
                        resolve(resultArray);
                    }
                });
            });
        });
        return newArcPromise;
    } else {
        throw new Error("all 方法的参数必须为 回调数组");
    }
};

/**
 * @description 异步竞速 第一个成功或者失败回调
 * @param {Array<ArcPromise>} AsyncCallBackArray
 */
ArcPromise.race = function (AsyncCallBackArray) {
    let is_resolve = false;
    let race_data = "";
    let race_index = 0

    if (AsyncCallBackArray instanceof Array) {
        let newPromise = new ArcPromise((resolve, reject) => {
            AsyncCallBackArray.forEach((el,index) => {
                el.then((res) => {
                    if (is_resolve == false) {
                        is_resolve = true;
                        race_data = res;
                        race_index = index
                        resolve(race_data);

                        AsyncCallBackArray.forEach((el,index)=>{
                            if(index != race_index){
                                el.error = "不调用"
                                el.state = "reject"
                                el.Events.emit("error")
                            }
                        })
                    }
                });
                el.catch(err=>{
                    if (is_resolve == false) {
                        is_resolve = true;
                        race_data = err;
                        race_index = index
                        reject(race_data);

                        AsyncCallBackArray.forEach((el,index)=>{
                            if(index != race_index){
                                el.error = "不调用"
                                el.state = "reject"
                                el.Events.emit("error")
                            }
                        })
                    }
                })
            });
        });
        return newPromise;
    } else {
        throw new Error("all 方法的参数必须为 回调数组");
    }
};

/**
 * @description 一个成功就ret 都失败也ret
 * @param {Array<ArcPromise>} AsyncCallBackArray 
 * @returns ArcPromise
 */
ArcPromise.any = function(AsyncCallBackArray){
    let is_resolve = false;
    let statusArray = []
    let resultArray = new Array(AsyncCallBackArray.length)

    let race_data = "";
    let race_index = 0

    if (AsyncCallBackArray instanceof Array) {
        let newPromise = new ArcPromise((resolve, reject) => {
            AsyncCallBackArray.forEach((el,index) => {
                el.then((res) => {
                    if (is_resolve == false) {
                        is_resolve = true;
                        race_data = res;
                        race_index = index
                        resolve(race_data);
                        AsyncCallBackArray.forEach((el,index)=>{
                            if(index != race_index){
                                el.error = "不调用"
                                el.state = "reject"
                                el.Events.emit("error")
                            }
                        })
                    }
                });
                el.catch(err=>{
                    if(is_resolve){
                        return
                    }
                    statusArray[index] = false
                    resultArray[index] = err
                    if(statusArray.every(el=>!el) && resultArray.length == statusArray.length){
                        // 都失败
                        reject(resultArray)
                    }
                })
            });
        });
        return newPromise;
    } else {
        throw new Error("all 方法的参数必须为 回调数组");
    }
}
export {
    ArcPromise
}
