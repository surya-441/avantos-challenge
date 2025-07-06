import Image from "next/image";
import { fetchData } from "./APIrequest";

export default async function Home() {
  const data = await fetchData();
  const forms = data.forms.map((form) => )
  console.log(data);
  return (
  <p>Test</p>
  );
}
