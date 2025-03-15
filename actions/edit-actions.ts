"use server";

import getDbConnection from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type UpdatePostParams = {
  postId: string;
  content: string;
};

export async function updatePostAction(
  params: UpdatePostParams,
  formData: FormData
): Promise<{ success: boolean }> {
  try {
    const { postId, content } = params;

    const user = await currentUser();
    if (!user) {
      redirect("/sign-in");
    }
    const sql = await getDbConnection();

    await sql`
      UPDATE posts 
      SET content = ${content}
      WHERE id = ${postId}
    `;

    revalidatePath(`/posts/${postId}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating post:", error);
    return { success: false };
  }
}
