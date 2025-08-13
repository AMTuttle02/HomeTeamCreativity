export function GetProductPriceWithSize(price, type, size) {
  price = price * 1;
  if (type == "Crewneck Sweatshirt") {
    price += 8;
  }
  else if (type == "Hooded Sweatshirt") {
    price += 12;
  }
  else if (type == "Long Sleeve T-Shirt") {
    price += 4;
  }

  if (size == "Youth Small" || size == "Youth Medium" || size == "Youth Large" || size == "Youth X-Large") {
    price -= 2;
  }
  else if (size == "Adult XX-Large" || size == "Adult XXX-Large") {
    price += 2;
  }
  return price;
}