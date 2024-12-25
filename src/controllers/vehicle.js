export async function renderVehicle(req, res) {
    res.render('vehicle/index')
}

export async function createVehicle(req, res) {
    res.redirect('/vehicle/:id')
}

export async function showVehicle(req, res) {
    res.render('vehicle/show')
}

export async function updateVehicle(req, res) {
    res.redirect('/vehicle/:id')
}

export async function deleteVehicle(req, res) {
    res.redirect('/vehicle')
}