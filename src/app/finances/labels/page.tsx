import React from "react";
import LabelsList from "./LabelsList";
import PageContainer from "@/layouts/PageContainer";
import ModalContainer from "@/components/Modals/ModalContainer";
import { ModalTypes } from "@/constants";

export default async function Labels() {
  return (
    <PageContainer heading="Labels">
      <LabelsList />
      <ModalContainer name={ModalTypes.ADD_LABEL} />
    </PageContainer>
  );
}
