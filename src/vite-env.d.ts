/// <reference types="vite/client" />

// Декларации для CSS-модулей
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// Декларации для изображений
declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}