import ping from "./assets/img1/Normal_20230323095349.jpg"; //平塘县
import ping_night from "./assets/img1/Normal_20230323213824.jpg"; //平塘县
import tang from "./assets/tangjiaxiang/tangjiagxiang_normal.jpeg"; //唐家乡
import tang_black from "./assets/tangjiaxiang/tangjiaxiang_night.jpeg"; //唐家乡
import wu from "./assets/img2/wuliangye.jpg"; //五粮液
import wu_night from "./assets/img2/wuliangye_black.jpg"; //五粮液
import mou from "./assets/img3/nong.jpg"; //牟坪镇红农村
import mou_black from "./assets/img3/nong_black.jpg"; //牟坪镇红农村
import deng from "./assets/img4/deng.jpg"; //牟坪镇红农村
import deng_black from "./assets/img4/deng_night.jpg"; //牟坪镇红农村
import jin from "./assets/img5/jin.jpg"; //牟坪镇红农村
import jin_n from "./assets/img5/jin_n.jpg"; //牟坪镇红农村
import { Tabs, TabPane } from "@douyinfe/semi-ui";
import "./App.css";
import RenderCanvas from "./renderCanvas";

function App() {
  return (
    <div className="App">
      <Tabs type="line">
        <TabPane tab="平塘县" itemKey="1">
          <RenderCanvas night={ping_night} day={ping} />
        </TabPane>
        <TabPane tab="唐家乡" itemKey="2">
          <RenderCanvas night={tang_black} day={tang} />
        </TabPane>
        <TabPane tab="五粮液" itemKey="3">
          <RenderCanvas night={wu_night} day={wu} />
        </TabPane>
        <TabPane tab="牟坪镇红农村" itemKey="4">
          <RenderCanvas night={mou_black} day={mou} />
        </TabPane>
        <TabPane tab="登仙公墓" itemKey="5">
          <RenderCanvas night={deng_black} day={deng} />
        </TabPane>
        <TabPane tab="金银坪" itemKey="6">
          <RenderCanvas night={jin_n} day={jin} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
