


interface Props {
    children?: JSX.Element;
    task: any;
    
  }


export default function Task(props: Props) { 
return ( 
    <>
    <li>{props.task.title}</li>
    </>
)
}