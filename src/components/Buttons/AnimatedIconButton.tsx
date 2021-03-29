import React from "react"
import { IconButton, IconButtonProps } from "@material-ui/core"
import { animated, useSpring } from "react-spring"

type Option = {
    name: string
    from: string
    to: string
}

type Props = IconButtonProps & {
    from: string
    to: string
}

const AnimatedButton = animated(IconButton)

/**
 * Could be expanded to include more options than just transform
 * @param param0
 */
const AnimatedIconButton = ({ from, to, children, ...rest }: Props) => {
    const [hover, setHover] = React.useState(false)
    const styles = useSpring({
        transform: hover ? to : from,
    })

    return (
        // @ts-ignore Because this is animated, it thinks props don't work
        <AnimatedButton
            {...rest}
            style={styles}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {children}
        </AnimatedButton>
    )
}

export default AnimatedIconButton
