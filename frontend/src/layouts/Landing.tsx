

interface Props { 
    children: JSX.Element,
}

export function LandingLayout(props: Props){ 
    return(
        <>
        {props.children}
        </>
    )
}