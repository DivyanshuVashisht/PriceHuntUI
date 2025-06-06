// pages/api/search.ts
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query;

  const sample = [
    {
      title: "Apple iPhone 14",
      price: "₹74,999",
      site: "Amazon",
      url: "https://amazon.in/example",
      image: "https://via.placeholder.com/300x200",
    },
    {
      title: "Samsung Galaxy S23",
      price: "₹69,999",
      site: "Flipkart",
      url: "https://flipkart.com/example",
      image: "https://via.placeholder.com/300x200",
    },
  ];

  res.status(200).json({ products: sample });
}
