import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
export default function EndGameScreen() {
  const {t} = useTranslation();
  return (
    <div className="loading-screen fixed flex justify-center items-center flex-col">
      <h2 className="text-3xl">Game Over</h2>
      <span className="text-sm mb-5">
        {t("Refresh the page to play again")}
      </span>
      <p className="loading text-2xl  w-[500px] text-center">
        {t("DRAW :(")}. 

      
      </p>
      
    </div>
  );
}
