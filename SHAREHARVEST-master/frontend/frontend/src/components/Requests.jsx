import { useState, useEffect } from "react";

function Requests({ user }) {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true); // Set loading to true
      try {
        const endpoint = user.role === "DONOR"
          ? `${import.meta.env.VITE_API_URL}/api/requests/donor/${user.id}`
          : `${import.meta.env.VITE_API_URL}/api/requests/receiver/${user.id}`;
        
        const response = await fetch(endpoint);
        if (response.ok) {
          const data = await response.json();
          setRequests(data);
        } else {
          console.error("Failed to fetch requests:", response.statusText);
        }
      } catch (error) {
        console.error("Network error fetching requests:", error);
      } finally {
        setIsLoading(false); // Always set loading to false
      }
    };

    if (user && user.id) {
      fetchRequests();
    }
  }, [user]);

  const handleUpdateStatus = async (id, status) => {
    setIsLoading(true); // Set loading to true before update
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/requests/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(status),
      });
      if (response.ok) {
        setRequests(requests.map((req) =>
          req.id === id ? { ...req, status: status } : req
        ));
        // No need to refetch all if we just update the specific item
      } else {
        const error = await response.text();
        alert(`Failed to update request status: ${error}`);
      }
    } catch (error) {
      alert(`Network error updating request status: ${error}`);
    } finally {
      setIsLoading(false); // Always set loading to false
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <p className="text-gray-900">Please log in to view requests.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-green py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative container mx-auto z-10">
        <h2 className="text-4xl font-extrabold text-deep-green text-center mb-12">
          {user.role === "DONOR" ? "Requests for Your Items" : "Your Requests"}
        </h2>
        {isLoading ? (
          <div className="text-center py-10">
            <p className="text-deep-green text-xl font-semibold">Loading Requests...</p>
            {/* You can add a spinner icon here if you have one */}
          </div>
        ) : requests.length === 0 ? (
          <p className="text-center text-gray-700 text-lg col-span-full">No requests found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {requests.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between transform hover:scale-105 transition-transform duration-300 border border-medium-green/30"
              >
                <div>
                  <h3 className="text-2xl font-bold text-deep-green mb-2">
                    {req.foodItem.name}
                  </h3>
                  <p className="text-gray-700 text-sm mb-4">
                    {user.role === "DONOR"
                      ? `Requested by: ${req.receiver.username} (${req.requestedQuantity} items)`
                      : `Donor: ${req.foodItem.donor.username}`}
                  </p>
                  <span
                    className={`inline-block px-4 py-1 rounded-full text-sm font-semibold shadow-md ${
                      req.status === "PENDING"
                        ? "bg-yellow text-deep-green"
                        : req.status === "ACCEPTED"
                        ? "bg-medium-green text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
                {user.role === "DONOR" && req.status === "PENDING" && (
                  <div className="flex space-x-3 mt-6">
                    <button
                      onClick={() => handleUpdateStatus(req.id, "ACCEPTED")}
                      className="flex-1 bg-deep-green text-white px-5 py-2 rounded-full font-bold hover:bg-darker-green focus:outline-none focus:ring-2 focus:ring-deep-green focus:ring-offset-2 transition-all duration-300 shadow-lg"
                      aria-label={`Accept request for ${req.foodItem.name}`}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(req.id, "REJECTED")}
                      className="flex-1 bg-gray-300 text-gray-800 px-5 py-2 rounded-full font-semibold hover:bg-gray-400 transition-colors duration-300 shadow-lg"
                      aria-label={`Reject request for ${req.foodItem.name}`}
                    >
                      Reject
                    </button>
                  </div>
                )}
                {user.role === "DONOR" && (req.status === "ACCEPTED" || req.status === "REJECTED") && (
                    <div className="mt-6 text-center text-gray-600 font-medium">
                        Request {req.status.toLowerCase()}!
                    </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Requests;