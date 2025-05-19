import { useEffect } from "react";
import "./Menu.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setGameState,
  setResourcesLoaded,
  setLoadingProgress,
} from "../../game/gameSlice";
import CharacterSelectionScreen from "../CharacterSelectionScreen/CharacterSelectionScreen.jsx";
import { useTranslation } from "react-i18next";
import GameBoard from "../../../GameBoard.jsx";
import LoadingScreen from "../../UI/GameManagement/LoadingScreen.jsx";
import EndGameScreen from "../../UI/GameManagement/EndGameScreen.jsx";
import LoadingScreenWithProgress from "../../UI/GameManagement/LoadingScreenWithProgress.jsx";
import GameConstants from "../../../../constants/GameConstants.js";
import CharacterFloating from "../../UI/CharacterFloating";

export default function Menu() {
  const { t } = useTranslation();
  const gameState = useSelector((state) => state.game.gameState);
  const resourcesLoaded = useSelector((state) => state.game.resourcesLoaded);
  const dispatch = useDispatch();

  useEffect(() => {
    const preloadResources = async () => {
      try {
        const imagesToPreload = [
          "/armor-bar.png",
          "/health-bar.png",
          "/menu/menu/bg-outer.png",
          "/menu/loading/parakrama.png",
          "/bg-dark.png",
          "/parakrama-board.png",
          "/menu/menu/selection/green-pennant.png",
          "/menu/menu/selection/red-pennant.png",
          "/menu/menu/selection/mini-bg.png",
        ];

        let loadedImages = 0;
        const totalImages = imagesToPreload.length;

        const imagePromises = imagesToPreload.map((src) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
              loadedImages++;
              const progress = (loadedImages / totalImages) * 100;
              dispatch(setLoadingProgress(progress));
              resolve();
            };
            img.onerror = reject;
          });
        });

        await Promise.all(imagePromises);
        dispatch(setResourcesLoaded(true));
      } catch (error) {
        dispatch(setResourcesLoaded(true));
      }
    };

    if (!resourcesLoaded) {
      preloadResources();
    }
  }, [dispatch, resourcesLoaded]);

  const dispatchGameState = (state) => {
    if (
      state === "characterSelection" ||
      state === "playing" ||
      state === "menu"
    ) {
      dispatch(setGameState("loading"));
      setTimeout(() => {
        dispatch(setGameState(state));
      }, GameConstants.loadingTime);
    } else {
      dispatch(setGameState(state));
    }
  };

  // Add a function to play the click sound
  const playClickSound = () => {
    const audio = new Audio("/sounds/click.wav");
    audio.play();
  };
  // Add a function to play the hover sound
  const playHoverSound = () => {
    const audio = new Audio("/sounds/hover.mp3");
    audio.play();
  };

  if (!resourcesLoaded) {
    return <LoadingScreenWithProgress />;
  }

  if (gameState === "gameOver") {
    return <EndGameScreen />;
  } else if (gameState === "loading") {
    return <LoadingScreen />;
  } else if (gameState === "characterSelection") {
    return (
      <div>
        <div className="bg-outer absolute z-20 bg">
          <CharacterSelectionScreen dispatchGameState={dispatchGameState} />
        </div>
      </div>
    );
  } else if (gameState === "playing" || gameState === "pause") {
    return (
      <div>
        <GameBoard className="board " />
      </div>
    );
  }

  return (
    gameState === "menu" && (
      <div className="bg-outer absolute z-20" >
        {/* Add character floating components only when in menu state */}
        <CharacterFloating side="left" image="/bhima-full.png" />
        <CharacterFloating side="right" image="/tara-full.png" />
        <div className="menu flex flex-col items-center justify-center text-center space-y-4 gap-3">
          {/* Logo at the very top */}
          <img
            src="/parakrama.png"
            alt="Parakrama"
            style={{
              width: "420px", // Increased from 320px to 420px
              maxWidth: "98vw", // Slightly increased for responsiveness
              marginTop: "-33.5rem", // Move logo much higher
              marginBottom: "1rem",
              filter: "drop-shadow(0 4px 16px #fff8)",
              
            }}
          />
          {/* START button (position unchanged) */}
          <p
            onClick={() => {
              playClickSound();
              dispatchGameState("characterSelection");
            }}
            onMouseOver={playHoverSound}
            className="px-4 py-2 menu-item"
            style={{
              color: "#182c39", 
              fontWeight: "bold",
              fontSize: "2rem",
              textShadow: "0 2px 8px #fff, 0 1px 1px #000",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "color 0.2s",
              marginTop: "0",
              marginBottom: "1rem"
            }}
          >
            {t("START")}
          </p>
        </div>
      </div>
    )
  );
}
