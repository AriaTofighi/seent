import { useState, useEffect } from "react";
import { fileToBase64 } from "../utils/helpers";

export const useImageUpload = () => {
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | null | ArrayBuffer>(
    null
  );

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    const base64 = await fileToBase64(file);
    setImage(file);
    setImagePreview(base64);
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
  };
};
