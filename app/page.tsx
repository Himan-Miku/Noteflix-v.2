import Form from "@/components/Form";
import Notes from "./Notes";

export default function Home() {
  return (
    <main className="cal-h overflow-y-auto overflow-x-hidden scrollbar px-20 pt-10 pb-8">
      <Form />
      <Notes />
    </main>
  );
}
