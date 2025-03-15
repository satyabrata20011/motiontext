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
import { useState, useEffect } from "react";
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
      setCurrentStep(1); // Move to transcribing step
    },
    onUploadError: (err) => {
      console.error("Error occurred", err);
      toast({
        title: "Upload Failed",
        description: "Please try again",
        variant: "destructive",
      });
      setIsProcessing(false);
      setCurrentStep(0);
    },
    onUploadBegin: () => {
      setIsProcessing(true);
      setCurrentStep(0); // Start with uploading step
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setCurrentStep(0);
      setIsProcessing(false);
    }
  };

  const handleTranscribe = async (formData: FormData) => {
    const file = formData.get("file") as File;
    const validatedFields = schema.safeParse({ file });

    if (!validatedFields.success) {
      toast({
        title: "Invalid File",
        description: "Please upload an audio or video file under 32MB",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsProcessing(true);
      const resp: any = await startUpload([file]);

      if (!resp) {
        throw new Error("Upload failed");
      }

      setCurrentStep(1); // Move to transcribing step
      const result = await transcribeUploadedFile(resp);
      const { data = null, message = null } = result || {};

      if (!result || (!data && !message)) {
        throw new Error("Transcription failed");
      }

      if (data) {
        setCurrentStep(2); // Move to generating blog post step
        await generateBlogPostAction({
          transcriptions: data.transcriptions,
          userId: data.userId,
        });
        setCurrentStep(3); // Move to completed step

        toast({
          title: "Success!",
          description: "Your blog post has been created",
          variant: "default",
        });
      }
    } catch (error) {
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
        <div className="flex flex-col items-center justify-center w-full">
          <label
            htmlFor="file"
            className={cn(
              "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer",
              "bg-gray-50 hover:bg-gray-100 transition-colors duration-200",
              file ? "border-orange-300" : "border-gray-300"
            )}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
              <Upload
                className={cn(
                  "w-10 h-10 mb-3 transition-colors duration-200",
                  file ? "text-orange-500" : "text-gray-400"
                )}
              />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span>
              </p>
              <p className="text-xs text-gray-500">
                Audio (MP3, WAV) or Video (MP4) up to 32MB
              </p>
              {file && (
                <p className="mt-2 text-sm text-orange-600 font-medium">
                  Selected: {file.name}
                </p>
              )}
            </div>
            <input
              id="file"
              name="file"
              type="file"
              accept="audio/*,video/*"
              className="hidden"
              onChange={handleFileChange}
              required
            />
          </label>
        </div>

        {isProcessing && (
          <div className="w-full py-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="max-w-md mx-auto px-4">
              {/* Steps indicator */}
              <div className="flex justify-between mb-4">
                {steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center relative"
                  >
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
                    <div className="text-xs font-medium mt-2 text-center max-w-[70px]">
                      {step.title}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="relative w-full h-2 bg-gray-200 rounded-full mb-4">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-amber-600 rounded-full transition-all duration-500 ease-in-out"
                  style={{
                    width: `${(currentStep / (steps.length - 1)) * 100}%`,
                  }}
                />
              </div>

              {/* Current step description */}
              <div className="text-sm text-center text-gray-600 font-medium">
                {steps[currentStep].description}
              </div>
            </div>
          </div>
        )}

        <SubmitButton />
      </div>
    </form>
  );
}
