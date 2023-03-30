import ArchivedNotes from "./ArchivedNotes";

export default function Archive() {
  return (
    <main className="cal-h overflow-y-auto overflow-x-hidden scrollbar px-20 pt-10 pb-8">
      <ArchivedNotes />
    </main>
  );
}
