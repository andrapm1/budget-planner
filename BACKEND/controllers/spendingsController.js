const xlsx = require("xlsx");
const Income = require("../models/Income");
const Spendings = require("../models/Spendings");

// add spendings source 
exports.addSpendings = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, category, amount, date } = req.body;
        
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "Toate campurile sunt obligatorii" });
        }

        const newSpendings = new Spendings({
            userId,
            icon,
            category,
            amount,
            date: new Date(date),
        });

        await newSpendings.save();
        res.status(201).json(newSpendings);
    } catch (error) {
        res.status(500).json({ message: "Eroare la adaugarea sursei de cheltuieli" });
    }

}

// GET all spendings source
exports.getAllSpendings = async (req, res) => {
    const userId = req.user.id;

    try {
        const spendings = await Spendings.find({ userId }).sort({ date: -1 });
        res.json(spendings);
    } catch (error) {
        res.status(500).json({ message: "Eroare la preluarea surselor de cheltuieli" });
    }

}

// delete spendings source 
exports.deleteSpendings = async (req, res) => {
    try {
        await Spendings.findByIdAndDelete(req.params.id);
        res.json({ message: "Sursa de cheltuieli a fost stearsa cu succes" });
    } catch (error) {
        res.status(500).json({ message: "Eroare la stergerea sursei de cheltuieli" });
    }

}

// download spendings source in excel format
exports.downloadSpendingsExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const spendings = await Spendings.find({ userId }).sort({ date: -1 });

        const data = spendings.map((item) => ({
            Categorie: item.category,
            Suma: item.amount,
            Data: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "spendings");
        xlsx.writeFile(wb, "spendings.xlsx");
        res.download("spendings.xlsx");
    } catch (error) {
        res.status(500).json({ message: "Eroare la descarcarea fisierului Excel" });
    }
}



