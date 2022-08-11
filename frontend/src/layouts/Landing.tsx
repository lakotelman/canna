import LandingHeader from "../components/LandingHeader";


interface Props { 
    children: JSX.Element,
}

export function LandingLayout(props: Props){ 
    return(
        <>
        <div className="bg-[url('/stacked-waves-haikei.svg')] bg-no-repeat bg-cover">
            <LandingHeader/>
            {props.children}
        </div>
        </>
    )
}