declare module 'react-katex' {
  export interface KatexProps {
    math: string;
    displayMode?: boolean;
    errorColor?: string;
    renderError?: (error: Error) => React.ReactNode;
    strict?: boolean | 'warn' | 'ignore';
    trust?: boolean;
    macros?: { [name: string]: string };
    colorIsTextColor?: boolean;
    output?: 'html' | 'mathml';
    globalGroup?: string;
    throwOnError?: boolean;
  }

  export const InlineMath: React.FC<KatexProps>;
  export const BlockMath: React.FC<KatexProps>;
}
