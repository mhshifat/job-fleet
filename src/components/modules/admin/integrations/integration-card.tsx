import Button from "@/components/ui/button";
import useConnectIntegrationMutation from "@/domain/integration/use-connect-integration-mutation";

export default function IntegrationCard({ data }: { data: { title: string, description: string, connected: boolean } }) {
  const upsertIntegration = useConnectIntegrationMutation();
  
  async function handleConnection() {
    const res = await upsertIntegration.mutateAsync({
      type: "google_meet",
    });
    window.location.href = res.link;
  }
  return (
    <div className="border-[5px] border-background rounded-lg overflow-hidden shadow-sm ring-1 ring-background-secondary">
      <div className="aspect-square w-full bg-primary/10 rounded-tl-md rounded-tr-md py-4 px-5 flex flex-col">
        <div className="flex items-center gap-5 justify-between">
          <small className="text-sm font-geist-mono font-medium">
          </small>

        </div>
        <div className="flex-1 flex items-center">
          <h3 className="text-3xl font-geist-mono font-semibold max-w-[95%]">{data?.title}</h3>
        </div>
      </div>
      <div className="flex items-center gap-5 justify-between bg-background pt-7 pb-[calc(1.75rem-5px)] px-3">
        <Button onClick={handleConnection} variant={data?.connected ? "outlined" : "default"} className="rounded-full">{!data?.connected ? "Connect" : "Reconnect"}</Button>
      </div>
    </div>
  )
}