/*
 * @Author: 储天航 1193983801@qq.com
 * @Date: 2023-03-28 11:17:37
 * @LastEditors: 储天航 1193983801@qq.com
 * @LastEditTime: 2023-03-28 11:18:17
 * @FilePath: \canvas_image\src\viddeoCanvas.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";

export default function viddeoCanvas() {
  const canvasRef = useRef(null);

  return (
    <div className="App">
      <canvas ref={canvasRef} style={{ backgroundColor: "#fff" }} />
    </div>
  );
}
