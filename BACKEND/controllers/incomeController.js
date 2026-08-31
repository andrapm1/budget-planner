const xlsx = require("xlsx");
const Income = require("../models/Income");

// add income source 
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, source, amount, date } = req.body;
        
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "Toate campurile sunt obligatorii" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date),
        });

        await newIncome.save();
        res.status(201).json(newIncome);
    } catch (error) {
        res.status(500).json({ message: "Eroare la adaugarea sursei de venit" });
    }

}

// GET all income source
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.json(income);
    } catch (error) {
        res.status(500).json({ message: "Eroare la preluarea surselor de venit" });
    }

}

// delete income source 
exports.deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Sursa de venit a fost stearsa cu succes" });
    } catch (error) {
        res.status(500).json({ message: "Eroare la stergerea sursei de venit" });
    }

}

// download income source in excel format
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        const data = income.map((item) => ({
            Sursa: item.source,
            Suma: item.amount,
            Data: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, "income.xlsx");
        res.download("income.xlsx");
    } catch (error) {
        res.status(500).json({ message: "Eroare la descarcarea fisierului Excel" });
    }
}



