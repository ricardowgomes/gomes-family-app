import React from "react";
import LabelsList from "./LabelsList";
import PageContainer from "@/layouts/PageContainer";
import NewLabelForm from "@/components/NewLabelForm/NewLabelForm";

export default async function Labels() {
  return (
    <PageContainer heading="Labels">
      <LabelsList />
      <NewLabelForm />
    </PageContainer>
  );
}
