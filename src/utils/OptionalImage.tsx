
import Image from "next/image"

export default function OptionalImage(props: any) {
    let {src, alt} = props
    if (src === undefined) {
        return <img alt={alt}></img>
    }
    return <Image {...props} />
}
