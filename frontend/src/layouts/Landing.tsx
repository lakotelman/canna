import LandingHeader from "../components/LandingHeader";


interface Props { 
    children: JSX.Element,
}

export function LandingLayout(props: Props){ 
    return(
        <>
        <LandingHeader/>
        {props.children}
        </>
    )
}