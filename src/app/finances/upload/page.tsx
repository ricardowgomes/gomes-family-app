"use client";

import React from "react";
import PageContainer from "@/layouts/PageContainer";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { AttachmentIcon } from "@chakra-ui/icons";
import { NewTransaction, StatementUploadType } from "@/types";
import LabelSelector from "@/components/LabelSelector/LabelSelector";

export default function Upload() {
  const toast = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [type, setType] = useState<string>("");
  const [labels, setLabels] = useState<NewTransaction["labelIds"]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
      toast({
        title: "File uploaded.",
        description: "The file has been selected.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
  });

  const onLabelSelection = (labelId: string) => {
    setLabels((prev) => {
      if (prev.includes(labelId)) {
        return prev;
      }
      return [...prev, labelId];
    });
  };

  const onLabelRemoval = (labelId: string) => {
    setLabels((prev) => prev.filter((id) => id !== labelId));
  };

  return (
    <PageContainer heading="Bulk upload transactions">
      <Box p={4}>
        <Stack spacing={4}>
          {/* File Upload Section */}
          <Box
            {...getRootProps()}
            borderWidth={2}
            borderRadius="md"
            borderColor="gray.300"
            borderStyle="dashed"
            p={4}
            textAlign="center"
            bg={isDragActive ? "gray.100" : "white"}
            width={600}
            height={400}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            gap={6}
          >
            <input {...getInputProps()} />
            <AttachmentIcon color="teal" boxSize={12} />
            <Text color="teal" fontWeight={700} width={300}>
              {selectedFile
                ? selectedFile.name
                : "Drag & drop your CSV file here, or click to select one"}
            </Text>
          </Box>

          {/* Type Selector */}
          <FormControl>
            <FormLabel htmlFor="type">Type</FormLabel>
            <Select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Select type"
            >
              {Object.entries(StatementUploadType).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </Select>
          </FormControl>

          {/* Labels Selector */}
          <LabelSelector
            onLabelSelection={onLabelSelection}
            onLabelRemoval={onLabelRemoval}
            selectedLabelIds={labels}
          />

          {/* Submit Button */}
          <Button
            colorScheme="teal"
            onClick={() =>
              toast({
                title: "Form submitted.",
                description: "The form has been submitted.",
                status: "success",
                duration: 3000,
                isClosable: true,
              })
            }
          >
            Upload
          </Button>
        </Stack>
      </Box>
    </PageContainer>
  );
}
