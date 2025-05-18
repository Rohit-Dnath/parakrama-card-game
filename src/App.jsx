import "./App.css";
import "./styles/fonts.css";
import RotateScreen from "./components/features/Menu/RotateScreen/RotateScreen";
import { useEffect, useState, useRef } from "react";
import Menu from "./components/features/Menu/Menu/Menu";
import FishOrnament from "./components/features/UI/FishOrnament";
import { useTranslation } from "react-i18next";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "./constants/dimensions";
import backgroundMusic from "./assets/bg-music.mp3";

function App() {
  const { t } = useTranslation();
  const [windowDimensions, setWindowDimensions] = useState({
    height: WINDOW_HEIGHT,
    width: WINDOW_WIDTH,
  });
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        height: WINDOW_HEIGHT,
        width: WINDOW_WIDTH,
      });
    };

    window.addEventListener("resize", handleResize);

    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.loop = true;
      // Play on user interaction to avoid autoplay restrictions
      const playAudio = () => {
        audioRef.current.play().catch(() => {});
        document.removeEventListener("click", playAudio);
      };
      document.addEventListener("click", playAudio);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", playAudio);
    };
  }, []);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
    }
  };

  if (windowDimensions.width <= windowDimensions.height)
    return <RotateScreen />;

  return (
    <div className="screen-container">
      {/* Background Music */}
      <audio ref={audioRef} src={backgroundMusic} autoPlay loop />
      {/* Mute/Unmute Button - Larger and floating */}
      <button
        className="mute-button"
        onClick={toggleMute}
        style={{
          position: "fixed",
          top: 30,
          right: 30,
          zIndex: 1000,
          background: "none",
          border: "none",
          borderRadius: "50%",
          width: 90,
          height: 90,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          padding: 0,
          animation: "float 3s ease-in-out infinite",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        }}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <img 
            src="/mute-btn.png" 
            alt="Unmute" 
            style={{ width: 60, height: 60 }} 
          />
        ) : (
          <img 
            src="/unmute-btn.png" 
            alt="Mute" 
            style={{ width: 60, height: 60 }} 
          />
        )}
      </button>
      <div className="bg-container">
        <div className="menu absolute">
          <Menu />
          <FishOrnament />
        </div>
      </div>
    </div>
  );
}

export default App;
