const express = require("express");
const app = express();
const port = 57865;

app.use(express.urlencoded({ extended: true });
app.use(express.json());

module.exports = app;
require("./handler")(app);

app.use((req, res) => {
    res.status(404).json({
        error: {
            message: `Cannot ${req.method} ${req.url}`,
            code: 404,
            param: null
        }
    });
});

app.listen(port, function() {
    console.log("[WebServer] Servidor inicializado na porta " + port);
});
