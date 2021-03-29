import React from "react"
import ClientOnly from "components/ClientOnly"

import useIsSignedIn from "hooks/useIsSignedIn"

type Props = {
    signedOut?: React.ReactNode
    signedIn?: React.ReactNode
    children?: React.ReactNode | ((isSignedIn: boolean) => React.ReactNode)
}

const SignInContent = ({ signedOut, signedIn, children }: Props) => {
    const isSignedIn = useIsSignedIn()

    if (typeof children === "function") {
        return <ClientOnly>{children(isSignedIn)}</ClientOnly>
    }

    return (
        <ClientOnly>
            {isSignedIn ? (
                <>
                    {signedIn}
                    {children}
                </>
            ) : (
                <>{signedOut}</>
            )}
        </ClientOnly>
    )
}

export default SignInContent
