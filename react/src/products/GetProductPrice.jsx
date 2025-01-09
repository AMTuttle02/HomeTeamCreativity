export function GetProductPrice(price, style) {
  if (style === "tshirt") {
    return ((price * 1 + 0));
  }
  else if (style === "longsleeve") {
    return ((price * 1 + 4));
  }
  else if (style === "crewneck") {
    return ((price * 1 + 8));
  }
  else if (style === "hoodie") {
    return ((price * 1 + 12)); 
  }
}