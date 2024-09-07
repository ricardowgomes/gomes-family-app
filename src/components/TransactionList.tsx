"use client";

import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { format } from 'date-fns'

type Transaction = {
  id: string
  type: 'expense' | 'income'
  name: string
  amount: number
  date: string
  labelIds: string[]
}

export default function TransactionList() {
  const queryClient = useQueryClient()
  const [filters, setFilters] = useState({
    type: '',
    label: '',
    startDate: '',
    endDate: '',
    name: '',
    minAmount: '',
    maxAmount: ''
  })

  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions', filters],
    queryFn: () => axios.get('/api/transactions', { params: filters }).then(res => res.data)
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => axios.delete(`/api/transactions?id=${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['transactions'],
      })
    }
  });

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h2>Transactions</h2>
      <div>
        <input
          type="text"
          placeholder="Search by name"
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />
        <select onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
          <option value="">All types</option>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        {/* Add more filter inputs here */}
      </div>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction: Transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.type}</td>
              <td>{transaction.name}</td>
              <td>{transaction.amount}</td>
              <td>{format(new Date(transaction.date), 'yyyy-MM-dd')}</td>
              <td>
                <button onClick={() => { /* Open edit modal */ }}>Edit</button>
                <button onClick={() => deleteMutation.mutate(transaction.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
