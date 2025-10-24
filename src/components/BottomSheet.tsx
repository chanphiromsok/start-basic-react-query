import { forwardRef, useImperativeHandle, useState } from "react"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"

export interface BottomSheetRef {
  open: () => void
  close: () => void
  toggle: () => void
}

export interface BottomSheetProps {
  title?: string
  description?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  onSubmit?: () => void
  onCancel?: () => void
  submitLabel?: string
  cancelLabel?: string
}

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  (
    {
      title = "Are you absolutely sure?",
      description = "This action cannot be undone.",
      children,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false)

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((prev) => !prev),
    }))

    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            {description && <DrawerDescription>{description}</DrawerDescription>}
          </DrawerHeader>
          {children}
        </DrawerContent>
      </Drawer>
    )
  }
)

BottomSheet.displayName = "BottomSheet"

export default BottomSheet