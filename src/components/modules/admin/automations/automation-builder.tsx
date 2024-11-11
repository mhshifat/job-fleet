"use client";

import { useAutomationBuilder } from './automation-builder-provider';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/shared/spinner';
import useGetAutomationQuery from '@/domain/automation/use-get-automation-query';
import useUpdateAutomationMutation from '@/domain/automation/use-update-automation-mutation';

export default function AutomationBuilder({ automationId }: { automationId: string }) {
  const router = useRouter();
  const { data: automationData, isLoading } = useGetAutomationQuery(automationId);
  const updateAutomation = useUpdateAutomationMutation();
  const {} = useAutomationBuilder();

  if (isLoading) return (
    <div className="py-10">
      <Spinner fixed={false} size="md" variant="secondary" showTitle className="gap-3" />
    </div>
  )
  return (
    <p>Automation Builder</p>
  )
}