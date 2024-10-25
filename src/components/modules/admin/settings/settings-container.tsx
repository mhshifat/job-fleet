"use client";

import Container from "@/components/shared/container";
import FormHandler from "@/components/shared/form-handler";
import Spinner from "@/components/shared/spinner";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import useSettingsQuery from "@/domain/settings/use-settings-query";
import useUpsertSettingsMutation from "@/domain/settings/use-upsert-settings-mutation";
import { upsertSettingsSchema } from "@/domain/settings/validators";

export default function SettingsContainer() {
  const { data, isLoading } = useSettingsQuery();
  const upsertSettings = useUpsertSettingsMutation();

  if (isLoading) return (
    <div className="py-10">
      <Spinner fixed={false} size="md" variant="secondary" showTitle title="Fetching Settings..." className="gap-3" />
    </div>
  )
  return (
    <div className="py-10 px-5 w-full">
      <Container>
        <FormHandler
          showToast={false}
          defaultValues={{
            streetAddress: data?.streetAddress,
            city: data?.city,
            zipCode: data?.zipCode,
            country: data?.country,
          }}
          onCreate={async (values) => {
            await upsertSettings.mutateAsync({
              ...values
            });
          }}
          onUpdate={() => Promise.resolve()}
          onComplete={() => {}}
          schema={upsertSettingsSchema}
          renderSubmitBtnText={() => <>Save</>}
        >
          {({ getValue, onFocus, setValue }) => (
            <>
              <h3 className="font-geist text-xl">Address</h3>
              <p className="mt-2 font-geist-mono text-sm">
                Write and fill out the information of the job
              </p>

              <div className="flex gap-5">
                <Label
                  title="Street Address"
                  className="mt-5 flex-1"
                >
                  <Input
                    placeholder="Ex: 14 Al-Amin Road"
                    value={getValue("streetAddress")}
                    onFocus={() => onFocus("streetAddress")}
                    onChange={({ target }) => setValue("streetAddress", target.value)}
                  />
                </Label>
                <Label
                  title="City"
                  className="mt-5 flex-1"
                >
                  <Input 
                    placeholder="Ex: Dhaka"
                    value={getValue("city")}
                    onFocus={() => onFocus("city")}
                    onChange={({ target }) => setValue("city", target.value)}
                  />
                </Label>
              </div>

              <div className="flex gap-5">
                <Label
                  title="Zip Code"
                  className="mt-5 flex-1"
                >
                  <Input 
                    placeholder="Ex: 1232" 
                    value={getValue("zipCode")}
                    onFocus={() => onFocus("zipCode")}
                    onChange={({ target }) => setValue("zipCode", target.value)}
                  />
                </Label>
                <Label
                  title="Country"
                  className="mt-5 flex-1"
                >
                  <Input 
                    placeholder="Ex: Bangladesh" 
                    value={getValue("country")}
                    onFocus={() => onFocus("country")}
                    onChange={({ target }) => setValue("country", target.value)}
                  />
                </Label>
              </div>
            </>
          )}
        </FormHandler>
      </Container>
    </div>
  )
}