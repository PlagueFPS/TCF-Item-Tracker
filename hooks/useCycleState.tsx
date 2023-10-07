"use client"

interface Data {
  inGameName: string
  key?: string
}

export default function useCycleState<T extends Data>(staticData: T[], currentData: T, setCurrentData: React.Dispatch<React.SetStateAction<T>>) {
  const cyclePrevState = () => {
    const index = staticData.findIndex(data => data.inGameName === currentData.inGameName || data.key === currentData.key)
    const newIndex = index - 1

    if (newIndex < 0) setCurrentData(staticData[staticData.length - 1])
    else return setCurrentData(staticData[newIndex])
  }

  const cycleNextState = () => {
    const index = staticData.findIndex(data => data.inGameName === currentData.inGameName || data.key === currentData.key)
    const newIndex = index + 1

    if (newIndex < staticData.length) setCurrentData(staticData[newIndex])
    else return setCurrentData(staticData[0])
  }

  return { cyclePrevState, cycleNextState }
}
