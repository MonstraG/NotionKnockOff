import { ButtonHTMLAttributes, FC } from "react";

const IconButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, title, ...props }) => (
  <div>
    <button aria-label={title} title={title} {...props}>
      {children}
    </button>
  </div>
);

export default IconButton;
