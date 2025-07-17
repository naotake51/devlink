"use server";

import { createClient } from "@/utils/supabase/server";

import { actionClient } from "@/lib/safe-action";
import { zfd } from "zod-form-data";

const MAX_UPLOAD_FILE_COUNT = 10;
const MAX_FILE_SIZE_MB = 10;

const inputSchema = zfd.formData({
  files: zfd
    .repeatableOfType(
      zfd.file().refine((file) => file.size <= MAX_FILE_SIZE_MB * 1024 * 1024, {
        message: `ファイルサイズは${MAX_FILE_SIZE_MB}MB以下にしてください。`,
      }),
    )
    .refine((files) => files.length <= MAX_UPLOAD_FILE_COUNT, {
      message: `ファイルは一度に${MAX_UPLOAD_FILE_COUNT}つまでしかアップロードできません。`,
    }),
});

export const uploadFiles = actionClient
  .inputSchema(inputSchema)
  .action(async function ({ parsedInput }) {
    const files = parsedInput.files;

    const supabase = await createClient();

    const result = await Promise.all(
      files.map(async (file) => {
        const extension = file.name.split(".").pop();
        const filePath = `${crypto.randomUUID()}-${Date.now()}.${extension}`;

        const { error } = await supabase.storage
          .from("images")
          .upload(filePath, file);

        if (error) {
          console.error("ファイルのアップロードに失敗しました:", error);
          throw new Error(`ファイルのアップロードに失敗しました:`);
        }

        const { data } = await supabase.storage
          .from("images")
          .getPublicUrl(filePath);

        return {
          fileName: file.name,
          fileType: file.type,
          publicUrl: data.publicUrl,
        };
      }),
    );

    return { result };
  });
