import React from "react"
import { CityFragment } from "graphql-types"
import { getEmbedUrl } from "@utils"

type Props = {
    city: CityFragment | null | undefined
}

export default function City({ city }: Props) {
    if (!city) {
        throw new Error("City does not exist")
    }

    if (!city.frontmatter) {
        throw new Error("Frontmatter does not exist")
    }

    if (!city.frontmatter.imgsrc) {
        throw new Error("Frontmatter does not exist")
    }

    let video = null
    if (city.frontmatter.video) {
        video = (
            <iframe
                src={getEmbedUrl(city.frontmatter.video)}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                frameBorder="0"
                allowFullScreen
                style={{ borderRadius: "7px", width: "100%", height: "35vh" }}
            />
        )
    }

    return (
        <div
            style={{
                position: "relative",
                margin: "0px 20px",
                marginTop: "5%",
                boxShadow: "rgba(0, 0, 0, .2) 0px 0px 5px 2px",
                padding: "5px",
                backgroundColor: "rgba(0,0,0,.1)",
                borderRadius: "7px",
            }}
        >
            <img
                src={city.frontmatter.imgsrc}
                style={{
                    borderRadius: "7px",
                    width: "100%",
                    height: "30vh",
                    objectFit: "cover",
                }}
            />
            <div 
                style={{
                    position: "absolute",
                    top: "15vh",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: 'center',
                    width: '80%'
                }}
            >
                <h1 style={{background: "rgba(255,255,255,.9)", borderRadius: "7px", padding: "0px 5px", width: 'fit-content', margin: '0 auto'}}>
                    {city.frontmatter.name}
                </h1>
                <div style={{background: "rgba(255,255,255,.9)", borderRadius: "7px", padding: "0px 5px"}}dangerouslySetInnerHTML={{ __html: city.html }} />
            </div>
            {video}
        </div>
    )
}
