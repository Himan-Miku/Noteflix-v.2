import LabeledNotes from "./LabeledNotes";

interface LabeledPageProps {
  params: { labelName: string };
}

export default function LabeledPage({
  params: { labelName },
}: LabeledPageProps) {
  return (
    <main className="cal-h overflow-y-auto overflow-x-hidden scrollbar md:px-20 px-4 md:pt-10 pt-6 md:pb-8">
      <LabeledNotes labelName={labelName} />
    </main>
  );
}
