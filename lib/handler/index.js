const { readdirSync } = require("node:fs");

module.exports = function(app) {
    const base = path.resolve("lib", "routes");

    readdirSync(base)
        .map(dir => path.join(base, dir))
        .forEach(dir => {
            const files = readdirSync(dir)
                .filter(file => file.endsWith(".js"));
                .map(file => path.join(dir, file));
            
            for (const file of files) {
                try {
                    require(file)(app);
                } catch(err) {
                    console.error(`[Logs] [${file}] Error detected:\n\x1b[91m%s\x1b[0m`, err.stack);
                }
                
                delete require.cache[require.resolve(file)];
            }
        });
};
