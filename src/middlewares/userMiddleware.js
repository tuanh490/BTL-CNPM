export function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Bạn cần đăng nhập để sử dụng tính năng này. Vui lòng đăng nhập để tiếp tục!')
    res.redirect(303, '/')
}