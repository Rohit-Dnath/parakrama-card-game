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
    (characterPack) => {
      const [char1, char2] = characters;

      const newCharacters =
        !char1 && !char2
          ? [characterPack, null]
          : characterPack === char1 && !char2
          ? [null, null]
          : char2
          ? characterPack === char2
            ? [null, null]
            : [char1, null]
          : [char1, characterPack];

      setCharacters(newCharacters);
    },
    [characters]
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
      <div className="flex flex-row justify-center items-center">
        <button
          className="select-game-mode-button absolute mt-1"
          onClick={() => setSelectGameMode(false)}
        >
          <span className="text-black text-xl">{t("playWithComputer")}</span>
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
      {/* Buttons on the right side */}
      {!characters.includes(null) &&
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
    <div className="character-selection-screen absolute z-25">
      <div className="middle-image absolute">
        <img src="/menu/loading/parakrama.png" alt="Parākrama" />
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

      <div className="mini-container flex flex-row justify-center items-center">
        <div className="select-character text-2xl font-bold mt-10 absolute p-select flex flex-col">
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
            <div className="absolute mini-character-text-container flex justify-end items-center justify-center w-[200px]">
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
