import { useState, useRef, useEffect } from "react";
import fire1 from "./assets/img1/Normal_20230323095349.jpg";
import fire1_black from "./assets/img1/Normal_20230323213824.jpg";

import "./App.css";

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // 绘制矩形
    context.fillStyle = "#f00";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制文本
    context.fillStyle = "#fff";
    context.font = "bold 24px Arial";
    context.fillText("Hello, world!", 50, 90);
    // 在这里进行canvas渲染逻辑
  }, [canvasRef.current]);

  return (
    <div className="App">
      <canvas ref={canvasRef} width="500" height="500">
        {/* <img src={fire1} />
        <img src={fire1_black} /> */}
      </canvas>
    </div>
  );
}

export default App;
