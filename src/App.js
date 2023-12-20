// Import React and other dependencies
import React, { useState , useEffect} from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  // Use state variables to manage form data
  const [page, setPage] = useState(8); // Default page value
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchEmptySearch = async () => {
      try {
        const response = await axios.get(
          "https://gitabackend.onrender.com/api/search?searchString="
        );
        setPage(response.data?.pages.length + 1);
      } catch (error) {
        console.error("Error fetching empty search:", error);
      }
    };

    fetchEmptySearch();
  }, []);

  // Function to handle form submission and API call
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the API endpoint
      const response = await axios.post("https://gitabackend.onrender.com/api/pages", {
        page,
        content,
      });

      // console.log("Response:", response.data); // Log the response data

      // Reset form fields after successful submission
      setPage((page)=>page+1); // Set default page value
      setContent(""); // Clear content field
    } catch (error) {
      console.error("Error:", error); // Log any errors
    }
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        {/* Page input field */}
        <label>
          Page:
          <input
            type="number"
            value={page}
            onChange={(e) => setPage(e.target.value)}
          />
        </label>

        {/* Content input field */}
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>

        {/* Submit button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
