import { useContext } from "react";
import { OrderActionsContext, OrderContext } from "./OrderContext";

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrder must be used inside OrderProvider");
  return context;
}

export function useOrderActions() {
  const context = useContext(OrderActionsContext);
  if (!context) throw new Error("useOrderActions must be used inside OrderProvider");
  return context;
}
