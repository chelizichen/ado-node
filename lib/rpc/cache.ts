let cache_buffer = [
  // head 为头
  "#",
  "1", "2", "3", "4", "5", "6", "7", "8", "9",
  "a", "b", "c", "d", "e", "f", "g", "h", "i",
  "j", "k", "l", "m", "n", "o", "p", "q", "r",
  "s", "t", "u", "v", "w", "x", "y", "A", "B", "C",
  "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W",
  "X", "Y", "Z", "<", ">", ",", ".", ";", ":"
].map(item => {
  return "[#" + item + "]"
})
// [##]head:head[#1]key1:value1[#2]key2:value2"

/**
 * @description 使用Buffer作为内存缓存 LRU-cache
 */
class ArcCache {
  public cache: Buffer; // 中位
  private middle: number; // 当前位
  private curr_size: number; // 当前元素个数
  private unchange_size: number; // 不动位
  static proto = cache_buffer;
  constructor(public readonly size: number, public readonly timeout: number) {
    this.regular();
    this.middle = size / 2;
    this.curr_size = 1;
    this.unchange_size = size / 10;
    if (this.unchange_size == 0) {
      this.unchange_size = 1;
    }
    this.cache = Buffer.alloc(16384);
    this.cache.write(ArcCache.proto[0] + "<arc><cache>");
  }
  /**
   * @method set 为内存中设置 <key> <value>
   * @description 定时为
   */
  set(key: string, value: string) {
    if (this.curr_size > ArcCache.proto.length - 1) {
      return;
    }
    for (let _index = 0; _index < ArcCache.proto.length; _index++) {
      let item = ArcCache.proto[_index];
      let next_item = ArcCache.proto[_index + 1];
      let proto_len = item.length;

      // 找到当前位元素和下一个元素
      let curr_item_index = this.cache.indexOf(item) + proto_len;
      let next_item_index = this.cache.indexOf(next_item);

      // 判断是否为尾数 // 如果是最后一个item，则走直接偏移量写入
      if (next_item_index == -1) {
        let find_end = this.cache.lastIndexOf(">")
        let _cache =
          ArcCache.proto[_index + 1] + "<" + key + ">" + "<" + value + ">";
        this.splice(find_end+1, 1, _cache)
        this.curr_size++
        this.del(key,_index+1)
        break;
      }
      let split_buffer = this.cache.subarray(curr_item_index, next_item_index);
      if (split_buffer.length == proto_len) {
        let _cache =
          ArcCache.proto[_index] + "<" + key + ">" + "<" + value + ">";
        this.curr_size++
        this.del(key,_index)
        this.splice(curr_item_index + proto_len, 0, _cache);
        break;
      }
    }
  }
  /**
   * @description 从 cache 中获取到 value 后再进行位转换
   */
  get(key: string) {
    let index;
    let value;
    let split_buffer;
    for (let _index = 1; _index < ArcCache.proto.length; _index++) {
      let item = ArcCache.proto[_index];
      let next_item = ArcCache.proto[_index + 1];
      let proto_len = item.length;
      let curr_item_index = this.cache.indexOf(item) + proto_len;
      let next_item_index = this.cache.indexOf(next_item);
      if (next_item_index == -1) {
        next_item_index = this.cache.length
        let last_index = this.cache.lastIndexOf(">")
        split_buffer = this.cache.subarray(curr_item_index, last_index+1);
      }else{
        split_buffer = this.cache.subarray(curr_item_index, next_item_index);
      }
      let { key: _key, value: _value } = this.unpacking(split_buffer);
      if (_key == key) {
        value = _value;
        index = _index;
        this.del(key,index,true)
        break;
      }
    }
    if (value && index) {
      this.tansfer(index, split_buffer as Buffer);
      return value;
    }
    return "";
  }
  /**
   * @description 删除键
   * @description 删除策略 保存当前下标 和键，一定时间之后再取出来，如果该键相等，则删除，否则认为该键为活跃键
   */
  del(key:string,index:number,isGet:boolean):void;
  del(key:string,index:number):void;
  del(key:string,index:number,isGet?:boolean):void{
    setTimeout(()=>{
      let item = ArcCache.proto[index]
      let len = ArcCache.proto[index].length
      let next = ArcCache.proto[index+1]

      let curr_index = this.cache.indexOf(item)
      let next_index = this.cache.indexOf(next)

      if(next_index == -1){
        next_index = this.cache.lastIndexOf(">")+1
      }
      
      let sub_cache = this.cache.subarray(curr_index+len,next_index)
      let { key:_key} = this.unpacking(sub_cache)
      
      // 如果key 值相等 则删除
      if(_key == key){
        this.splice(curr_index+len,next_index);
        this.curr_size--;
      }
    },isGet?this.timeout*2:this.timeout)
  }
  /**
   * @description 定时删除
   */
  regular() { 
    setInterval(()=>{
      console.log(this.cache.toString());
    },3000)
  }

