import React, { useState } from "react";
import Image from "next/image";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const BlurImage = ({ imageSrc }: { imageSrc: string }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="w-full overflow-hidden aspect-w-7 aspect-h-5">
      <Image
        alt="thumbnail"
        src={imageSrc}
        layout="fill"
        objectFit="fill"
        className={cn(
          "duration-700 ease-out group-hover:opacity-75",
          isLoading
            ? "scale-110 blur-2xl grayscale"
            : "scale-100 blur-0 grayscale-0"
        )}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
};

export default BlurImage;
