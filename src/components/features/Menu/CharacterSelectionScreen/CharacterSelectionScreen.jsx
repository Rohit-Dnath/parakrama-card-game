import "./CharacterSelectionScreen.css";
import CharactersInComponent from "./CharactersInComponent/CharactersInComponent";
import { characterPack } from "../../../../assets/characterPack";
import MiniCharacterCards from "./MiniCharacterCards/MiniCharacterCards";
import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import GameBoard from "../../../GameBoard";
import { useDispatch, useSelector } from "react-redux";
import { setCardBase, setProfile } from "../../hand/handSlice";

export default function CharacterSelectionScreen({ dispatchGameState }) {
  const playCount = useSelector((state) => state.game.playCount);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [lastSelectedCharacterPack, setLastSelectedCharacterPack] =
    useState("");
  const [characters, setCharacters] = useState([null, null]);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectGameMode, setSelectGameMode] = useState(true);
  const [clickAdventureMode, setClickAdventureMode] = useState(false);

  const closeMiniCardsSection = () => {
    setLastSelectedCharacterPack(null);
    setLastSelectedCharacterPack(null);
  };
  const handleCharacterPackChange = useCallback(
    (selectedPack) => {
      const [char1, char2] = characters;
      // If nothing is selected, set selected as player1, and auto-assign the other as player2
      if (!char1 && !char2) {
        // Find the other character
        const allPacks = Object.keys(characterPack);
        const otherPack = allPacks.find((pack) => pack !== selectedPack);
        setCharacters([selectedPack, otherPack]);
      } else if (char1 === selectedPack) {
        // Deselect if clicking the same as player1
        setCharacters([null, null]);
      } else if (char2 === selectedPack) {
        // If clicking player2, make it player1 and swap
        setCharacters([selectedPack, char1]);
      } else {
        // If clicking a new character, make it player1 and previous player1 becomes player2
        setCharacters([selectedPack, char1]);
      }
    },
    [characters, characterPack]
  );

  const startGame = () => {
    const [char1, char2] = characters;
    if (char1 && char2) {
      const characterData = { p1Name: char1, p2Name: char2 };
      dispatch(setCardBase({ characters: characterData }));
      dispatch(setProfile(characterData));
      setGameStarted(true);
      dispatchGameState("playing");
    }
  };

  const handleResetAndGoBack = () => {
    setSelectGameMode(true);
    setClickAdventureMode(false);
    setCharacters([null, null]);
  };

  const renderCharacterImage = (character, playerNum) => {
    if (!character) return null;

    const pennantColor = playerNum === 1 ? "green" : "red";
    const playerClass = playerNum === 1 ? "p1" : "p2";

    return (
      <>
        <img
          className={`absolute ${pennantColor}-pennant`}
          src={`/menu/menu/selection/${pennantColor}-pennant.png`}
          alt={`${pennantColor}-pennant`}
        />
        <img
          className={`relative ${playerClass}-character`}
          src={`/cards/card-images/${character}/${character}.png`}
          alt={`${playerClass}-character`}
        />
        <div className="flex justify-center items-center player-name-container absolute">
          <h1 className={`${playerClass}-character-name`}>
            {t(`player${playerNum}`)}
          </h1>
        </div>
      </>
    );
  };

  const renderGameModeSelection = () => (
    <>
      <div className="flex flex-row justify-center items-center w-full mt-8">
        <button
          className="select-game-mode-button relative px-10 py-5 rounded-2xl bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 shadow-lg hover:from-yellow-400 hover:to-yellow-600 transition-all duration-200 border-4 border-yellow-600 text-3xl font-extrabold text-gray-900 tracking-wide"
          style={{ minWidth: 340 }}
          onClick={() => setSelectGameMode(false)}
        >
          <span
            className="text-black text-3xl drop-shadow-lg"
            style={{
              background: "#ffe066",
              borderRadius: "12px",
              padding: "0.25em 0.75em",
              boxShadow: "0 2px 8px #fff8, 0 1px 1px #0002"
            }}
          >
            {t("Play With Computer")}
          </span>
        </button>
      </div>
    </>
  );

  const renderCharacterSelection = () => (
    <div className="flex flex-row justify-center items-start w-full">
      <div className="flex-1 flex flex-col items-center">
        <h3 className="select-character-title">{t("Select Your Character")}</h3>
        <div className="flex flex-row justify-center items-center">
          {Object.keys(characterPack).map((characterPack) => (
            <CharactersInComponent
              key={characterPack}
              characterPack={characterPack}
              handleCharacterPackChange={handleCharacterPackChange}
              characters={characters}
              handleCharacterPackHover={setLastSelectedCharacterPack}
              handleCharacterPackLeave={() => setLastSelectedCharacterPack("")}
            />
          ))}
        </div>
      </div>
      {/* Buttons on the right side: show if at least one card is selected */}
      {!(characters[0] === null && characters[1] === null) &&
        !selectGameMode &&
        !clickAdventureMode && (
          <div className="flex flex-col items-center ml-12 mt-8">
            <button
              className="start-game-button mb-4"
              onClick={startGame}
            >
              <span className="text-black text-xl">{t("start")}</span>
            </button>
            <button
              className="start-game-button"
              onClick={handleResetAndGoBack}
            >
              <span className="text-black text-xl">{t("goBack")}</span>
            </button>
          </div>
        )}
    </div>
  );

  return (
    <div className="character-selection-screen absolute z-25 flex flex-col items-center w-full min-h-screen bg-transparent">
      {/* Large and centered logo at the top */}
      <div className="w-full flex justify-center mt-8 mb-8">
        <img
          src="/menu/loading/parakrama.png"
          alt="Parākrama"
          style={{
            width: "600px",
            maxWidth: "98vw",
            filter: "drop-shadow(0 8px 32px #0008)",
          }}
        />
      </div>
      <img
        width="33px"
        src="/left-arrow.svg"
        style={{
          height: 59,
          bottom: 0,
          right: 0,
          width: 64,
        }}
        className="pause-button p-2 rounded-md absolute"
        onClick={() => dispatchGameState("menu")}
      />

      <div className="p1-character-container text-5xl font-bold absolute">
        {renderCharacterImage(characters[0], 1)}
      </div>

      <div className="p2-character-container text-5xl font-bold absolute">
        {renderCharacterImage(characters[1], 2)}
      </div>

      <div className="mini-container flex flex-row justify-center items-center w-full">
        <div className="select-character text-2xl font-bold mt-10 absolute p-select flex flex-col w-full items-center">
          {selectGameMode && renderGameModeSelection()}
          {!selectGameMode && !clickAdventureMode && renderCharacterSelection()}
        </div>

        {gameStarted && <GameBoard key={playCount} className="board" />}

        {lastSelectedCharacterPack && (
          <div
            className="mini-cards-section text-sm mt-[280px] w-[800px] text-center absolute p-cards flex items-center justify-center"
            onClick={() => {
              closeMiniCardsSection();
            }}
          >
            <img
              className="absolute mini-character-image-left"
              src={`/cards/card-images/${lastSelectedCharacterPack}/${lastSelectedCharacterPack}.png`}
              alt="selected-character"
            />
            <div className="absolute mini-character-text-container flex items-center justify-center w-[200px]">
              <h3 className="mini-character-title text-center">
                {lastSelectedCharacterPack
                  .split("-")
                  .map((word) => word.toUpperCase())
                  .join(" ")}
              </h3>
              <h3 className="mini-character-text absolute">
                {lastSelectedCharacterPack === "tara-pack"
                  ? "Tara, a fierce incarnation of Lord Shiva's dark aspect, was once famed for her beauty but now bears a curse that steals it away. To break the curse and reclaim her true form, she must defeat 1000 legendary warriors. Her journey is one of darkness, power, and redemption."
                  : lastSelectedCharacterPack === "bhima-pack"
                  ? "Bhishma, the legendary guardian of the Mahabharata, is a titan of honor and indomitable will. Blessed with invincibility and wisdom, he stands as an unbreakable shield on the battlefield. His oath is his power, and his presence inspires both awe and fear. Only the bravest dare to challenge the might of Bhishma."
                  : t(`characterDescription.${lastSelectedCharacterPack}`)}
              </h3>
            </div>
            <div className="mini-character-cards absolute">
              <MiniCharacterCards
                lastSelectedCharacterPack={lastSelectedCharacterPack}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
