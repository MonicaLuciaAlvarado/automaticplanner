const HabitoController = require("../controllers/habito.controller");

module.exports = app => {
    app.get('/api/habitos', HabitoController.get_all);
    app.post('/api/habitos', HabitoController.create_habito);
    app.get('/api/mostrar/:ide', HabitoController.get_habitos_days);
    app.put('/api/habitos/:id', HabitoController.update_habito);
    app.delete('/api/habitos/:id', HabitoController.delete_habito);
}