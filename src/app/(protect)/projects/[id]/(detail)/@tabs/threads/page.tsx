import "server-only";

/**
 * @private
 */
export default async function UnSelectedThread() {
  return (
    <div className="flex items-center justify-center h-full w-full text-muted-foreground p-8">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">スレッドを選択してください</h3>
        <p className="text-sm">
          左側のリストからスレッドを選択してメッセージを表示します
        </p>
      </div>
    </div>
  );
}
