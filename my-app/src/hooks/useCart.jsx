import { useState } from "react";

const useCart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  // console.log(isCartOpen);

  const handleCartToggle = () => {
    setIsCartOpen(true);
  };
  return { isCartOpen, handleCartToggle };
};
export default useCart;
