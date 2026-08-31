const Income = require("../models/Income");
const Spendings = require("../models/Spendings");
const User = require("../models/User");
const { isValidObjectId, Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        const totalSpendings = await Spendings.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        const last30DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        const incomeLast30Days = last30DaysIncomeTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

        const last30DaysSpendingsTransactions = await Spendings.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        const spendingsLast30Days = last30DaysSpendingsTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

        const lastTransactions = [
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
            (txn) => ({ ...txn.toObject(), type: "income" })),

            ...(await Spendings.find({ userId }).sort({ date: -1 }).limit(5)).map(
            (txn) => ({ ...txn.toObject(), type: "spending" }))
        ].sort((a, b) => b.date - a.date);

        const user = await User.findById(userId).select("monthlyBudget");
        const monthlyBudget = user?.monthlyBudget || 0;
        const budgetExceeded = monthlyBudget > 0 && spendingsLast30Days > monthlyBudget;

        res.json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalSpendings[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalSpendings: totalSpendings[0]?.total || 0,
            last30DaysSpendings: {
                total: spendingsLast30Days,
                transactions: last30DaysSpendingsTransactions,
            },
            last30DaysIncome: {
                total: incomeLast30Days,
                transactions: last30DaysIncomeTransactions,
            },
            recentTransactions: lastTransactions,
            budgetAlert: {
                monthlyBudget,
                spentLast30Days: spendingsLast30Days,
                exceeded: budgetExceeded,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

