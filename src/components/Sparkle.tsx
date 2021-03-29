/**
 * Followed Josh Comeau's guide on animated sparkes
 * https://www.joshwcomeau.com/react/animated-sparkles-in-react/
 */
import React from "react"
import { random, useRandomInterval } from "@utils"
import { styled } from "@material-ui/core"
import { useSpring, animated, config } from "react-spring"
import usePrefersReducedMotion from "hooks/usePrefersReducedMotion"

const DEFAULT_COLOR = "hsl(50deg, 100%, 50%)"

const STAR_PATH = `M35.3122 3.24656L41.0746 20.1211C41.5249 21.4396 42.5604 22.4751 43.8789 22.9254L60.7534 28.6878C63.912 29.7664 63.912 34.2336 60.7534 35.3122L43.8789 41.0746C42.5604 41.5249 41.5249 42.5604 41.0746 43.8789L35.3122 60.7534C34.2336 63.912 29.7664 63.912 28.6878 60.7534L22.9254 43.8789C22.4751 42.5604 21.4396 41.5249 20.1211 41.0746L3.24656 35.3122C0.0879879 34.2336 0.0879889 29.7664 3.24656 28.6878L20.1211 22.9254C21.4396 22.4751 22.4751 21.4396 22.9254 20.1211L28.6878 3.24656C29.7664 0.0879879 34.2336 0.0879889 35.3122 3.24656Z`

const Wrapper = styled("span")({
    display: "inline-block",
    position: "relative",
})

const SparkleWrapper = animated(
    styled("span")({
        position: "absolute",
        display: "block",
    })
)

const SparkleSVG = animated(
    styled("svg")({
        display: "block",
    })
)

const ChildWrapper = styled("strong")({
    position: "relative",
    zIndex: 1,
    fontWeight: "bold",
})

const generateSparkle = (color: string) => ({
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    color,
    size: random(10, 20),
    style: {
        top: `${random(0, 100)}%`,
        left: `${random(0, 100)}%`,
        zIndex: 2,
    },
})

type SparkleProps = {
    color: string
    size: number
    style: {
        top: string
        left: string
        zIndex: number
    }
}

const SparkleInstance = ({ color, size, style }: SparkleProps) => {
    const [finished, setFinished] = React.useState(false)
    const spinStyle = useSpring({
        from: {
            transform: "rotate(0deg)",
        },
        to: {
            transform: "rotate(180deg)",
        },
        config: config.molasses,
    })

    const wrapperStyle = useSpring({
        from: {
            transform: `scale(${finished ? 1 : 0})`,
            ...style,
        },
        to: {
            transform: `scale(${finished ? 0 : 1})`,
            ...style,
        },
        onRest: () => setFinished(true),
        config: finished ? config.molasses : config.gentle,
    })

    return (
        <SparkleWrapper style={wrapperStyle}>
            <SparkleSVG
                style={spinStyle}
                width={size}
                height={size}
                viewBox="0 0 80 80"
                fill="none"
            >
                <path d={STAR_PATH} fill={color} />
            </SparkleSVG>
        </SparkleWrapper>
    )
}

type Props = React.DOMAttributes<HTMLSpanElement> & {
    color?: string
    children: React.ReactNode
}

const Sparkle = ({ color = DEFAULT_COLOR, children, ...rest }: Props) => {
    const prefersReducedMotion = usePrefersReducedMotion()
    const [sparkles, setSparkles] = React.useState(() => [
        generateSparkle(color),
        generateSparkle(color),
        generateSparkle(color),
    ])

    useRandomInterval(
        () => {
            const sparkle = generateSparkle(color)
            const now = Date.now()
            const nextSparkles = sparkles.filter(
                sp => now - sp.createdAt < 1000
            )
            nextSparkles.push(sparkle)
            setSparkles(nextSparkles)
        },
        prefersReducedMotion ? undefined : 50,
        prefersReducedMotion ? undefined : 450
    )

    return (
        <Wrapper {...rest}>
            {sparkles.map(sparkle => (
                <SparkleInstance
                    key={sparkle.id}
                    color={color}
                    size={sparkle.size}
                    style={sparkle.style}
                />
            ))}
            <ChildWrapper>{children}</ChildWrapper>
        </Wrapper>
    )
}

export default Sparkle
