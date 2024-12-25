export async function renderLogin(req, res) {
    res.render('users/login')
}

export async function renderRegister(req, res) {
    res.render('users/register')
}

export async function register(req, res) {
    res.redirect('/')
}

export async function login(req, res) {
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo
    res.redirect(redirectUrl);
}

export async function logout(req, res) {
    res.redirect('/')
}