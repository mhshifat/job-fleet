"use client";

import Container from "@/components/shared/container";
import Button from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import DateInput from "@/components/ui/date-input";
import DatePicker from "@/components/ui/date-picker";
import Editor from "@/components/ui/editor";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select";
import { cn } from "@/utils/helpers";
import { ArrowLeftIcon, ArrowRightIcon, SaveIcon, User2Icon } from "lucide-react";
import { ReactNode } from "react";

export default function CreateJobForm() {
  return (
    <Container>
      <div className="flex items-center gap-10 justify-between">
        <Button variant="ghost" className="w-max capitalize">
          <ArrowLeftIcon className="size-4" />
          Back to Jobs
        </Button>

        <Button variant="ghost" className="w-max capitalize">
          <SaveIcon className="size-4" />
          Save
        </Button>
      </div>

      <h1 className="mt-10 text-2xl font-geist font-normal">Create a new job</h1>
      <p className="mt-2 font-geist-mono font-xs">Write and fill out the information of the job</p>

      <div className="mt-14">
        <h3 className="font-geist text-xl">Title & Description</h3>

        <Label title="Job Title" className="mt-5">
          <Input
            placeholder="Ex: Full Stack Web Developer"
          />
        </Label>

        <div className="flex gap-5">
          <Label title="Category" className="mt-5 flex-1">
            <Select>
              <Select.Option>Category 1</Select.Option>
            </Select>
          </Label>
          <Label title="Job Code" className="mt-5 flex-1">
            <Input
              placeholder="Ex: 001"
            />
          </Label>
        </div>

        <Label title="Job Description" className="mt-5">
          <Editor />
        </Label>
      </div>

      <div className="mt-8">
        <h3 className="font-geist text-xl">Employment Details</h3>

        <Label title="Employment Type" className="mt-5">
          <Checkbox
            type="radio"
            className="flex gap-5"
            renderItem={({ title, isChecked }) => (
              <span className={cn("border border-border w-full flex justify-center items-center h-[var(--size)] rounded-md text-sm font-geist", {
                "border-primary bg-primary text-white": isChecked
              })}>{title}</span>
            )}
            onChange={({ checked, item }) => {}}
          >
            <Checkbox.Item
              className="flex-1"
              title="Full Time"
              value="FULL_TIME"
            />
            <Checkbox.Item
              className="flex-1"
              title="Part Time"
              value="PART_TIME"
            />
            <Checkbox.Item
              className="flex-1"
              title="Contract"
              value="CONTRACT"
            />
            <Checkbox.Item
              className="flex-1"
              title="Temporary"
              value="TEMPORARY"
            />
            <Checkbox.Item
              className="flex-1"
              title="Trainee"
              value="TRAINEE"
            />
          </Checkbox>
        </Label>

        <div className="flex gap-5">
          <Label title="Vacancy" className="mt-5 flex-1">
            <Input
              type="number"
              placeholder="Ex: 2"
            />
          </Label>
          <Label title="Deadline" className="mt-5 flex-1">
            <DateInput />
          </Label>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-geist text-xl">Experience</h3>

        <div className="flex gap-5">
          <Label title="Label" className="mt-5 flex-1">
            <Select>
              <Select.Option>Beginner</Select.Option>
            </Select>
          </Label>
          <Label title="Year of Experience" className="mt-5 flex-1">
            <Input
              placeholder="Ex: 2 - 3 Years"
            />
          </Label>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-geist text-xl">Salary</h3>

        <Label title="Salary Type" className="mt-5">
          <Checkbox
            type="radio"
            className="flex gap-5"
            renderItem={({ title, isChecked }) => (
              <span className={cn("border border-border w-full flex justify-center items-center h-[var(--size)] rounded-md text-sm font-geist", {
                "border-primary bg-primary text-white": isChecked
              })}>{title}</span>
            )}
            onChange={({ checked, item }) => {}}
          >
            <Checkbox.Item
              className="flex-1"
              title="Hourly"
              value="HOURLY"
            />
            <Checkbox.Item
              className="flex-1"
              title="Daily"
              value="DAILY"
            />
            <Checkbox.Item
              className="flex-1"
              title="Weekly"
              value="WEEKLY"
            />
            <Checkbox.Item
              className="flex-1"
              title="MONTHLY"
              value="MONTHLY"
            />
            <Checkbox.Item
              className="flex-1"
              title="Negotiable"
              value="NEGOTIABLE"
            />
          </Checkbox>
        </Label>

        <div className="flex gap-5">
          <Label title="Currency" className="mt-5 flex-1">
            <Select>
              <Select.Option>BDT</Select.Option>
            </Select>
          </Label>
          <Label title="Salary" className="mt-5 flex-1">
            <Input
              placeholder="Ex: 70000 - 100000"
            />
          </Label>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-geist text-xl">Location</h3>

        <div className="flex gap-5">
          <Label title="Street Address" className="mt-5 flex-1">
            <Input
              placeholder="Ex: 14 Al-Amin Road"
            />
          </Label>
          <Label title="City" className="mt-5 flex-1">
            <Input
              placeholder="Ex: Dhaka"
            />
          </Label>
        </div>

        <div className="flex gap-5">
          <Label title="Zip Code" className="mt-5 flex-1">
            <Input
              placeholder="Ex: 1232"
            />
          </Label>
          <Label title="Country" className="mt-5 flex-1">
            <Input
              placeholder="Ex: Bangladesh"
            />
          </Label>
        </div>
      </div>

      <div className="mt-14 flex flex-col justify-center items-center gap-5">
        <Button className="capitalize">
          Post this job now
          <ArrowRightIcon className="size-4" />
        </Button>

        <Button variant="ghost" className="w-max capitalize">
          Save as draft
        </Button>
      </div>
    </Container>
  )
}