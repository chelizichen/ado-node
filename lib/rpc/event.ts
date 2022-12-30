/**
 * @author chelizichen
 * @description @Ado/Rpc/Event 提供注册和调用方法
 * 
 */
class ArcEvent {
  events: Record<string, (...args: any[]) => Promise<any>>;

  constructor() {
    this.events = {};
  }

  /**
   * @description 注册远程方法
   * @param Head -> Buffer
   * @param CallBack -> Function
   */
  register(Head: string, CallBack: (...args: any[]) => Promise<any>) {
    this.events[Head] = CallBack;
  }

  /**
   * @method emit
   * @description 调用远程方法
   */

  async emit(Head: Buffer, ...args: any[]) {
    let head = Head.toString();
    return await this.events[head](...args);
  }
}

export {
  ArcEvent
}