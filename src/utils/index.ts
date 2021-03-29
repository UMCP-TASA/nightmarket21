import React from "react"

export const isBrowser = () => typeof window !== "undefined"

export function getEmbedUrl(url: string) {
    const reg = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g
    const match = reg.exec(url)
    if (match != null) {
        return "https://www.youtube.com/embed/" + match[1]
    }
    return "https://www.youtube.com/embed/A9fdHs1uxGo" //random taiwan vid that should never show up
}

// https://www.joshwcomeau.com/snippets/javascript/random/
export const random = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min)) + min

export const useRandomInterval = (
    callback: () => void,
    minDelay?: number,
    maxDelay?: number
) => {
    const timeoutId = React.useRef<number | undefined>(0)
    const savedCallback = React.useRef(callback)
    React.useEffect(() => {
        savedCallback.current = callback
    })
    React.useEffect(() => {
        if (minDelay && maxDelay) {
            const handleTick = () => {
                const nextTickAt = random(minDelay, maxDelay)
                timeoutId.current = window.setTimeout(() => {
                    savedCallback.current()
                    handleTick()
                }, nextTickAt)
            }
            handleTick()
        }
        return () => window.clearTimeout(timeoutId.current)
    }, [minDelay, maxDelay])
    const cancel = React.useCallback(function () {
        window.clearTimeout(timeoutId.current)
    }, [])
    return cancel
}
