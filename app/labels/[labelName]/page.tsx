import LabeledNotes from "./LabeledNotes";

interface LabeledPageProps {
  params: { labelName: string };
}

export default function LabeledPage({
  params: { labelName },
}: LabeledPageProps) {
  return (
    <main className="cal-h overflow-y-auto overflow-x-hidden scrollbar px-20 pt-10 pb-8">
      <LabeledNotes labelName={labelName} />
    </main>
  );
}
