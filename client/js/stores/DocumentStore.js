var StoreTemplate = require('./Template');
var PlanManagerService = require('../services/PlanManagerService');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/DocumentConstants.js');

var Store = new StoreTemplate(PlanManagerService.documents);

AppDispatcher.register(function(action) {
  switch (action.actionType) {
    case Constants.DOCUMENT_UPDATE:
      Store.update(action.doc, function(data) {
        action.callback(data);
        Store.emitChange();
      });
      break;
    case Constants.DOCUMENT_CREATE:
      Store.insert(action.doc, function(data) {
        action.callback(data);
        Store.emitChange();
      });
      break;
    case Constants.DOCUMENT_DESTROY:
      Store.delete(action.doc, function(data) {
        action.callback(data);
        Store.emitChange();
      });
      break;
  }
});

module.exports = Store;
