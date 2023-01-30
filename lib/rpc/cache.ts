let cache_buffer = [
  // head 为头
  "##",
  "01", "02", "03", "04", "05", "06", "07", "08", "09",
  "0a", "0b", "0c", "0d", "0e", "0f", "0g", "0h", "0i",
  "0j", "0k", "0l", "0m", "0n", "0o", "0p", "0q", "0r",
  "0s", "0t", "0u", "0v", "0w", "0x", "0y", "0A", "0B", "0C",
  "0D", "0E", "0F", "0G", "0H", "0I", "0J", "0K", "0L", "0M",
  "0N", "0O", "0P", "0Q", "0R", "0S", "0T", "0U", "0V", "0W",
  "0X", "0Y", "0Z",
  "11", "12", "13", "14", "15", "16", "17", "18", "19",
  "1a", "1b", "1c", "1d", "1e", "1f", "1g", "1h", "1i",
  "1j", "1k", "1l", "1m", "1n", "1o", "1p", "1q", "1r",
  "1s", "1t", "1u", "1v", "1w", "1x", "1y", "1A", "1B", "1C",
  "1D", "1E", "1F", "1G", "1H", "1I", "1J", "1K", "1L", "1M",
  "1N", "1O", "1P", "1Q", "1R", "1S", "1T", "1U", "1V", "1W",
  "1X", "1Y", "1Z",
  "21", "22", "23", "24", "25", "26", "27", "28", "29",
  "2a", "2b", "2c", "2d", "2e", "2f", "2g", "2h", "2i",
  "2j", "2k", "2l", "2m", "2n", "2o", "2p", "2q", "2r",
  "2s", "2t", "2u", "2v", "2w", "2x", "2y", "2A", "2B", "2C",
  "2D", "2E", "2F", "2G", "2H", "2I", "2J", "2K", "2L", "2M",
  "2N", "2O", "2P", "2Q", "2R", "2S", "2T", "2U", "2V", "2W",
  "2X", "2Y", "2Z",
  "31", "32", "33", "34", "35", "36", "37", "38", "39",
  "3a", "3b", "3c", "3d", "3e", "3f", "3g", "3h", "3i",
  "3j", "3k", "3l", "3m", "3n", "3o", "3p", "3q", "3r",
  "3s", "3t", "3u", "3v", "3w", "3x", "3y", "3A", "3B", "3C",
  "3D", "3E", "3F", "3G", "3H", "3I", "3J", "3K", "3L", "3M",
  "3N", "3O", "3P", "3Q", "3R", "3S", "3T", "3U", "3V", "3W",
  "3X", "3Y", "3Z",
  "41", "42", "43", "44", "45", "46", "47", "48", "49",
  "4a", "4b", "4c", "4d", "4e", "4f", "4g", "4h", "4i",
  "4j", "4k", "4l", "4m", "4n", "4o", "4p", "4q", "4r",
  "4s", "4t", "4u", "4v", "4w", "4x", "4y", "4A", "4B", "4C",
  "4D", "4E", "4F", "4G", "4H", "4I", "4J", "4K", "4L", "4M",
  "4N", "4O", "4P", "4Q", "4R", "4S", "4T", "4U", "4V", "4W",
  "4X", "4Y", "4Z",

].map(item => {
  return "[" + item + "]"
})
// [##]head:head[#1]key1:value1[#2]key2:value2"

/**
 * @description 使用Buffer作为内存缓存 LRU-cache
 */
