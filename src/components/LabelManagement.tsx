"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Label = {
  id: string;
  name: string;
};

export default function LabelManagement() {
  const queryClient = useQueryClient();
  const [newLabel, setNewLabel] = useState("");

  const { data: labels, isLoading } = useQuery({
    queryKey: ["labels"],
    queryFn: () => axios.get("/api/labels").then((res) => res.data),
  });

  const createMutation = useMutation({
    mutationFn: (name: string) => axios.post("/api/labels", { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["labels"],
      });
      setNewLabel("");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => axios.delete(`/api/labels?id=${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["labels"],
      });
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Labels</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createMutation.mutate(newLabel);
        }}
      >
        <input
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="New label name"
        />
        <button type="submit">Add Label</button>
      </form>
      <ul>
        {labels.map((label: Label) => (
          <li key={label.id}>
            {label.name}
            <button onClick={() => deleteMutation.mutate(label.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
