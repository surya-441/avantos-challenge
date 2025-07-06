import {
  ActionBlueprintGraphDescriptionType,
  FormType,
} from "@/types/APIresponse";
import { fetchData } from "./APIrequest";

export default async function Home() {
  const data: ActionBlueprintGraphDescriptionType | undefined =
    await fetchData();
  const forms: FormType[] | null | undefined = data?.forms;
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl font-bold underline">Coding Challenge</h1>
      {forms && forms.length > 0 ? (
        forms.map((form) => (
          <div key={form.id} className="w-full max-w-md mt-4">
            <h2 className="text-xl font-semibold mb-2">{form.name}</h2>
            <p className="mb-4">{form.description}</p>
          </div>
        ))
      ) : (
        <p>No forms available</p>
      )}
    </main>
  );
}
