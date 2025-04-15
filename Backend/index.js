import express from "express";
import Card from "./models/card.js";
import parser from "./utils/gemenai.js";
import connectDb from "./utils/db.js";
import cors from "cors";
import ExcelJS from "exceljs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDb();

app.post("/gemenai", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ message: "Image URL is required" });
  }

  try {
    const data = await parser(url, process.env.GEMENAI_API_KEY);

    // console.log(data);

    const info = await Card.create({
      name: data.Name,
      designation: data.Designation,
      companyName: data["Company Name"],
      address: data.Address,
      phoneNumbers: data["Phone Numbers"],
      email: data.Email,
      website: data.Website,
      image: url,
    });

    res.status(200).json({ message: "success", info });
  } catch (error) {
    console.error("Error in /gemenai:", error);
    res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
});

app.get("/info", async (req, res) => {
  try {
    const data = await Card.find();

    res.status(200).json({ message: "success", data: data });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
});

app.get("/download", async (req, res) => {
  try {
    const dataFromDB = await Card.find();
    console.log("Fetched data:", dataFromDB); // keep for debugging

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Contacts");

    // Define headers (not keys from DB)
    worksheet.columns = [
      { header: "Name", key: "name" },
      { header: "Designation", key: "designation" },
      { header: "Company Name", key: "companyName" },
      { header: "Address", key: "address" },
      { header: "Phone Numbers", key: "phoneNumbers" },
      { header: "Email", key: "email" },
      { header: "Website", key: "website" },
    ];

    // Add rows using actual keys
    dataFromDB.forEach((entry) => {
      worksheet.addRow({
        name: entry.name,
        designation: entry.designation,
        companyName: entry.companyName,
        address: entry.address,
        phoneNumbers: Array.isArray(entry.phoneNumbers)
          ? entry.phoneNumbers.join(", ")
          : "",
        email: entry.email,
        website: entry.website,
      });
    });

    // Set response headers
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=contacts.xlsx");

    // Write the workbook
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("Error generating Excel file:", err);
    res
      .status(500)
      .send("Something went wrong while generating the Excel file.");
  }
});

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
