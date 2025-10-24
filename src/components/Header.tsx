/**
 * Native-style Navigation Header Component
 * 
 * Mimics React Navigation's header with:
 * - headerLeft, headerRight, title props
 * - Native iOS/Android feel
 * - Safe area support
 * - Customizable and reusable
 */

import * as React from "react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

export interface HeaderProps {
  /** Left side content (usually back button or menu) */
  headerLeft?: React.ReactNode | (() => React.ReactNode)
  
  /** Right side content (usually actions or menu) */
  headerRight?: React.ReactNode | (() => React.ReactNode)
  
  /** Header title */
  title?: string | React.ReactNode
  
  /** Additional header content below title */
  subtitle?: string
  
  /** Custom title component with full control */
  headerTitle?: React.ReactNode | ((props: { children?: React.ReactNode }) => React.ReactNode)
  
  /** Header style variant */
  variant?: "default" | "transparent" | "elevated" | "large"
  
  /** Additional className */
  className?: string
  
  /** Show shadow/border */
  showBorder?: boolean
  
  /** Background color override */
  backgroundColor?: string
}

export function Header({
  headerLeft,
  headerRight,
  title,
  subtitle,
  headerTitle,
  variant = "default",
  className,
  showBorder = true,
  backgroundColor,
}: HeaderProps) {
  const renderContent = (content: React.ReactNode | (() => React.ReactNode)) => {
    return typeof content === "function" ? content() : content
  }

  return (
    <header
      className={cn(
        // Base styles - native feel
        "flex items-center justify-between w-full",
        "transition-all duration-200",
        "select-none", // Prevent text selection
        "-webkit-tap-highlight-color-transparent", // Remove tap highlight
        
        // Safe area for notched devices
        "pt-[env(safe-area-inset-top)]",
        "px-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]",
        
        // Variant styles
        {
          // Default header
          "bg-background h-14 px-4 border-b": variant === "default" && showBorder,
          "bg-background h-14 px-4": variant === "default" && !showBorder,
          
          // Transparent header (for overlays)
          "bg-transparent h-14 px-4": variant === "transparent",
          
          // Elevated header (with shadow)
          "bg-background h-14 px-4 shadow-sm": variant === "elevated",
          
          // Large header (iOS style)
          "bg-background h-24 px-4 items-end pb-2 border-b": variant === "large" && showBorder,
          "bg-background h-24 px-4 items-end pb-2": variant === "large" && !showBorder,
        },
        
        className
      )}
      style={{ backgroundColor }}
    >
      {/* Left Section */}
      <div className={cn(
        "flex items-center justify-start",
        variant === "large" ? "min-w-[60px]" : "min-w-11"
      )}>
        {headerLeft && renderContent(headerLeft)}
      </div>

      {/* Center Section (Title) */}
      <div className={cn(
        "flex-1 flex flex-col items-center justify-center px-2 min-w-0",
        variant === "large" && "items-start"
      )}>
        {headerTitle ? (
          typeof headerTitle === "function" ? (
            headerTitle({ children: title })
          ) : (
            headerTitle
          )
        ) : (
          <>
            <h1 className={cn(
              "font-semibold truncate max-w-full",
              variant === "large" ? "text-2xl" : "text-base",
              "text-foreground"
            )}>
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-muted-foreground truncate max-w-full">
                {subtitle}
              </p>
            )}
          </>
        )}
      </div>

      {/* Right Section */}
      <div className={cn(
        "flex items-center justify-end gap-1",
        variant === "large" ? "min-w-[60px]" : "min-w-11"
      )}>
        {headerRight && renderContent(headerRight)}
      </div>
    </header>
  )
}

// Pre-built header components for common patterns
export const HeaderBackButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> & { onPress?: () => void }
>(({ onPress, children, ...props }, ref) => (
  <Button
    ref={ref}
    variant="ghost"
    size="icon"
    onClick={onPress}
    className={cn(
      "w-11 h-11 active:scale-95",
      "touch-action-manipulation",
      "-webkit-tap-highlight-color-transparent"
    )}
    {...props}
  >
    {children || (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
    )}
  </Button>
))
HeaderBackButton.displayName = "HeaderBackButton"

export const HeaderMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> & { onPress?: () => void }
>(({ onPress, children, ...props }, ref) => (
  <Button
    ref={ref}
    variant="ghost"
    size="icon"
    onClick={onPress}
    className={cn(
      "w-11 h-11 active:scale-95",
      "touch-action-manipulation",
      "-webkit-tap-highlight-color-transparent"
    )}
    {...props}
  >
    {children || (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    )}
  </Button>
))
HeaderMenuButton.displayName = "HeaderMenuButton"

export const HeaderActionButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> & { onPress?: () => void }
>(({ onPress, children, ...props }, ref) => (
  <Button
    ref={ref}
    variant="ghost"
    size="sm"
    onClick={onPress}
    className={cn(
      "h-9 px-3 active:scale-95",
      "touch-action-manipulation",
      "-webkit-tap-highlight-color-transparent"
    )}
    {...props}
  >
    {children}
  </Button>
))
HeaderActionButton.displayName = "HeaderActionButton"
