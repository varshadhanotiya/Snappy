import { useEffect, useRef } from "react";
import * as fabric from "fabric";

export const FabricJSCanvas = ({ onCanvasCreated }) => {
  const canvasEl = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasEl.current, {
      width: 720,
      height: 600,
    });
    if (onCanvasCreated) {
      onCanvasCreated(canvas);
    }
    return () => {
      if (canvas) {
        // Ensure canvas exists before disposing
        canvas.dispose();
      }
    };
  }, [onCanvasCreated]); // onCanvasCreated is usually stable

  return <canvas ref={canvasEl} style={{ border: "1px solid #ccc" }} />;
};
