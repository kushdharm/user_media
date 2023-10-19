import React from 'react'

export class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, info) {
        console.error({ error, info });
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <p className='text-red-500  text-2xl'> {this.props.fallback}</p>
      }
  
      return this.props.children;
    }
  }