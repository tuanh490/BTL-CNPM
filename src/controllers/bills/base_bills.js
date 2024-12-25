export async function renderBaseBills(req, res) {
    res.render('bills/base_bills/index')
}

export async function showBaseBill(req, res) {
    // Replace id with bills id
    res.render('bills/base_bills/show')
}

export async function createBaseBill(req, res) {
    // Replace id with bills id
    res.redirect('/bills/base_bills/:id')
}

export async function updateBaseBill(req, res) {
    // Replace id with bills id
    res.redirect('/bills/base_bills/:id')
}

export async function deleteBaseBill(req, res) {
    res.redirect('/bills/base_bills/index')
}
