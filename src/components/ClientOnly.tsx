/**
 * Code from https://joshwcomeau.com/react/the-perils-of-rehydration/
 * Allows for two-pass rendering for dynamic content that won't exist
 * in the first pass of server side rendering
 *
 * Purposely doesn't use typeof window === undefined because we don't want
 * the DOM to have mismatches during rehydration. What this component does is
 * two-pass rendering which is different! See the article linked above for more
 */

import React, { useState, useEffect } from "react"

type Props = {
    children: React.ReactNode
}

const ClientOnly = ({ children }: Props) => {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, [])

    if (!hasMounted) return null

    return <>{children}</>
}

export default ClientOnly
