"use client"
import { DataTypes } from "@/types/DataTypes"

export default function useCycleState<T extends DataTypes>(staticData: T[], currentState: T, setCurrentState: React.Dispatch<React.SetStateAction<T>>) {
  const cyclePrevState = () => {
    const index = staticData.findIndex(data => 'key' in data && 'key' in currentState ? data.key === currentState.key : data.inGameName === currentState.inGameName)
    const newIndex = index - 1

    if (newIndex < 0) setCurrentState(staticData[staticData.length - 1])
    else return setCurrentState(staticData[newIndex])
  }

  const cycleNextState = () => {
    const index = staticData.findIndex(data => 'key' in data && 'key' in currentState ? data.key === currentState.key : data.inGameName === currentState.inGameName)
    const newIndex = index + 1

    if (newIndex < staticData.length) setCurrentState(staticData[newIndex])
    else return setCurrentState(staticData[0])
  }

  return { cyclePrevState, cycleNextState }
}
