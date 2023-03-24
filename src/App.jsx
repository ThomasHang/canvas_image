import { useState, useRef, useEffect } from "react";
import fire1 from "./assets/img1/Normal_20230323095349.jpg";
import fire1_black from "./assets/img1/Normal_20230323213824.jpg";

import "./App.css";

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    // const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      let frame = context.getImageData(0, 0, canvas.width, canvas.height);
      let l = frame.data.length / 4;
      console.log(frame, "frame");
      for (let i = 0; i < l; i++) {
        let r = frame.data[i * 4 + 0];
        let g = frame.data[i * 4 + 1];
        let b = frame.data[i * 4 + 2];
        if (g > 100 && r > 100 && b < 43) frame.data[i * 4 + 3] = 0;
      }
      context.putImageData(frame, 0, 0);
      // return;
    };
    // img.src = fire1;
    img.src = fire1_black;

    // // 绘制矩形
    // context.fillStyle = "#f00";
    // context.fillRect(0, 0, canvas.width, canvas.height);

    // // 绘制文本
    // context.fillStyle = "#fff";
    // context.font = "bold 24px Arial";
    // context.fillText("Hello, world!", 50, 90);
    // 在这里进行canvas渲染逻辑
  }, [canvasRef.current]);

  return (
    <div className="App">
      <canvas ref={canvasRef}>
        {/* <img src={fire1} />
        <img src={fire1_black} /> */}
      </canvas>
    </div>
  );
}

export default App;
