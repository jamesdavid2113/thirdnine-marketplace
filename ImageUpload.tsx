
import React from "react";
import { Camera, X } from "lucide-react";
import { FormLabel } from "@/components/ui/form";

interface ImageUploadProps {
  images: string[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: (index: number) => void;
  error?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  onImageUpload,
  onImageRemove,
  error
}) => {
  return (
    <div className="space-y-4">
      <FormLabel>Product Photos</FormLabel>
      <div className="grid grid-cols-3 gap-2">
        {images.map((image, index) => (
          <div key={index} className="relative h-24 w-full overflow-hidden rounded-md">
            <img
              src={image}
              alt={`Product ${index + 1}`}
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => onImageRemove(index)}
              className="absolute right-1 top-1 rounded-full bg-black/70 p-1"
            >
              <X className="h-3 w-3 text-white" />
            </button>
          </div>
        ))}
        
        {images.length < 5 && (
          <label className="flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/30 hover:border-primary/50">
            <Camera className="mb-2 h-6 w-6 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Add Photo</span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={onImageUpload}
            />
          </label>
        )}
      </div>
      {error && (
        <p className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
