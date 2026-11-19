import { HomeView } from "@/components/fieldbook-views";
import { crops } from "@/lib/farming";

export default function Home() {
  return <HomeView crops={crops} />;
}
