import { MainSectionLayout } from "@/components/MainSectionLayout";
import { TestView } from "@/components/TestView";

export default function Home() {
  return (
    <MainSectionLayout title="Activity" centered>
      <TestView />
    </MainSectionLayout>
  );
}
