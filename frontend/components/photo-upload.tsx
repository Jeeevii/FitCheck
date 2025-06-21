"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Upload, X, Camera } from "lucide-react"
import Image from "next/image"

interface PhotoUploadProps {
  onImageUpload: (image: File | null) => void
  uploadedImage: File | null
}

export default function PhotoUpload({ onImageUpload, uploadedImage }: PhotoUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        onImageUpload(file)
      }
    },
    [onImageUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB limit
  })

  const removeImage = () => {
    onImageUpload(null)
  }

  // Create preview URL for uploaded file
  const previewUrl = uploadedImage ? URL.createObjectURL(uploadedImage) : null

  if (uploadedImage && previewUrl) {
    return (
      <div className="text-center">
        <div className="relative inline-block">
          <Image
            src={previewUrl || "/placeholder.svg"}
            alt="Your fit"
            width={300}
            height={400}
            className="rounded-2xl object-cover w-72 h-96 shadow-xl"
          />
          <Button
            onClick={removeImage}
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 rounded-full w-8 h-8 p-0 bg-red-500 hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-gray-600 mt-4 font-medium">Perfect! Now select your occasion below 👇</p>
        <p className="text-sm text-gray-500 mt-1">
          {uploadedImage.name} ({(uploadedImage.size / 1024 / 1024).toFixed(1)}MB)
        </p>
      </div>
    )
  }

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all duration-200 ${
        isDragActive
          ? "border-orange-400 bg-orange-50 scale-[1.02]"
          : "border-gray-300 hover:border-orange-400 hover:bg-orange-50/50"
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center space-y-6">
        <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center shadow-lg">
          {isDragActive ? <Upload className="w-10 h-10 text-white" /> : <Camera className="w-10 h-10 text-white" />}
        </div>
        <div>
          <p className="text-xl font-bold text-gray-800 mb-2">
            {isDragActive ? "Drop it here! 🔥" : "Upload your style photo"}
          </p>
          <p className="text-gray-500 mb-6">Drag & drop or click to select • JPG, PNG, WEBP • Max 10MB</p>
          <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-8 py-3 rounded-full shadow-lg">
            <Upload className="w-4 h-4 mr-2" />
            Choose File
          </Button>
        </div>
      </div>
    </div>
  )
}
