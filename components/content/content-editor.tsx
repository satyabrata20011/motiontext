"use client";

import { useCallback, useState } from "react";
import BgGradient from "../common/bg-gradient";
import { ForwardRefEditor } from "./forward-ref-editor";
import { useFormState, useFormStatus } from "react-dom";
import { updatePostAction } from "@/actions/edit-actions";
import { Button } from "../ui/button";
import { Download, Edit2, Loader2 } from "lucide-react";
import * as Toast from "@radix-ui/react-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className={`w-40 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg transform transition duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500`}
      disabled={pending}
    >
      {pending ? (
        <span className="flex items-center justify-center">
          <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Updating...
        </span>
      ) : (
        <span className="flex items-center justify-center">
          <Edit2 className="w-5 h-5 mr-2" />
          Update Changes
        </span>
      )}
    </Button>
  );
}

const initialState = {
  success: false,
};

type UploadState = {
  success: boolean;
};

type UploadAction = (
  state: UploadState,
  formData: FormData
) => Promise<UploadState>;

export default function ContentEditor({
  posts,
}: {
  posts: Array<{ content: string; title: string; id: string }>;
}) {
  const [content, setContent] = useState(posts[0].content);
  const [isChanged, setIsChanged] = useState(false);
  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    title: "",
    type: "success",
  });

  const updatedPostActionWithId = async (
    state: UploadState,
    formData: FormData
  ) => {
    const result = await updatePostAction(
      { postId: posts[0].id, content },
      formData
    );

    if (result.success) {
      setToastMessage({ title: "Post updated successfully", type: "success" });
      setIsChanged(false);
    } else {
      setToastMessage({ title: "Failed to update post", type: "error" });
    }
    setOpen(true);
    return result;
  };

  const [state, formAction] = useFormState(
    updatedPostActionWithId,
    initialState
  );

  const handleContentChange = (value: string) => {
    setContent(value);
    setIsChanged(true);
  };

  const handleExport = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const filename = `${posts[0].title || "blog-post"}.md`;

      const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    [content, posts]
  );

  return (
    <>
      <form action={formAction} className="flex flex-col gap-2">
        <div className="flex justify-between items-center border-b-2 border-gray-200/50 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-black mb-2 flex items-center gap-2">
              📝 Edit your post
            </h2>
            <p className="text-gray-600">
              Start editing your blog post below...
            </p>
          </div>
          <div className="flex gap-4">
            <SubmitButton></SubmitButton>
            <Button
              onClick={handleExport}
              type="button"
              className="w-40 bg-gradient-to-r from-orange-600 to-amber-700 hover:from-orange-700 hover:to-amber-800 text-white font-semibold py-2 px-4 rounded-full shadow-lg transform transition duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <Download className="w-5 h-5 mr-2" />
              Export Blog
            </Button>
          </div>
        </div>
        <BgGradient className="opacity-20">
          <ForwardRefEditor
            markdown={posts[0].content}
            className="markdown-content border-dotted border-gray-200 border-2 p-4 rounded-md animate-in ease-in-out duration-75"
            onChange={handleContentChange}
          ></ForwardRefEditor>
        </BgGradient>
      </form>
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className={`${
            toastMessage.type === "error" ? "bg-red-100" : "bg-green-100"
          } rounded-md shadow-lg p-4 fixed bottom-4 right-4`}
          open={open}
          onOpenChange={setOpen}
        >
          <Toast.Title className="font-medium">
            {toastMessage.title}
          </Toast.Title>
          <Toast.Action asChild altText="close">
            <button className="absolute top-1 right-1 p-1">×</button>
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport />
      </Toast.Provider>
    </>
  );
}
