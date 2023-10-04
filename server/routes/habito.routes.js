const HabitoController = require("../controllers/habito.controller");
const UserController = require("../controllers/user.controller")

const {authenticate} = require("../config/jwt.config");

module.exports = app => {
    app.get('/api/habitos', authenticate, HabitoController.get_all);
    app.post('/api/habitos', authenticate, HabitoController.create_habito);
    app.put('/api/habitos/', authenticate, HabitoController.update_habito);
    app.delete('/api/habitos/:id', authenticate, HabitoController.delete_habito);

    app.post("/api/register", UserController.register)
    app.post("/api/login", UserController.login);
    app.get("/api/logout", UserController.logout)
}