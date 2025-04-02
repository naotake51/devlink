import { signup } from "./actions";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div>
      <h1>新規登録</h1>
      <form>
        <div>
          <label htmlFor="email">メールアドレス:</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div>
          <label htmlFor="password">パスワード:</label>
          <input id="password" name="password" type="password" required />
        </div>
        <button formAction={signup}>登録する</button>
      </form>
      <p>
        すでにアカウントをお持ちの方は<Link href="/sign-in">ログイン</Link>
        してください。
      </p>
    </div>
  );
}
