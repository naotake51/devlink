import { ErrorMessage } from "@/components/error-message";
import { z } from "zod";
import { TabNavigation } from "./_components/tab-navigation";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

interface TabLayoutProps {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

/**
 * @private
 */
export default async function TabLayout({ params, children }: TabLayoutProps) {
  const p = paramsSchema.safeParse(await params);
  if (!p.success) {
    console.error("Invalid parameters:", p.error);
    return <ErrorMessage code={400} />;
  }
  const { id } = p.data;

  return (
    <>
      <TabNavigation projectId={id} />
      {children}
    </>
  );
}
