export default async function renderAllBills(req, res) {
    res.render('bills/index')
}

export default async function createBill(req, res, next) {
    // Replace id with bills id
    res.redirect('bills/:id')
}

export default async function showBill(req, res) {
    res.render('bills/')
}