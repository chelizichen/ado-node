import { Collect, Inject } from "../../..";
import { AdoViewTest } from "../../views/test";

@Collect()
export class viewTestService {
  @Inject(AdoViewTest)
  AdoViewTest!: AdoViewTest;
  
  async get_ViewTest() {
    const data1 = await this.AdoViewTest.getList("0", "10"); 
    const data2 = await this.AdoViewTest.getOneBy("1")
    return {
      data1,
      data2
    }
  }
}