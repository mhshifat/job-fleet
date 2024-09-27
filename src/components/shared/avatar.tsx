"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Spinner from "../shared/spinner";
import { cn } from "@/utils/helpers";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
}

export default function Avatar({ size, className, src, alt }: AvatarProps) {
  const [loading, setLoading] = useState(true);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!src) {
      setLoading(false);
      return;
    }
    const image = new window.Image();
    image.src = src;
    image.onload = () => {
      setLoading(false);
    }
    image.onerror = () => {
      if (imageRef.current) {
        imageRef.current.src = "/images/no-image.png";
        setLoading(false);
      }
    }
  }, [src]);

  return (
    <div style={{
      ...size?{
        width: size,
        height: size,
      }:{}
    }} className={cn("w-7 h-7 rounded-full border border-border overflow-hidden shadow-sm relative cursor-pointer bg-background-secondary", className)}>
      {loading && <Spinner className="bg-background-secondary absolute inset-0 w-full h-full z-50 scale-105 rounded-full" />}
      <Image
        ref={(el) => {
          imageRef.current = el!;
        }}
        src={src || "/images/avatar.avif"}
        alt={alt || "avatar"}
        fill
        className="w-full h-full object-cover object-center rounded-full bg-background-secondary"
      />
    </div>
  )
}