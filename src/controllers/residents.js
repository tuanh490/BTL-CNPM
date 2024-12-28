export async function renderResidents(req, res) {


    res.render('residents/index')
}

export async function createResident(req, res) {
    res.redirect('/residents/:id')
}

export async function updateResident(req, res) {
    res.redirect('/residents/:id')
}

export async function deleteResident(req, res) {
    res.redirect('/residents')
}