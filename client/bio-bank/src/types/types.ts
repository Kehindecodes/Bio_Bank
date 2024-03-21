// src/types/types.ts

import { FieldValues, UseFormRegister, UseFormRegisterReturn } from "react-hook-form"


export type Collection = {
    id?: number,
    diseaseTerm: string,
    title: string,
    donorCount?: number,
    materialType?: string,
}

export type Collections = {
    result: Collection[],
    totalRecords: number,
}

export type Sample = {
    id: number,
    donorCount: number,
    materialType: string,
    collectionId: number,
}

export type Input = {
    input1: string,
    input2: string,
}

export type FormModalProps = {
    title: string
    ctaText : string
    onCancel: () => void
    onSubmit: () => FieldValues
    input1: {
        type: string
        placeholder: string
    }
    input2:{
        type: string
        placeholder: string
    }
    errors: FieldValues
    register: (name: string , options: {
        required: boolean
    }) => UseFormRegisterReturn<string>
    isLoading: boolean

}