import { Collect, Inject } from "../../..";
import { AdoViewTest } from "../../views/test";

@Collect()
export class viewTestService {
  @Inject(AdoViewTest)
  AdoViewTest!: AdoViewTest;
  
  async get_ViewTest() {
    return await this.AdoViewTest.getList("0","10") 
  }
}