import { useState, useEffect } from "react";
import { X } from "lucide-react";

function FoodItems({ user }) {
  const [foodItems, setFoodItems] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    quantity: 1,
    photoUrl: "",
    expiryDate: "",
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/food-items`)
      .then((res) => res.json())
      .then((data) => {
        setFoodItems(data);
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching food items:", error);
        setIsLoading(false); // Also set to false on error
      });
  }, []);

  const handleRequest = async (foodItemId, requestedQuantity) => {
    if (!user || user.role !== "RECEIVER") {
      alert("Only receivers can request food items!");
      return;
    }
    if (!requestedQuantity || requestedQuantity <= 0) {
      alert("Please enter a valid quantity to request.");
      return;
    }

    // Optimistic UI update for now, actual deduction happens on backend acceptance
    const foodItemToUpdate = foodItems.find(item => item.id === foodItemId);
    if (foodItemToUpdate && requestedQuantity > foodItemToUpdate.quantity) {
      alert(`Requested quantity (${requestedQuantity}) exceeds available quantity (${foodItemToUpdate.quantity}) for ${foodItemToUpdate.name}.`);
      return;
    }

    const request = {
      foodItem: { id: foodItemId },
      receiver: { id: user.id },
      requestedQuantity: requestedQuantity, // Include requested quantity
    };
    try {
      // Before sending, re-check quantity client-side to prevent over-requesting
      const currentItem = foodItems.find(item => item.id === foodItemId);
      if (currentItem && requestedQuantity > currentItem.quantity) {
        alert(`Requested quantity (${requestedQuantity}) exceeds current available quantity (${currentItem.quantity}) for ${currentItem.name}. Please select a lower quantity.`);
        return;
      }
      if (requestedQuantity > 3) {
        alert("You can request a maximum of 3 items at a time.");
        return;
      }

      setIsLoading(true); // Set loading to true before request
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      if (response.ok) {
        alert("Request submitted successfully!");
        // Update the quantity displayed on the frontend immediately
        setFoodItems(prevItems =>
          prevItems.map(item =>
            item.id === foodItemId
              ? { ...item, quantity: item.quantity - requestedQuantity, available: (item.quantity - requestedQuantity) > 0 }
              : item
          )
        );
      } else {
        const error = await response.text();
        alert(`Request failed: ${error}`);
      }
    } catch (error) {
      alert(`Network error: ${error}`);
    } finally {
      setIsLoading(false); // Always set loading to false
    }
  };

  const handleAddFoodItem = async (e) => {
    e.preventDefault();
    if (!user || user.role !== "DONOR") {
      alert("Only donors can add food items!");
      return;
    }
    const newFoodItem = {
      ...formData,
      donor: { id: user.id },
      available: true,
    };
    try {
      setIsLoading(true); // Set loading to true before add food item
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/food-items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFoodItem),
      });
      if (response.ok) {
        alert("Food item added successfully!");
        setIsFormOpen(false);
        setFormData({
          name: "",
          description: "",
          category: "",
          quantity: 1,
          photoUrl: "",
          expiryDate: "",
        });
        fetch(`${import.meta.env.VITE_API_URL}/api/food-items`)
          .then((res) => res.json())
          .then((data) => setFoodItems(data));
      } else {
        const error = await response.text();
        alert(`Failed to add food item: ${error}`);
      }
    } catch (error) {
      alert(`Network error: ${error}`);
    } finally {
      setIsLoading(false); // Always set loading to false
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-light-green py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative container mx-auto z-10">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-extrabold text-deep-green text-center flex-1">
            Available Food Items
          </h2>
          {user && user.role === "DONOR" && (
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-yellow text-deep-green px-6 py-3 rounded-full font-bold shadow-lg hover:bg-amber-400 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow focus:ring-opacity-75"
              aria-label="Add new food item"
            >
              Add Food Item
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-10">
            <p className="text-deep-green text-xl font-semibold">Loading Food Items...</p>
            {/* You can add a spinner icon here if you have one */}
          </div>
        ) : foodItems.length === 0 ? (
          <p className="text-center text-gray-700 text-lg">No food items available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {foodItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 border border-medium-green/30"
              >
                <div className="relative w-full h-48">
                  <img
                    src={item.photoUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <span className="absolute bottom-3 left-3 bg-deep-green text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    {item.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-deep-green mb-2">{item.name}</h3>
                  <p className="text-gray-700 text-sm mb-3 flex-grow">{item.description}</p>
                  <div className="flex justify-between items-center text-gray-800 text-md font-medium mb-2">
                    <span>Quantity: <span className="font-bold text-deep-green">{item.quantity}</span></span>
                    <span>Donor: <span className="font-bold text-deep-green">{item.donor.username}</span></span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Expiry: {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : "N/A"}
                  </p>
                  {user && user.role === "RECEIVER" && item.available && (
                    <div className="mt-auto">
                      <div className="flex items-center justify-center mb-3">
                        <label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity</label>
                        <input
                          type="number"
                          id={`quantity-${item.id}`}
                          min="1"
                          max={Math.min(item.quantity, 3)} // Max quantity is min of available or 3
                          defaultValue="1"
                          className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-center text-deep-green focus:outline-none focus:ring-2 focus:ring-yellow focus:border-yellow"
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (val > item.quantity) {
                              e.target.value = item.quantity;
                            } else if (val < 1) {
                              e.target.value = 1;
                            } else if (val > 3) { // Enforce max 3 quantity
                              e.target.value = 3;
                            }
                          }}
                        />
                      </div>
                      <button
                        onClick={() => handleRequest(item.id, parseInt(document.getElementById(`quantity-${item.id}`).value))}
                        className="w-full bg-yellow text-deep-green py-3 rounded-full font-bold shadow-lg hover:bg-amber-400 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow focus:ring-opacity-75"
                        aria-label={`Request ${item.name}`}
                      >
                        Request
                      </button>
                    </div>
                  )}
                  {!item.available && (
                    <span className="mt-auto w-full text-center bg-gray-300 text-gray-700 py-3 rounded-full font-bold">Not Available</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close form"
            >
              <X size={24} />
            </button>
            <h3 className="text-3xl font-bold text-deep-green mb-6 text-center">
              Add New Food Item
            </h3>
            <form onSubmit={handleAddFoodItem} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:border-yellow focus:ring-yellow sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:border-yellow focus:ring-yellow sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:border-yellow focus:ring-yellow sm:text-sm"
                >
                  <option value="">Select a category</option>
                  <option value="VEGETABLES">Vegetables</option>
                  <option value="FRUITS">Fruits</option>
                  <option value="GRAINS">Grains</option>
                  <option value="DAIRY">Dairy</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  min="1"
                  className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:border-yellow focus:ring-yellow sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Photo URL
                </label>
                <input
                  type="url"
                  id="photoUrl"
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:border-yellow focus:ring-yellow sm:text-sm"
                />
                {formData.photoUrl && (
                  <div className="mt-3">
                    <img
                      src={formData.photoUrl}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:border-yellow focus:ring-yellow sm:text-sm"
                />
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="bg-gray-300 text-gray-800 px-5 py-2 rounded-full font-semibold hover:bg-gray-400 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-deep-green text-white px-5 py-2 rounded-full font-semibold hover:bg-darker-green focus:outline-none focus:ring-2 focus:ring-deep-green focus:ring-offset-2 transition-all duration-300"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FoodItems;