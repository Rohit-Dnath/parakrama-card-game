import "./App.css";
import "./styles/fonts.css";
import RotateScreen from "./components/features/Menu/RotateScreen/RotateScreen";
import { useEffect, useState } from "react";
import Menu from "./components/features/Menu/Menu/Menu";
import FishOrnament from "./components/features/UI/FishOrnament";
import { useTranslation } from "react-i18next";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "./constants/dimensions";

function App() {
  const { t } = useTranslation();
  const [windowDimensions, setWindowDimensions] = useState({
    height: WINDOW_HEIGHT,
    width: WINDOW_WIDTH,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        height: WINDOW_HEIGHT,
        width: WINDOW_WIDTH,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (windowDimensions.width <= windowDimensions.height)
    return <RotateScreen />;

  return (
    <div className="screen-container">
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
