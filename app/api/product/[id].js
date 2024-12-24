// pages/api/product/[id].js
export default async function handler(req, res) {
    const { id } = req.query;
  
    try {
      const response = await fetch(`http://127.0.0.1:5000/product/${id}`); // Flask backend
      const data = await response.json();
  
      if (response.ok) {
        res.status(200).json(data);
      } else {
        res.status(response.status).json({ error: data.error });
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  