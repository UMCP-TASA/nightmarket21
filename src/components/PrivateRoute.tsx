import React from "react"
import { RouteComponentProps } from "@reach/router"
import { navigate, PageProps } from "gatsby"
import useIsSignedIn from "hooks/useIsSignedIn"

type Props = RouteComponentProps &
    PageProps & {
        component: React.FC<PageProps>
        isSignedIn?: boolean
    }

const PrivateRoute = ({
    component: PageComponent,
    isSignedIn = useIsSignedIn(),
    location,
    ...rest
}: Props) => {
    if (!isSignedIn && location?.pathname !== "/app/signin") {
        navigate("/app/signin")
        return null
    }

    return <PageComponent location={location} {...rest} />
}

export default PrivateRoute
