import React from "react";

function Button({ children, className = "w-full", ...props }, ref) {
  return (
    <div className="w-full">
      <button className={`px-3 py-2 ${className}`} {...props} ref={ref}>
        {children}
      </button>
    </div>
  );
}

export default React.forwardRef(Button);
