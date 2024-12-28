export async function renderAllBills(req, res) {
    res.render('bills/bill')
}

export async function createBill(req, res, next) {
    // Replace id with bills id
    res.redirect('bills/:id')
}

export async function showBill(req, res) {
    res.render('bills/')
}
