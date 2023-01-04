
type PromiseCallBack = ()=>Promise<any>
/**
 * @description 异步并发将大量消耗服务器性能
 */
class ArcList{

    // 异步并发数量
    static Limit = 30;
    
    public TaskList:Array<PromiseCallBack>
    public TodoList:Array<PromiseCallBack>
    public isLock = false
    constructor(){
        this.TaskList = []
        this.TodoList = []
    }

    push(PromiseCallBack:PromiseCallBack){
        /**
         * @description 如果 任务队列 数量 大于最大并发数则走 等待队列
         */
        if(this.TaskList.length > ArcList.Limit){
            this.isLock = true
            this.TodoList.push(PromiseCallBack)
        }else{
            this.TaskList.push(PromiseCallBack)
            this.run()
        }
    }

    run(){
        this.TaskList.forEach((el,index)=>{
            
            el().finally(()=>{
                this.TaskList = this.TaskList.splice(index,1)
                this.next()
            })
        })
    }

    next(){
        const todo = this.TodoList.shift()
        if(todo){
            this.TaskList.push(todo)
            this.run()
        }
        return 
    }

}

export {
    ArcList
}