  private unpacking(buffer: Buffer): {
    key: string;
    value: string;
  } {
    let obj = buffer.toString();
    let array = obj.match(/<(.*?)>/g);
    if (array && array.length == 2) {
      let key = array[0];
      let value = array[1];
      key = key.substring(1, key.length - 1);
      value = value.substring(1, value.length - 1);

      return {
        key,
        value,
      };
    }
    return {
      key: "",
      value: "",
    };
  }

  /**
   * @description 位转换
   */
  private tansfer(index: number, sp_buffer: Buffer) {
    // 不动位
    if (index < this.unchange_size) {
      return;
    }
    // 如果已经存储的数量大于中位线 且 get 的下标大于 一半，则进行转换
    // 先拿到待转移的对称位 再进行转换
    if (this.curr_size > this.middle && index > this.middle) {
      // 对称位
      let symmetry_index = this.size % index;
      // 判断 对称位计算后 是否 在 不变位
      if (symmetry_index < this.unchange_size) {
        symmetry_index += this.unchange_size;
      }
      // 截取对称位的buffer
      let len = ArcCache.proto[symmetry_index].length;
      let symmetry_buf_index = this.cache.indexOf(
        ArcCache.proto[symmetry_index]
      );
      let next_symmetry_index = this.cache.indexOf(
        ArcCache.proto[symmetry_index + 1]
      );
      let symmetry_buffer = this.cache.subarray(
        symmetry_buf_index + len,
        next_symmetry_index
      );
      
      // 交换到前面
      this.splice(
        symmetry_buf_index + len,
        sp_buffer.length,
        sp_buffer
      );
      
      // 交换到后面
      let after_index_len = ArcCache.proto[index].length;
      let after_index = this.cache.indexOf(ArcCache.proto[index]);
      let after_next_index = this.cache.indexOf(ArcCache.proto[index + 1]);
      
      // 判断是否为尾节点
      if(after_next_index == -1){
        after_next_index = this.cache.lastIndexOf(">")+1
      }

      this.splice(
        after_index + after_index_len,
        after_next_index-after_index-after_index_len,
        symmetry_buffer
      );
    }
  }
  /**
   * @description 类似于 Array.prototype.splice 因为 Buffer 中没有 所以提供了这个方法
   */
  private splice(index: number, subIndex: number, buf: Buffer|string):void 
  private splice(index: number, subIndex: number) :void
  private splice(index: number, subIndex: number, buf?: Buffer|string) {
    if (typeof buf == "string") {
      buf = Buffer.from(buf)
    }

    let buffer_start: Buffer | null = this.cache.subarray(0, index);
  
    let buffer_end: Buffer | null = this.cache.subarray(
      subIndex + index,
      this.cache.lastIndexOf(">")+1
    );
    if(buf){
      this.cache = Buffer.concat([buffer_start, buf, buffer_end]);
    }else{
      this.cache = Buffer.concat([buffer_start, buffer_end]);
    }
    buffer_start = null;
    buffer_end = null;
  }
}

let a = new ArcCache(20, 2000)

a.set("a", "a");
a.set("b", "b");
a.set("c", "c");
a.set("d", "d");
a.set("e", "e");
a.set("f", "f");
a.set("g", "g");
a.set("h", "h");
a.set("i", "i");
a.set("j", "j");
a.set("k", "k");
a.set("l", "l");
a.set("m", "m");
// a.get("k")
// a.get("m")


export {
  ArcCache
}