import { useState, useCallback, useEffect } from "react";
import * as fabric from "fabric";
import { FabricJSCanvas } from "./components/FabricJSCanvas";
import PaginationComponent from "./components/PaginationComponent";
import "./App.css";
import { fetchImages } from "./api/api";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [canvas, setCanvas] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;
  const totalNumberOfPages = Math.ceil(totalItems / itemsPerPage);

  const handleCanvasCreated = useCallback((canvasInstance) => {
    setCanvas(canvasInstance);
  }, []);

  const searchImages = useCallback(async () => {
    if (!query.trim()) return alert("Please enter a search query.");

    try {
      const data = await fetchImages(query, currentPage, itemsPerPage);
      setImages(data?.photos);
      setTotalItems(data?.total_results);
    } catch (error) {
      alert(error.message);
    }
  }, [query, currentPage]);

  useEffect(() => {
    searchImages();
  }, [currentPage, query, searchImages]);

  const addImageToCanvas = useCallback(
    (url) => {
      if (!canvas) {
        console.error("Canvas instance is not available yet.");
        return;
      }
      var pugImg = new Image();
      pugImg.crossOrigin = "anonymous";
      pugImg.onload = function (img) {
        var pug = new fabric.Image(pugImg, {
          angle: 45,
          width: 500,
          height: 500,
          left: 50,
          top: 70,
          scaleX: 0.25,
          scaleY: 0.25,
        });
        canvas.add(pug);
      };

      pugImg.src = url;
    },
    [canvas]
  );

  const addText = useCallback(() => {
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
  }, [canvas]);

  const addShape = useCallback(
    (type) => {
      if (canvas) {
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
      }
    },
    [canvas]
  );

  const downloadImage = useCallback(() => {
    if (canvas) {
      const dataUrl = canvas.toDataURL({ format: "png" });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "edited-image.png";
      link.click();
    }
  }, [canvas]);

  return (
    <div className="App" style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Image Search and Editor</h2>
      <input
        type="text"
        placeholder="Search images..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "5px" }}
      />
      <button onClick={searchImages} style={{ marginLeft: "10px" }}>
        Search
      </button>

      <div
        style={{
          marginTop: "20px",
          height: "350px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {images.map((img) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "10px",
              }}
            >
              <img
                key={img.id}
                src={img.src.medium}
                alt={img.alt}
                style={{
                  width: "160px",
                  cursor: "pointer",
                  height: "200px",
                }}
              />
              <button
                style={{ marginTop: "10px" }}
                onClick={() => addImageToCanvas(img.src.medium)}
              >
                Add Captions
              </button>
            </div>
          ))}
        </div>

        <PaginationComponent
          currentPage={currentPage}
          totalNumberOfPages={totalNumberOfPages}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <FabricJSCanvas onCanvasCreated={handleCanvasCreated} />
      </div>

      <div style={{ marginTop: "10px" }}>
        <button onClick={addText}>Add Text</button>
        <button onClick={() => addShape("rect")}>Rectangle</button>
        <button onClick={() => addShape("circle")}>Circle</button>
        <button onClick={() => addShape("triangle")}>Triangle</button>
        <button onClick={downloadImage}>Download</button>
      </div>
    </div>
  );
}

export default App;
