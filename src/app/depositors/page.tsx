import { MainSectionLayout } from "@/components/MainSectionLayout";
import { TestView } from "@/components/TestView";

export default function Home() {
  return (
    <MainSectionLayout title="Depositors" centered>
      <TestView />
    </MainSectionLayout>
  );
}
