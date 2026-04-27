import type { ButtonHTMLAttributes } from "react";

type LoadingButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading: boolean;
  loadingText: string;
};

export function LoadingButton({
  isLoading,
  loadingText,
  children,
  disabled,
  ...buttonProps
}: LoadingButtonProps) {
  return (
    <button
      {...buttonProps}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={`loading-button ${buttonProps.className ?? ""}`.trim()}
    >
      {isLoading ? (
        <span className="loading-button-content">
          <span className="loading-button-spinner" />
          {loadingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
