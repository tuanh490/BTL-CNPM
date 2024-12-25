export async function renderMonthlyBills(req, res) {
    res.render('bills/monthly_bills/index')
}

export async function createMonthlyBill(req, res) {
    // Replace id with bills id
    res.redirect('/bills/monthly_bills/:id')
}

export async function showMonthlyBill(req, res) {
    // Replace id with bills id
    res.redirect('/bills/monthly_bills/:id')
}

export async function updateMonthlyBill(req, res) {
    // Replace id with bills id
    res.redirect('/bills/monthly_bills/:id"')
}