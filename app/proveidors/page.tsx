import { getProviders } from "@/lib/wp";
import ProveidorsClient from "./ProveidorsClient";

export default async function Proveidors() {
  const providers = await getProviders(100);
  return <ProveidorsClient providers={providers} />;
}
