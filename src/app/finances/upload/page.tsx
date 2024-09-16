"use client";

import React, { useState } from "react";
import PageContainer from "@/layouts/PageContainer";
import { Box, Button, Input, Select, Stack, Text, useToast } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { AttachmentIcon } from "@chakra-ui/icons";
import Papa from "papaparse";
import { StatementUploadType } from "@/types";
import { useServices } from "@/hooks/useServices";

export default function Upload() {
  const toast = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [type, setType] = useState<StatementUploadType>(
    StatementUploadType.TangerineCC,
  );
  const [monthLabel, setMonthLabel] = useState<string>("");

  const { transactionService } = useServices();

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

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected.",
        description: "Please select a file to upload.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Read and parse the CSV file
    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.result) {
        Papa.parse(reader.result as string, {
          header: true,
          complete: async (results) => {
            try {
              // Use the updated upload function from transactionService
              await transactionService.upload(type, {
                label: monthLabel,
                transactions: results.data,
              });

              toast({
                title: "Form submitted.",
                description: "The form has been submitted.",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            } catch (error) {
              console.error("Error:", error);
              toast({
                title: "Error uploading file.",
                description: "There was an error uploading the file.",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }
          },
        });
      }
    };

    reader.readAsText(selectedFile);
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
          <Select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as StatementUploadType)}
            placeholder="Select type of statement"
          >
            {Object.entries(StatementUploadType).map(([key, label]) => (
              <option key={key} value={label}>
                {label}
              </option>
            ))}
          </Select>

          {/* Month Label Input */}
          <Input
            type="text"
            value={monthLabel}
            onChange={(e) => setMonthLabel(e.target.value)}
            placeholder="Enter the month label (2024-01) for when the statement was issued"
          />

          {/* Submit Button */}
          <Button colorScheme="teal" onClick={handleUpload}>
            Upload
          </Button>
        </Stack>
      </Box>
    </PageContainer>
  );
}
