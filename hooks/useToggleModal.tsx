import { useCallback, useState } from "react"

export default function useToggleModal(ref: React.MutableRefObject<HTMLDivElement | null>, toggleOptionsModal: (e: any) => void ) {
  const [closing, setClosing] = useState(false)

  const handleModalClose = useCallback((e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setClosing(true)
      const timeout = setTimeout(() => toggleOptionsModal(e), 250)
      return () => clearTimeout(timeout)
    }
  }, [toggleOptionsModal, ref])

  return { closing, setClosing, handleModalClose }
}
