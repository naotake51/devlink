-- Create trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  username TEXT;
  avatar   TEXT;
  provider TEXT;
BEGIN
  -- 認証プロバイダーを確認
  provider := NEW.raw_app_meta_data->>'provider';

  -- プロバイダー別に適切なフィールドから名前、アバター画像を取得
  IF provider = 'github' THEN
    username := COALESCE(NEW.raw_user_meta_data->>'user_name', NEW.raw_user_meta_data->>'preferred_username');
    avatar := NEW.raw_user_meta_data->>'avatar_url';
  ELSIF provider = 'google' THEN
    username := COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name');
    avatar := COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture');
  ELSE
    -- その他のプロバイダーや通常のサインアップ
    IF NEW.email IS NOT NULL THEN
      username := split_part(NEW.email, '@', 1);
    ELSE
      username := 'User' || substr(NEW.id::text, 1, 8);
    END IF;
  END IF;

  -- ユーザー名が空の場合のフォールバック
  IF username IS NULL OR username = '' THEN
    username := 'User' || substr(NEW.id::text, 1, 8);
  END IF;

  INSERT INTO public."Profile" ("id", "displayName", "avatarUrl")
  VALUES (NEW.id, username, avatar);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
