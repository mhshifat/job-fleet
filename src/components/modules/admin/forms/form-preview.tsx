import Button from "@/components/ui/button";
import { IFormElement } from "./form-builder-provider";
import FormElementPreview from "./form-element-preview";
import { FormEvent, ReactNode, useState } from "react";
import Label from "@/components/ui/label";
import Divider from "@/components/ui/divider";
import LoadingBtn from "@/components/shared/loading-btn";

interface IFormPreviewProps {
  submitBtnText?: ReactNode;
  formElements: IFormElement[];
  onSubmit: (values: Record<string, string>) => void;
  loading?: boolean;
}

export default function FormPreview({ loading, formElements, onSubmit, submitBtnText }: IFormPreviewProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  function handleSubmit(event: FormEvent) {    
    event.preventDefault();
    setErrors({});

    const errors: Record<string, string> = {}
    for (const element of formElements) {
      if (element.properties?.isRequired === true && !formValues[element.properties?.fieldName as string]) {
        errors[element.properties?.fieldName as string] = `${element.properties?.label} is required!`;
      }
    }

    if (!!Object.keys(errors).length) return setErrors(errors);
    onSubmit(formValues);
  } 
  return (
    <div className="grid grid-cols-1 flex-1">
      <div className="border-r border-border">
        <div className="h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] py-10 px-5">
          <div className="w-full max-w-[600px] bg-background border border-border rounded-md mx-auto p-3 shadow-md h-full">
            <form onSubmit={handleSubmit} className="h-full flex flex-col">
              {errors["global"] && (
                <>
                  <Label title="" error={errors["global"]} />
                  <br />
                  <Divider />
                  <br />
                </>
              )}
              <fieldset className="p-0 m-0 flex flex-col gap-3 h-full">
                {!!formElements.length && formElements.map((element, formElementIdx) => (
                  <FormElementPreview
                    key={"FormPreview_" + formElementIdx}
                    label={(element?.properties?.label) as string}
                    element={element}
                    error={errors?.[element.properties?.fieldName as string]}
                    onChange={(value) => {
                      setErrors(values => {
                        const prevErrors = {...values};
                        delete prevErrors[element.properties?.fieldName as string];
                        return prevErrors;
                      });
                      setFormValues(values => ({
                        ...values,
                        [element.properties?.fieldName as string]: value
                      }));
                    }}
                  />
                ))}

                <Button disabled={loading} type="submit" className="mt-auto">
                  <LoadingBtn loading={loading}>
                    {submitBtnText || "Test"}
                  </LoadingBtn>
                </Button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}