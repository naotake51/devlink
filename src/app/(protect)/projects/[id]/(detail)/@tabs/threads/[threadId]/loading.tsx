import { Loading as LoadingComponent } from "@/components/loading";

export default function Loading() {
  return (
    <div className="h-[calc(100vh-350px)] flex items-center justify-center">
      <LoadingComponent />
    </div>
  );
}
