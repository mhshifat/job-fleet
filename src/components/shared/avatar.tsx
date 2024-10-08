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
  text?: string | JSX.Element;
}

export default function Avatar({ size, className, src, alt, text }: AvatarProps) {
  const [loading, setLoading] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  return (
    <div style={{
      ...size?{
        width: size,
        height: size,
      }:{}
    }} className={cn("w-7 h-7 rounded-full border border-border overflow-hidden shadow-sm relative cursor-pointer bg-background-secondary flex justify-center items-center", className, {
      "bg-foreground/10": !src
    })}>
      {loading && <Spinner className="bg-background-secondary absolute inset-0 w-full h-full z-50 scale-105 rounded-full" />}
      {src && <Image
        ref={(el) => {
          imageRef.current = el!;
        }}
        src={src}
        alt={alt || ""}
        fill
        className="w-full h-full object-cover object-center rounded-full bg-background-secondary"
      />}
      {!src && <span className="text-base font-geist font-semibold uppercase text-foreground/60">{text || "JF"}</span>}
    </div>
  )
}