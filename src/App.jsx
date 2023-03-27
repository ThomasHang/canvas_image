/*
 * @Author: ThomasHang 11939838031@qq.com
 * @Date: 2023-03-25 20:04:18
 * @LastEditors: ThomasHang 11939838031@qq.com
 * @LastEditTime: 2023-03-28 00:08:31
 * @FilePath: /canvas_image/src/App.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState, useRef, useEffect } from 'react';
import fire1 from './assets/img1/Normal_20230323095349.jpg';
import fire1_black from './assets/img1/Normal_20230323213824.jpg';
// import fire1 from './assets/tangjiaxiang/tangjiagxiang_normal.jpeg'; //唐家乡
// import fire1_black from './assets/tangjiaxiang/tangjiaxiang_night.jpeg'; //唐家乡

// import fire1_black from './assets/Normal_9_20230323234921.jpg';

import './App.css';

function App() {
  const canvasRef = useRef(null);

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const context = canvas.getContext('2d');
  //   // const ctx = canvas.getContext("2d");
  //   const img = new Image();
  //   img.onload = function () {
  //     canvas.width = img.width;
  //     canvas.height = img.height;
  //     context.drawImage(img, 0, 0, canvas.width, canvas.height);
  //     let frame = context.getImageData(0, 0, canvas.width, canvas.height);
  //     let data = frame.data;
  //     console.log(frame, 'frame');
  //     for (let i = 0; i < data.length; i += 4) {
  //       if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) {
  //         data[i + 3] = 0;
  //       }
  //     }
  //     context.putImageData(frame, 0, 0);
  //     // return;
  //   };
  //   // img.src = fire1;
  //   img.src = fire1_black;

  //   // // 绘制矩形
  //   // context.fillStyle = "#f00";
  //   // context.fillRect(0, 0, canvas.width, canvas.height);

  //   // // 绘制文本
  //   // context.fillStyle = "#fff";
  //   // context.font = "bold 24px Arial";
  //   // context.fillText("Hello, world!", 50, 90);
  //   // 在这里进行canvas渲染逻辑
  // }, [canvasRef.current]);

  // 处理图片黑色背景变透明
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image1 = new Image();
    const image2 = new Image();
    image1.src = fire1;
    image2.src = fire1_black;

    Promise.all([loadImage(image1), loadImage(image2)]).then((images) => {
      canvas.width = image1.width;
      canvas.height = image1.height;
      ctx.drawImage(images[1], 0, 0);

      // canvas.addEventListener("mousemove", newHandleMouseMove);
      // 绘制矩形
      ctx.fillStyle = 'rgba(0, 0, 0, 0)'; // 设置填充色为透明
      ctx.fillRect(186, 844.5, 40, 30);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // 循环遍历像素数据，将黑色像素点转换为透明
      // for (let i = 0; i < data.length; i += 4) {
      //   if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) {
      //     data[i + 3] = 0;
      //   }
      // }
      // ctx.putImageData(imageData, 0, 0);

      // 遍历像素数据，将矩形外的像素颜色值设置为透明
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          if (x < 156 || x > 280 || y < 830 || y >900) {
            const i = (y * canvas.width + x) * 4;
            data[i + 3] = 0; // 设置 alpha 值为 0
          }
        }
      }

      // 将修改后的像素数据绘制到画布上
      ctx.putImageData(imageData, 0, 0);

      // 将第二张图片叠加到第一张图片上
      ctx.globalCompositeOperation = 'destination-over';
      ctx.drawImage(images[0], 0, 0);

      // 将画布内容输出为一张图片
      const outputImage = canvas.toDataURL('image/png');
      console.log(outputImage); // 输
    });

    return () => {
      // 移除鼠标移动事件
      canvas.removeEventListener("mousemove", newHandleMouseMove);
    };
  }, []);


  // 加载图片
  function loadImage(image) {
    return new Promise((resolve, reject) => {
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
    });
  }

  // 鼠标移动事件处理函数
  function handleMouseMove(event) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // 获取鼠标在画布上的位置
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;

    // 获取鼠标位置对应的像素数据
    // const imageData = ctx.getImageData(x, y, 1, 1);
    // 获取范围内的像素数据
    const imageData = ctx.getImageData(
      x - 10, // 左侧范围
      y - 10, // 顶部范围
      20, // 范围宽度
      20, // 范围高度
    );
    const data = imageData.data;

    // 将该范围内的所有像素颜色值设置为透明
    for (let i = 0; i < data.length; i += 4) {
      data[i + 3] = 0; // 设置 alpha 值为 0
    }

    // 将该像素数据中的颜色值设置为透明
    // data[3] = 0;

    // 将修改后的像素数据绘制到画布上
    ctx.putImageData(imageData, x - 10, y - 10);
  }

  const newHandleMouseMove = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log(`x: ${x}, y: ${y}`);
  };

  return (
    <div className="App">
      {/* <div>
        <Img src={fire1} />
      </div> */}
      {/* <div className="canvas_tool"> */}
      <canvas
        ref={canvasRef}
        // onMouseMove={handleMouseMove}
        style={{ backgroundColor: '#fff' }}
      />
      {/* </div> */}
    </div>
  );
}

export default App;
