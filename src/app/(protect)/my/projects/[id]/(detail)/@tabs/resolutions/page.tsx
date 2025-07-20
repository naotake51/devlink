import { ErrorMessage } from "@/components/error-message";
import z from "zod";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

interface MyProjectResolutionsProps {
  params: Promise<{ id: string }>;
}

export default async function MyProjectResolutions({
  params,
}: MyProjectResolutionsProps) {
  const p = paramsSchema.safeParse(await params);
  if (!p.success) {
    console.error("Invalid parameters:", p.error);
    return <ErrorMessage code={400} />;
  }
  //   const { id } = p.data;

  return <div className="space-y-4 py-2">決議</div>;
}
