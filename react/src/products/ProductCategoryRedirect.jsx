import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Redirect component for legacy /products/:category URLs
function ProductCategoryRedirect() {
  const { category, subcategory } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Build the new query-based URL
    const params = new URLSearchParams();
    
    if (category) {
      params.set('category', category);
    }
    
    if (subcategory) {
      params.set('subcategory', subcategory);
    }
    
    // Redirect to the new URL format
    const queryString = params.toString();
    navigate(`/products${queryString ? '?' + queryString : ''}`, { replace: true });
  }, [category, subcategory, navigate]);

  // Return null since this component only handles redirects
  return null;
}

export default ProductCategoryRedirect;
