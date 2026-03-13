export function requireAuthPage(req, res, next) {
 if (req.session && req.session.userId) {
  return next()
 }

 return res.redirect("/login")
}

export function requireAuthApi(req, res, next) {
 if (req.session && req.session.userId) {
    return next()
 }

    return res.redirect("/login");
}