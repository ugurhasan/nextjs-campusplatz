export async function POST(request) {
    try {
      const data = await request.json(); // Parse incoming request data
      console.log("Received product data:", data);
  
      // Forward the data to your Flask API
      const response = await fetch("http://127.0.0.1:5000/add_product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      // Check if the request to Flask was successful
      if (!response.ok) {
        return Response.json({ message: result.message || "Error adding product." }, { status: 500 });
      }
  
      return Response.json({ message: "Product added successfully!", product: result }, { status: 201 });
    } catch (error) {
      console.error("Error:", error);
      return Response.json({ message: "Server error occurred.", error: error.message }, { status: 500 });
    }
  }
  