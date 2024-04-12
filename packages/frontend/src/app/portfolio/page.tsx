import { MainSectionLayout } from "@/components/MainSectionLayout";
import { TestView } from "@/components/TestView";

export default function Home() {
  return (
    <MainSectionLayout title="Portfolio" centered>
      <TestView />
    </MainSectionLayout>
  );
}
