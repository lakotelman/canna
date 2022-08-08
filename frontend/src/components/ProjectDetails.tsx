interface Props {
  children?: JSX.Element;
}

export default function ProjectDetails(props: Props) {
  return (
    <>
      <div id="mileStones" className="leading-8">
        <h3 className="bg-lightGreen mb-4 rounded-r-full px-3">
          Understand Instructions
        </h3>
        <ul className="list-disc list-inside mb-4 mx-4">
          <li>Take Notes as needed</li>
        </ul>
        <h3 className="bg-lightGreen mb-4 rounded-r-full px-3">
          Gather all Pieces
        </h3>
        <ul className="list-disc list-inside mb-4 mx-4">
          <li>Choose fabric</li>
          <li>Iron</li>
          <li>Gather Notions: Zipper etc.</li>
        </ul>
      </div>
    </>
  );
}
