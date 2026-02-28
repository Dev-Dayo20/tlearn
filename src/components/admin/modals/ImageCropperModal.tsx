import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import getCroppedImg from "@/utils/imageUtils";

interface ImageCropperModalProps {
  image: string;
  open: boolean;
  onClose: () => void;
  onConfirm: (croppedImage: Blob) => void;
}

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  image,
  open,
  onClose,
  onConfirm,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleConfirm = async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      if (croppedImage) {
        onConfirm(croppedImage);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-background rounded-3xl border-none shadow-2xl">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-xl font-bold">
            Crop Profile Photo
          </DialogTitle>
        </DialogHeader>

        <div className="relative h-[400px] w-full bg-muted">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            cropShape="round"
            showGrid={false}
          />
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Zoom
            </p>
            <Slider
              value={[zoom]}
              min={1}
              max={3}
              step={0.1}
              onValueChange={(value) => setZoom(value[0])}
              className="py-4"
            />
          </div>
        </div>

        <DialogFooter className="p-6 border-t bg-muted/30 flex flex-row gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            className="flex-1 rounded-xl font-bold"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="flex-1 rounded-xl font-black bg-prim hover:bg-prim/90 text-white"
          >
            Set Photo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
