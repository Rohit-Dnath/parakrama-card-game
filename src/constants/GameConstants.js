export const isDebugging = false;
export default {
  controlDelayWithDebug: (enemyBoardCardTimeout) => (isDebugging ? 0 : enemyBoardCardTimeout),
  enemyTurnTime: isDebugging ? 0 : 6000,
  enemyHandToBoardTime: isDebugging ? 0 : 1000,
  enemyCloseTurnTime: isDebugging ? 0 : 2000,
  totalEnemyWaitTime: isDebugging ? 0 : 5000,
  yourTurnPopupWaitTime: isDebugging ? 0 : 700,

  endTurnDisplayTime: isDebugging ? 0 : 700,
  debugReducedTimeShort: isDebugging ? 0 : 1000,
  debugReducedTimeLoading: isDebugging ? 0 : 7000,
  loadingTime: isDebugging ? 0 : 1000,
  turnDelay: isDebugging ? 0 : 100,
  endGameScreenDelay1: isDebugging ? 0 : 1000,
  endGameScreenDelay2: isDebugging ? 0 : 7000,
};
