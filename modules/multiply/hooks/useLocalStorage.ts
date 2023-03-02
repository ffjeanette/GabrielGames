import { useCallback, useEffect, useState } from "react"

const STORAGE_KEYS_PREFIX = "garbiel_games_"

// useLocalstorage hook
function useLocalStorage(key: string, initialValue: any) {
  // Native React useState function which will store value through life span of App
  // we can use state function to initialise stateand it will executed only once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue
    }

    try {
      // try to get value for given key from localstorage
      const item = window.localStorage.getItem(STORAGE_KEYS_PREFIX + key)

      // parse it as at localstorage we will store all value as JSON.stringify
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // if we face any issue parsing or fetching value we return initialValue
      console.log(error)
      return initialValue
    }
  })

  // Our custom function which will act as setter method for our state
  const setValue = useCallback(
    (value: any) => {
      try {
        // to match same API with react's useState we can allow to use Function
        const valueToStore =
          value instanceof Function ? value(storedValue) : value

        // we also save it to local storage for next time usage
        if (typeof window !== "undefined") {
          // do not forget to JSON.stringify as localstorage works on strings
          window.localStorage.setItem(
            STORAGE_KEYS_PREFIX + key,
            JSON.stringify(valueToStore)
          )

          // THIS IS NOT WORKING saving state with given value to actual state
          //FIRING EVENT IS WORKING THOUGH
          setStoredValue(valueToStore)

          const localStorageCustomEvent = new CustomEvent(
            "gabrielsLocalstorageChanged",
            {
              detail: valueToStore,
            }
          )

          window.dispatchEvent(localStorageCustomEvent)
        }
      } catch (error) {
        // if we face issue we just show error in console
        // and will do nothing
        console.log(error)
      }
    },
    [key, storedValue]
  )

  const handleLocalStorageChanged = useCallback((e: any) => {
    /** local storage update is not that fast */
    /** it makes sure that we are getting the new value  */
    setTimeout(() => {
      setStoredValue(e.detail)
    }, 50)
  }, [])

  useEffect(() => {
    window.addEventListener(
      "gabrielsLocalstorageChanged",
      handleLocalStorageChanged
    )
    return () =>
      document.removeEventListener(
        "gabrielsLocalstorageChanged",
        handleLocalStorageChanged
      )
  }, [handleLocalStorageChanged])

  // now return state value and our setter function
  return [storedValue, setValue]
}

export default useLocalStorage
