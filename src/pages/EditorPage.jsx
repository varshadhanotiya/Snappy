import React, { useCallback, useEffect, useState } from "react";
import * as fabric from "fabric";
import "./EditorPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FabricJSCanvas } from "../components/FabricJSCanvas";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditorPage = () => {
  const [canvas, setCanvas] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const image = location.state?.image;
    if (!image) {
      navigate("/");
    } else {
      setSelectedImage(image);
    }
  }, [location, navigate]);

  const handleCanvasCreated = useCallback((canvasInstance) => {
    setCanvas(canvasInstance);
  }, []);

  const addImageToCanvas = useCallback(() => {
    if (!canvas || !selectedImage) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const fabricImg = new fabric.Image(img, {
        left: 50,
        top: 50,
        scaleX: 0.25,
        scaleY: 0.25,
      });
      canvas.add(fabricImg);
    };
    img.src = selectedImage;
  }, [canvas, selectedImage]);

  useEffect(() => {
    if (selectedImage) {
      addImageToCanvas();
    }
  }, [selectedImage, addImageToCanvas]);

  const addText = () => {
    if (canvas) {
      const text = new fabric.IText("Editable text", {
        left: 100,
        top: 100,
        fontSize: 24,
        fill: "red",
      });
      canvas.add(text);
      canvas.renderAll();
    }
  };

  const addShape = (type) => {
    if (!canvas) return;
    let shape;

    switch (type) {
      case "rect":
        shape = new fabric.Rect({
          width: 100,
          height: 60,
          fill: "blue",
          left: 150,
          top: 150,
        });
        break;
      case "circle":
        shape = new fabric.Circle({
          radius: 50,
          fill: "red",
          left: 200,
          top: 200,
        });
        break;
      case "triangle":
        shape = new fabric.Triangle({
          width: 100,
          height: 100,
          fill: "green",
          left: 250,
          top: 250,
        });
        break;
      default:
        return;
    }

    canvas.add(shape);
    canvas.renderAll();
  };

  const downloadImage = () => {
    if (canvas) {
      const dataUrl = canvas.toDataURL({ format: "png" });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "edited-image.png";
      link.click();
    }
  };

  const logCanvasObjects = () => {
    if (!canvas) {
      console.log("Canvas is not initialized yet.");
      return;
    }

    const objectsInfo = canvas.getObjects().map((obj, index) => {
      const baseProps = {
        index,
        type: obj.type,
        left: obj.left,
        top: obj.top,
        width: obj.width,
        height: obj.height,
        angle: obj.angle,
        scaleX: obj.scaleX,
        scaleY: obj.scaleY,
      };

      if (obj.type === "image") {
        return {
          ...baseProps,
          src: obj.getSrc?.(),
        };
      }

      if (obj.type === "i-text" || obj.type === "text") {
        return {
          ...baseProps,
          text: obj.text,
          fontSize: obj.fontSize,
          fill: obj.fill,
        };
      }

      return {
        ...baseProps,
        fill: obj.fill,
      };
    });

    console.log("Canvas Layers:", objectsInfo);
  };

  return (
    <div className="editor-container">
      <h2 className="editor-title">Editor</h2>
      {/* <button className="back-button" onClick={() => navigate("/")}>
        Back to Search
      </button> */}
      <ArrowBackIcon className="back-button" onClick={() => navigate("/")} />

      <div className="canvas-wrapper">
        <FabricJSCanvas onCanvasCreated={handleCanvasCreated} />
      </div>

      <div className="controls">
        <button onClick={addText}>Add Text</button>
        <button onClick={() => addShape("rect")}>Rectangle</button>
        <button onClick={() => addShape("circle")}>Circle</button>
        <button onClick={() => addShape("triangle")}>Triangle</button>
        <button onClick={downloadImage}>Download</button>
        <button onClick={logCanvasObjects}>Log Layers</button>
      </div>
    </div>
  );
};

export default EditorPage;
