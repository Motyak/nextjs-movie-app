import Link from "next/link"

export default function OptionalLink(props: any) {
    let {href, children} = props
    return href === undefined ? children : (
        <Link {...props}>
            {children}
        </Link>
    )
}
