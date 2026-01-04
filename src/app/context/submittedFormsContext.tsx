"use client"

import { createContext, useContext, useState } from "react";

type SubmittedFormContextType = {
    submittedForms: Array<SubmittedFormType>;
    insertFormData: (arg0: SubmittedFormType) => void;
};

export type SubmittedFormType = {
    fullName: string;
    email: string;
    age: number;
    medicalCondition: string;
    state: string;
    createdAt: string;
}

const SubmittedFormsContext = createContext<SubmittedFormContextType | undefined>(undefined);

function SubmittedFormsContextProvider({ children }: { children: React.ReactNode }) {

    const [submittedForms, setSubmittedForms] = useState<SubmittedFormType[]>([])

    function insertFormData(newFormData: SubmittedFormType) {
        setSubmittedForms((prev) => [newFormData, ...prev]);
    }

    return (
        <SubmittedFormsContext.Provider value={{ submittedForms, insertFormData }}>
            {children}
        </SubmittedFormsContext.Provider>
    )
}

export function useSubmittedFormsData() {
  const context = useContext(SubmittedFormsContext);
  if (!context) {
    throw new Error("useSubmittedFormsData must be used within ThemeProvider");
  }
  return context;
}

export default SubmittedFormsContextProvider