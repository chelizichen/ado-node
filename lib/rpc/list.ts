import { Socket } from 'net';

type Task = {
    flag: boolean;
    callback: PromiseCallBack;
};
type PromiseCallBack = () => Promise<any>;

/**
 * @description 异步并发将大量消耗服务器性能,通过控制最大并发量来减轻对服务器的负担
 */
class ArcList {
    // 异步并发数量
    static Limit = 10;
    public TaskList: Array<Task>;
    public TodoList: Array<PromiseCallBack>;
    public isLock: boolean;
    public timer: NodeJS.Timeout | undefined;
    public socket!: Socket;
    constructor() {
        this.TaskList = [];
        this.TodoList = [];
        this.isLock = false;
        this.timer = undefined;
        this.runTask = this.runTask.bind(this)
    }
    /**
     * @description 如果 任务队列 数量 大于最大并发数则走 等待队列
     */
    push(callback: PromiseCallBack) {
        if (this.TaskList.length > ArcList.Limit) {
            this.isLock = true;
            this.TodoList.push(callback);
        } else {
            const flag = false;
            this.TaskList.push({ callback, flag });
            this.run()
        }
    }
    /**
     * @description 给予是否执行标记 保证Promise只执行一次
     * @use 单例模式
     */
    run() {
        if (this.TaskList.length >= ArcList.Limit / 2) {
            this.TaskList.forEach((item, index) => {
                this.runTask(item, index);
            });
        } else if (this.TaskList.length < ArcList.Limit / 2) {
            if (this.timer) {
                this.timer = undefined;
            }
            this.timer = setTimeout(() => {
                this.TaskList.forEach((item, index) => {
                    this.runTask(item, index)
                });
            }, 0);
        }
    }
    /**
     * @description 推入队列中
     */
    next() {
        const callback = this.TodoList.shift();
        const flag = false;

        if (callback) {
            this.TaskList.push({ callback, flag });
        }
        if (!this.isLock) {
            this.run();
        }
    }

    runTask(item: Task, index: number) {
        const { callback, flag } = item;
        if (flag == false) {
            this.TaskList[index].flag = true;
            callback()
                .then((res: any) => {
                    let toJson = JSON.stringify(res);
                    this.socket.write(toJson, function (err) {
                        if (err) {
                            console.log("服务端写入错误", err);
                        }
                        console.log("服务端写入成功");
                    });
                })
                .catch((err: any) => {
                    this.socket.write(err, function (err) {
                        if (err) {
                            console.log("服务端写入错误", err);
                        }
                        console.log("服务端写入成功");
                    });
                })
                .finally(() => {
                    this.TaskList.splice(index, 1);
                    this.next();
                    this.isLock = false;
                });
        }
    }
}

export { ArcList };
