export async function renderRooms(req, res) {
    res.render('rooms/index')
}

export async function createRoom(req, res) {
    res.redirect('/rooms/:id')
}

export async function showRoom(req, res) {
    res.render('rooms/show')
}

export async function updateRoom(req, res) {
    res.redirect('/rooms/:id')
}

export async function deleteRoom(req, res) {
    res.redirect('/rooms')
}