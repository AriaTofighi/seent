import { useState, useEffect, useRef } from "react";
import { fileToBase64 } from "../utils";

export const useImageUpload = () => {
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | null | ArrayBuffer>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    const base64 = await fileToBase64(file);
    setImage(file);
    setImagePreview(base64);
  };

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (!image) {
      setImagePreview(null);
    }
  }, [image]);

  return {
    image,
    imagePreview,
    handleImageChange,
    setImage,
    fileInputRef,
    handleBrowse,
  };
};
