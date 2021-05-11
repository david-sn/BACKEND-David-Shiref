const glob=require('glob');

function setRoutes(app) {
    let options = {};
    let files = glob.sync('**/*.router.js', options);
    files.map(file=> {
        app.use('/', require('./../' + file));
    });
}

module.exports = {
    setRoutes
};
