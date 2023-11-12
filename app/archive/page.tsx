import ArchivedNotes from "./ArchivedNotes";

export default function Archive() {
  return (
    <main className="cal-h overflow-y-auto overflow-x-hidden scrollbar md:px-20 px-4 md:pt-10 pt-6 md:pb-8">
      <ArchivedNotes />
    </main>
  );
}
