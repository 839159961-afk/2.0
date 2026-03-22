import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render(): React.ReactNode {
    if (this.state.hasError) {
      let errorMessage = "发生了一个错误。";
      try {
        if (this.state.error?.message) {
          const parsed = JSON.parse(this.state.error.message);
          if (parsed.error) {
            errorMessage = parsed.error;
          }
        }
      } catch (e) {
        errorMessage = this.state.error?.message || errorMessage;
      }

      return (
        <div className="min-h-screen bg-[#2c2e2f] flex items-center justify-center font-serif p-4">
          <div className="bg-[#f0ece1] p-6 rounded-md shadow-lg max-w-md w-full text-center">
            <h2 className="text-xl font-bold text-[#b84b4b] mb-4">哎呀，出错了</h2>
            <p className="text-[#2c2e2f] mb-4">{errorMessage}</p>
            <button
              className="bg-[#7a8b6c] text-white px-4 py-2 rounded-sm hover:bg-[#6b7a5e] transition-colors"
              onClick={() => window.location.reload()}
            >
              重新加载
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
