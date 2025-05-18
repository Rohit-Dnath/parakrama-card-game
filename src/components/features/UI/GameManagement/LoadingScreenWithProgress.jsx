import { useSelector } from "react-redux";
import "../../../features/UI/GameManagement/LoadingScreen.css";  

export default function LoadingScreenWithProgress() {
  const loadingProgress = useSelector((state) => state.game.loadingProgress);

  return (
    <div className="loading-screen fixed flex justify-center items-center flex-col">
      <img src="/menu/loading/parakrama.png" alt="Parākrama" />
      <h1 className="loading text-5xl font-bold">Loading... {Math.round(loadingProgress)}%</h1>
      
       <div className="w-[400px] h-[30px] bg-gray-700 rounded-full mt-4 overflow-hidden">
        <div 
          className="h-full bg-yellow-500 transition-all duration-300 ease-out"
          style={{ width: `${loadingProgress}%` }}
        >
        </div>
      </div>

      <p className="text-white mt-2">Please wait while we load the game...</p>
      <p className="text-white mt-2">This may take a few moments.</p>
    </div>
  );
}
