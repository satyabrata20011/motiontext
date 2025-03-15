"use client";

import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";
import { useUploadThing } from "@/utils/uploadthing";
import {
  generateBlogPostAction,
  transcribeUploadedFile,
} from "@/actions/upload-actions";
import { Loader2, Upload, Sparkles, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 32 * 1024 * 1024,
      "File size must not exceed 32MB"
    )
    .refine(
      (file) =>
        file.type.startsWith("audio/") || file.type.startsWith("video/"),
      "File must be an audio or a video file"
    ),
});

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform transition duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100"
      disabled={pending}
    >
      {pending ? (
        <span className="flex items-center justify-center">
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Processing...
        </span>
      ) : (
        <span className="flex items-center justify-center">
          <Sparkles className="w-5 h-5 mr-2" />
          Transcribe & Generate Blog Post
        </span>
      )}
    </Button>
  );
}

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();

  const steps = [
    { title: "Uploading File", description: "Your file is being uploaded" },
    { title: "Transcribing", description: "Converting audio to text" },
    { title: "Generating Blog", description: "Creating your blog post" },
    { title: "Completed", description: "Your blog post is ready!" },
  ];

  const { startUpload } = useUploadThing("videoOrAudioUploader", {
    onClientUploadComplete: () => {
      console.log("✅ File upload completed.");
      setCurrentStep(1);
    },
    onUploadError: (err) => {
      console.error("❌ Error during file upload:", err);
      toast({
        title: "Upload Failed",
        description: "Please try again",
        variant: "destructive",
      });
      setIsProcessing(false);
      setCurrentStep(0);
    },
    onUploadBegin: () => {
      console.log("📤 Starting file upload...");
      setIsProcessing(true);
      setCurrentStep(0);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(`📁 File selected: ${file.name}`);
      setFile(file);
      setCurrentStep(0);
      setIsProcessing(false);
    }
  };

  const handleTranscribe = async (formData: FormData) => {
    const file = formData.get("file") as File;
    const validatedFields = schema.safeParse({ file });

    if (!validatedFields.success) {
      console.warn("⚠️ Invalid file:", validatedFields.error.format());
      toast({
        title: "Invalid File",
        description: "Please upload an audio or video file under 32MB",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log("📤 Uploading file...");
      setIsProcessing(true);

      const resp: any = await startUpload([file]);
      if (!resp) {
        throw new Error("Upload failed");
      }

      console.log("✅ Upload successful. Proceeding to transcription...");
      setCurrentStep(1);

      console.log("🎙️ Starting transcription...");
      const result = await transcribeUploadedFile(resp);
      console.log("📝 Transcription result:", result);

      const { data = null, message = null } = result || {};
      if (!result || (!data && !message)) {
        throw new Error("Transcription failed");
      }

      if (data) {
        console.log("🚀 Transcription successful. Generating blog post...");
        setCurrentStep(2);

        await generateBlogPostAction({
          transcriptions: data.transcriptions,
          userId: data.userId,
        });

        console.log("✅ Blog post generated successfully!");
        setCurrentStep(3);

        toast({
          title: "Success!",
          description: "Your blog post has been created",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("❌ Error occurred during processing:", error);
      toast({
        title: "Error Occurred",
        description: "Please try again",
        variant: "destructive",
      });
      setIsProcessing(false);
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
      }, 3000);
    }
  };

  return (
    <form action={handleTranscribe} className="space-y-8">
      <div className="space-y-6">
        <input
          id="file"
          name="file"
          type="file"
          accept="audio/*,video/*"
          className="hidden"
          onChange={handleFileChange}
          required
        />
        {file && (
          <p className="text-sm text-orange-600 font-medium">
            Selected: {file.name}
          </p>
        )}

        {isProcessing && (
          <div className="w-full py-4">
            <div className="max-w-md mx-auto px-4">
              <div className="flex justify-between mb-4">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300",
                        idx === currentStep
                          ? "border-orange-500 bg-orange-100 text-orange-700"
                          : idx < currentStep
                          ? "border-green-500 bg-green-100 text-green-700"
                          : "border-gray-300 bg-white text-gray-400"
                      )}
                    >
                      {idx < currentStep ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-medium">{idx + 1}</span>
                      )}
                    </div>
                    <div className="text-xs font-medium mt-2">
                      {step.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <SubmitButton />
      </div>
    </form>
  );
}
