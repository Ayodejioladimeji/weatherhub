"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ConfirmationDialogProps {
    open: boolean
    title: string
    description: string
    onConfirm: () => void
    onCancel: () => void
    confirmText?: string
    cancelText?: string
    isDangerous?: boolean
}

export function ConfirmationDialog({
    open,
    title,
    description,
    onConfirm,
    onCancel,
    confirmText = "Confirm",
    cancelText = "Cancel",
    isDangerous = false,
}: ConfirmationDialogProps) {
    return (
        <AlertDialog open={open}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex justify-end gap-3 border-t pt-3 mt-5">
                    <AlertDialogCancel onClick={onCancel} className="hover:bg-gray-100">{cancelText}</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm} className={isDangerous ? "bg-red-600 hover:bg-red-700" : ""}>
                        {confirmText}
                    </AlertDialogAction>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}
