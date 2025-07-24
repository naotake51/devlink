import { ErrorMessage } from "@/components/error-message";

export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center">
      <ErrorMessage
        code={404}
        title="指定されたページは存在しません"
        description="お探しのページは存在しないか、削除された可能性があります。"
      />
    </div>
  );
}
