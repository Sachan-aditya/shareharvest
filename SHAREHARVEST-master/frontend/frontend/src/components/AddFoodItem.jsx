import { useState } from "react";
import { X } from "lucide-react";

function FoodItems({ user }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state for form submission
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    quantity: 1, // Initialize as number
    photoUrl: "", // Initialize as empty string
    expiryDate: "",
  });

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
      setIsLoading(true); // Set loading to true for form submission
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
        // No need to fetch all food items again here, as this component doesn't display them
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          photoUrl: reader.result, // Store Base64 string
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevState) => ({ ...prevState, photoUrl: "" }));
    }
  };

  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"; // Set placeholder
    setFormData((prev) => ({ ...prev, photoUrl: "" })); // Clear invalid URL
  };

  return (
    <div className="min-h-screen bg-light-green py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative container mx-auto z-10">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-extrabold text-deep-green text-center flex-1">
            Add New Food Item
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

        {/* Removed food items display as this component is for adding only */}

        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative">
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
                    Photo Upload
                  </label>
                  <input
                    type="file"
                    id="photoUrl"
                    name="photoUrl"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-1 block w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-deep-green file:text-white hover:file:bg-darker-green"
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
                    disabled={isLoading} // Disable button when loading
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-deep-green text-white px-5 py-2 rounded-full font-semibold hover:bg-darker-green focus:outline-none focus:ring-2 focus:ring-deep-green focus:ring-offset-2 transition-all duration-300"
                    disabled={isLoading} // Disable button when loading
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      "Add Item"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FoodItems;