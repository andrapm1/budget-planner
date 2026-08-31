const express = require("express");
const {
    addSpendings,
    getAllSpendings,
    deleteSpendings,
    downloadSpendingsExcel // de adaugat mai tarziu updateSpendings , getSpendingsStats

} = require("../controllers/spendingsController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addSpendings);
router.get("/get", protect, getAllSpendings);
router.get("/downloadexcel", protect, downloadSpendingsExcel);
router.delete("/:id", protect, deleteSpendings);

module.exports = router;