class ArcCache {
  public cache: Buffer; // 中位
  private middle: number; // 当前位
  private curr_size: number; // 当前元素个数
  private unchange_size: number; // 不动位 +1 是因为加一个head
  static proto = cache_buffer;
  constructor(public readonly size: number, public readonly timeout: number) {
    this.regular();
    this.middle = size / 2;
    this.curr_size = 1;
    this.unchange_size = size / 10 + 1; // 
    if (this.unchange_size == 0) {
      this.unchange_size = 1;
    }
    this.cache = Buffer.alloc(16384);
    this.cache.write(ArcCache.proto[0] + "<@Arc/Cache><V3.0.0>");
  }
  /**
   * @method set 为内存中设置 <key> <value>
   * @description 定时为
   */
  set(key: string, value: string) {
    if (this.curr_size > this.size) {
      // 走随机删除
      let luck_item = Math.floor(Math.random() * this.size)
      if (luck_item < this.unchange_size) {
        luck_item += this.unchange_size;
      }
      let len = ArcCache.proto[luck_item].length
      let luck_item_index = this.cache.indexOf(ArcCache.proto[luck_item]);
      let next_item = this.cache.indexOf(ArcCache.proto[luck_item + 1])
      if (next_item == -1) {
        // 寻找最后一个元素
        next_item = this.cache.lastIndexOf(">")+1
      }
      let _cache ="<" + key + ">" + "<" + value + ">";
      this.splice(luck_item_index + len, next_item - len - luck_item_index, _cache)
      this.del(key, luck_item);
      return;
    }
    // 找已经被删除的最近的
    for (let _index = 0; _index <= this.size; _index++) {
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
        this.splice(find_end + 1, 1, _cache)
        this.curr_size++
        this.del(key, _index + 1)
        break;
      }
      let split_buffer = this.cache.subarray(curr_item_index, next_item_index);
      if (split_buffer.length == proto_len) {
        let _cache =
          ArcCache.proto[_index] + "<" + key + ">" + "<" + value + ">";
        this.curr_size++
        this.del(key, _index)
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
    for (let _index = 1; _index <= this.size; _index++) {
      let item = ArcCache.proto[_index];
      let next_item = ArcCache.proto[_index + 1];
      let proto_len = item.length;
      let curr_item_index = this.cache.indexOf(item) + proto_len;
      let next_item_index = this.cache.indexOf(next_item);
      if (next_item_index == -1) {
        next_item_index = this.cache.length
        let last_index = this.cache.lastIndexOf(">")
        split_buffer = this.cache.subarray(curr_item_index, last_index + 1);
      } else {
        split_buffer = this.cache.subarray(curr_item_index, next_item_index);
      }
      let { key: _key, value: _value } = this.unpacking(split_buffer);
      if (_key == key) {
        value = _value;
        index = _index;
        this.del(key, index, true)
        break;
      }
    }
    if (value && index) {
      this.tansfer(index, split_buffer as Buffer);
      return value;
    }
    return "数据不存在";
  }
  /**
   * @description 删除键
   * @description 删除策略 保存当前下标 和键，一定时间之后再取出来，如果该键相等，则删除，否则认为该键为活跃键
   */
  del(key: string, index: number, isGet: boolean): void;
  del(key: string, index: number): void;
  del(key: string, index: number, isGet?: boolean): void {
    setTimeout(() => {
      // 不善前面的

      if (this.unchange_size > index) {
        return;
      }
      let item = ArcCache.proto[index]
      let len = ArcCache.proto[index].length
      let next = ArcCache.proto[index + 1]

      let curr_index = this.cache.indexOf(item)
      let next_index = this.cache.indexOf(next)

      if (next_index == -1) {
        next_index = this.cache.lastIndexOf(">") + 1
      }

      let sub_cache = this.cache.subarray(curr_index + len, next_index)
      let { key: _key } = this.unpacking(sub_cache)

      // 如果key 值相等 则删除
      if (_key == key) {
        console.log("删除完之后 还剩 ", this.curr_size," 个数据 ",this.cache.toString());
        this.splice(curr_index + len, next_index - curr_index - len);
        this.curr_size--;
      }
    }, isGet ? this.timeout * 2 : this.timeout)
  }
  /**
   * @description 定时删除
   */
  regular() {
    // setInterval(() => {
      // for (let i = 0; i < this.size; i++) {
        // this.del()
      // }
    // }, 3000);


  }
  /**
   * @description 解包成 key,value 形式
   */
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
      if (after_next_index == -1) {
        after_next_index = this.cache.lastIndexOf(">") + 1
      }

      this.splice(
        after_index + after_index_len,
        after_next_index - after_index - after_index_len,
        symmetry_buffer
      );
    }
  }
  /**
   * @description 类似于 Array.prototype.splice 因为 Buffer 中没有 所以提供了这个方法
   */
  private splice(index: number, subIndex: number, buf: Buffer | string): void
  private splice(index: number, subIndex: number): void
  private splice(index: number, subIndex: number, buf?: Buffer | string) {
    if (typeof buf == "string") {
      buf = Buffer.from(buf)
    }

    let buffer_start: Buffer | null = this.cache.subarray(0, index);

    let buffer_end: Buffer | null = this.cache.subarray(
      subIndex + index,
      this.cache.lastIndexOf(">") + 1
    );
    if (buf) {
      this.cache = Buffer.concat([buffer_start, buf, buffer_end]);
    } else {
      this.cache = Buffer.concat([buffer_start, buffer_end]);
    }
    buffer_start = null;
    buffer_end = null;
  }
}

// let a = new ArcCache(10, 2000)

// a.set("a", "a");
// a.set("b", "b");
// a.set("c", "c");
// a.set("d", "d");
// a.set("e", "e");
// a.set("f", "f");
// a.set("g", "g");
// a.set("h", "h");
// a.set("i", "i");
// a.set("j", "j");
// a.set("k", "k");
// a.set("l", "l");
// a.set("m", "m");
// const data = a.get("g")
// console.log("data", data);
export {
  ArcCache
}