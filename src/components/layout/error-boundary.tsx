"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Class-based error boundary for wrapping client component trees.
 * Next.js App Router uses error.tsx for route-level errors.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <p className="eyebrow mb-4">Error</p>
            <p className="text-muted-foreground">Something went wrong loading this section.</p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => this.setState({ hasError: false })}
            >
              Retry
            </Button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
