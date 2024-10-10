"use client";

import Container from "@/components/shared/container";
import Button from "@/components/ui/button";
import Editor from "@/components/ui/editor";
import { HardDriveUploadIcon } from "lucide-react";

export default function JobDetails() {
  return (
    <div>
      <div className="w-full aspect-[1/.25] bg-primary/10" />
      <Container>
        <div className="rounded-lg bg-background shadow-sm relative -mt-24">
          <div className="flex items-start justify-between gap-5 p-5">
            <div className="flex items-start gap-5">
              <div>
                <img
                  src="/assets/logo-icon.png"
                  alt="logo"
                  role="presentation"
                  className="h-[60px]"
                />
              </div>

              <div className="flex flex-col">
                <h3 className="text-2xl font-geist font-medium leading-[1] text-foreground">Annon IT</h3>

                <div className="flex flex-col gap-2 mt-3">
                  <p className="text-base font-geist font-medium leading-[1]"><span className="text-foreground/50">Title: </span>Web Developer</p>
                  <p className="text-base font-geist font-medium leading-[1]"><span className="text-foreground/50">Address: </span>Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>

            <div className="ml-auto">
              <Button>
                <HardDriveUploadIcon className="size-4" />
                <span>Apply</span>
              </Button>
            </div>
          </div>
          <div className="p-5 flex items-start gap-5 justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-geist-mono font-medium leading-[1] text-foreground/50">Type</h3>
              <p className="text-lg font-geist font-medium leading-[1] text-foreground">Full Time</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-geist-mono font-medium leading-[1] text-foreground/50">Vacancy</h3>
              <p className="text-lg font-geist font-medium leading-[1] text-foreground">2</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-geist-mono font-medium leading-[1] text-foreground/50">Deadline</h3>
              <p className="text-lg font-geist font-medium leading-[1] text-foreground">15 July</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-geist-mono font-medium leading-[1] text-foreground/50">Level</h3>
              <p className="text-lg font-geist font-medium leading-[1] text-foreground">15 July</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-geist-mono font-medium leading-[1] text-foreground/50">Experience</h3>
              <p className="text-lg font-geist font-medium leading-[1] text-foreground">2 - 3 Years</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-geist-mono font-medium leading-[1] text-foreground/50">Salary</h3>
              <p className="text-lg font-geist font-medium leading-[1] text-foreground">200000 BDT</p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <Editor
            disabled
            className="border-none"
          />
        </div>
      </Container>
    </div>
  )
}