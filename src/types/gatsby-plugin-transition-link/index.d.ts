declare module "gatsby-plugin-transition-link" {
    export interface TransitionProps {
        state: {}
        delay: number
        length: number
    }
    export interface TransitionPageProps {
        transitionStatus: "entering" | "entered" | "exiting"
        exit: TransitionProps
        entry: TransitionProps
    }
}
