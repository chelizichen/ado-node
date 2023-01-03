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
                if (el instanceof ArcPromise) {
                    el.then((data) => {
                        resultArray[index] = data;
                        len--;
                        if (len == 0) {
                            resolve(resultArray);
                        }
                    });
                }
            });
        });
        return newArcPromise;
    } else {
        throw new Error("all 方法的参数必须为 回调数组");
    }
};

/**
 * @description 异步竞速
 * @param {Array<ArcPromise>} AsyncCallBackArray
 */
ArcPromise.race = function (AsyncCallBackArray) {
    let is_resolve = false;
    let race_data = "";

    if (AsyncCallBackArray instanceof Array) {
        let newPromise = new ArcPromise((resolve, reject) => {
            AsyncCallBackArray.forEach((el) => {
                el.then((res) => {
                    if (is_resolve == false) {
                        is_resolve = true;
                        race_data = res;
                        resolve(race_data);
                    }
                });
            });
        });
        return newPromise;
    } else {
        throw new Error("all 方法的参数必须为 回调数组");
    }
};
export {
    ArcPromise
}
