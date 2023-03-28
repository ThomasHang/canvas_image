import React, { useRef, useEffect, useState } from "react";

// 加载图片
function loadImage(image) {
  return new Promise((resolve, reject) => {
    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
  });
}

export default function RenderCanvas(props) {
  const { night, day } = props;
  const [imgs, setImgs] = useState(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image1 = new Image();
    const image2 = new Image();
    image1.src = day;
    image2.src = night;

    Promise.all([loadImage(image1), loadImage(image2)]).then((images) => {
      canvas.width = image1.width;
      canvas.height = image1.height;
      ctx.drawImage(images[1], 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      // 黑色范围
      for (let i = 0; i < data.length; i += 4) {
        // if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) {
        //   data[i + 3] = 0;
        // }
        // if (data[i + 1] === 0 && data[i + 2] === 0) {
        //   data[i + 3] = 0;
        // }
        //  if (data[i] <10 &&data[i + 1] < 10 && data[i + 2] <10) {
        //   data[i + 3] = 0;
        // }
        if (data[i] < 89 && data[i + 1] < 89 && data[i + 2] < 89) {
          data[i + 3] = 0;
        }
      }

      // 将修改后的像素数据绘制到画布上
      ctx.putImageData(imageData, 0, 0);

      // 将第二张图片叠加到第一张图片上
      ctx.globalCompositeOperation = "destination-over";
      ctx.drawImage(images[0], 0, 0);

      // 将画布内容输出为一张图片
      const outputImage = canvas.toDataURL("image/png");
      console.log(outputImage); // 输

      setImgs(outputImage);
    });
  }, []);
  return (
    <div>
      <div className="flex w-full">
        {/* 白天的图片 */}
        <img src={day} alt="" width={"50%"} className="object-contain" />
        {/* 夜晚的图片 */}
        <img src={night} alt="" width={"50%"} className="object-contain" />
      </div>
      {imgs && (
        <div className="flex justify-center">
          <span>结果:</span>
          <img src={imgs} />
        </div>
      )}
    </div>
  );
}
