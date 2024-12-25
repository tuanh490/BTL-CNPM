export async function renderUserTypedBills(req, res) {
    res.render('bills/user_typed_bills/index')
}

export async function createUserTypedBill(req, res, next) {
    // Replace id with bills id
    res.redirect('/bills/user_typed_bills/:id')
}

export async function showUserTypedBill(req, res) {
    // Replace id with bills id
    res.render('bills/user_typed_bills/show')
}

export async function updateUserTypedBill(req, res) {
    // Replace id with bills id
    res.redirect('/bills/user_typed_bills/:id')
}

export async function deleteUserTypedBill(req, res) {
    res.redirect('/bills/user_typed_bills/index')
}