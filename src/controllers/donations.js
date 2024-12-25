export async function renderDonations(req, res) {
    res.render('donations/index')
}

export async function createDonation(req, res) {
    res.redirect('/donations/:id')
}

export async function whowDonation(req, res) {
    // Replace id with bills id
    res.render('donations/show')
}

export async function updateDonation(req, res) {
    // Replace id with bills id
    res.redirect('/donations')
}

export async function deleteDonation(req, res) {
    res.redirect('/donations')
}