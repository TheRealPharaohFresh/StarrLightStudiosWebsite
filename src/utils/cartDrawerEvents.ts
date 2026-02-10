export const CART_DRAWER_OPEN_EVENT = "starrlight:cart-drawer-open" as const;

export const openCartDrawer = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CART_DRAWER_OPEN_EVENT));
};
