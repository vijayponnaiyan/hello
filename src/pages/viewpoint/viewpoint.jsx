import { useState, useEffect } from "react";
import ViewButton from "../../components/Button/ViewButton";

const Viewpoint = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape" && isFullScreen) toggleFullScreen();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullScreen]);

  useEffect(() => {
    setCurrentSlide(0); // Reset to first slide when slides change
  }, [slides]);

  const handlePrev = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  };

  const handleZoomIn = () => {
    setZoom((z) => Math.min(z + 0.1, 3));
  };

  const handleZoomOut = () => {
    setZoom((z) => Math.max(z - 0.1, 0.5));
  };

  const resetZoom = () => {
    setZoom(1);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.log);
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  return (
    <div
      className={`p-4 bg-gray-100 min-h-screen flex flex-col items-center justify-center ${
        isFullScreen ? "fixed inset-0 z-50 bg-white" : ""
      }`}
    >
      {/* Slide Content */}
      <div
        className="border rounded shadow overflow-auto bg-white transition-transform duration-300 p-4"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "top center",
          width: "80%",
          maxWidth: "1000px",
          minHeight: "50vh",
        }}
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="text-xl text-center mt-10 whitespace-pre-wrap">
          {slides && slides.length > 0
            ? slides[currentSlide]
            : "No verse selected yet."}
        </div>
      </div>

      {/* Slide Indicators */}
      {slides && slides.length > 1 && (
        <div className="mt-4 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? "bg-slate-700" : "bg-slate-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Controls */}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <ViewButton onClick={handleZoomOut} ariaLabel="Zoom out">
          − Zoom Out
        </ViewButton>
        <ViewButton onClick={resetZoom} ariaLabel="Reset zoom">
          Reset Zoom
        </ViewButton>
        <ViewButton onClick={handleZoomIn} ariaLabel="Zoom in">
          + Zoom In
        </ViewButton>
        <ViewButton
          onClick={toggleFullScreen}
          ariaLabel={isFullScreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullScreen ? "Exit Fullscreen" : "Full View"}
        </ViewButton>
        <ViewButton
          onClick={handlePrev}
          disabled={currentSlide === 0}
          ariaLabel="Previous slide"
        >
          ← Prev
        </ViewButton>
        <ViewButton
          onClick={handleNext}
          disabled={currentSlide === slides.length - 1}
          ariaLabel="Next slide"
        >
          Next →
        </ViewButton>
      </div>
    </div>
  );
};

export default Viewpoint;
