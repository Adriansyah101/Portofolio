import { Component } from "react";

/**
 * Catches loader failures (missing `.glb`, offline HDR, etc.) inside a 3D
 * scene and renders the provided fallback instead of crashing the canvas.
 */
class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) {
      console.warn("[3D] Asset failed to load, using fallback:", error?.message ?? error);
    }
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}

export default ModelErrorBoundary;
