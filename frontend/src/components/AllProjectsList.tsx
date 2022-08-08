interface Props {
  children?: JSX.Element;
}

export default function AllProjectsList(props: Props) {
  return (
    <div id="allProjects" className="tracking-widest leading-8">
      <h2 className="text-2xl">All Projects</h2>
      <hr />
      <ul className="list-disc">
        <li className="px-2">{props.children}</li>
      </ul>
    </div>
  );
}
