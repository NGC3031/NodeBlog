module.exports = (req, res) => {
    req.session.destroy(() => {
        console.log('exit logging out');
        res.redirect('/')
    })
}