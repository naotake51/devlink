import { signIn } from "./actions";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div>
      <h1>ログイン</h1>
      <form>
        <div>
          <label htmlFor="email">メールアドレス:</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div>
          <label htmlFor="password">パスワード:</label>
          <input id="password" name="password" type="password" required />
        </div>
        <button formAction={signIn}>ログイン</button>
      </form>
      <p>
        アカウントをお持ちでない方は<Link href="/sign-up">新規登録</Link>
        してください。
      </p>
    </div>
  );
}
