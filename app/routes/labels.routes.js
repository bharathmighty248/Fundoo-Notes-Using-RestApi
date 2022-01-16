const labels = require('../controllers/labels.controller');
const auth = require('../../utilities/auth');

module.exports = (app) => {
    app.post('/addlabel',auth.authentication, labels.addLabel);
    app.put('/updatelabel',auth.authentication, labels.updateLabel);
    app.delete('/deletelabel/:labelName',auth.authentication, labels.deleteLabel);
    app.get('/getlabels', auth.authentication, labels.getLabels);
    app.get('/getlabelbyname/:labelName', auth.authentication, labels.getLabelbyName);
}
