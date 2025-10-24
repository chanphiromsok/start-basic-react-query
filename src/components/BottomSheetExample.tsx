/**
 * Example usage of the BottomSheet component with ref control
 */

import { useRef } from "react"
import BottomSheet from "./BottomSheet"
import { Button } from "./ui/button"
import type { BottomSheetRef } from "./BottomSheet"

export function BottomSheetExample() {
  const bottomSheetRef = useRef<BottomSheetRef>(null)

  const handleOpen = () => {
    bottomSheetRef.current?.open()
  }

  const handleClose = () => {
    bottomSheetRef.current?.close()
  }

  const handleToggle = () => {
    bottomSheetRef.current?.toggle()
  }

  const handleSubmit = () => {
    console.log("Form submitted!")
    // Do your submit logic here
  }

  const handleCancel = () => {
    console.log("Cancelled")
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">BottomSheet Example</h2>
      
      <div className="flex gap-2">
        <Button onClick={handleOpen}>Open BottomSheet</Button>
        <Button onClick={handleClose} variant="outline">
          Close BottomSheet
        </Button>
        <Button onClick={handleToggle} variant="secondary">
          Toggle BottomSheet
        </Button>
      </div>

      {/* Basic usage */}
      <BottomSheet
        ref={bottomSheetRef}
        title="Confirm Action"
        description="Are you sure you want to proceed?"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />

      {/* With custom content */}
      <BottomSheet
        ref={bottomSheetRef}
        title="Custom Content"
        description="This drawer has custom content"
        submitLabel="Save"
        cancelLabel="Discard"
        onSubmit={handleSubmit}
      >
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            You can add any custom content here, like forms, lists, or other components.
          </p>
        </div>
      </BottomSheet>
    </div>
  )
}
