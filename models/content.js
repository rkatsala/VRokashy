// ***** Модель контенту *****
function Content(head, body) {
  this._head = head;
  this._body = body;
  this._date = new Date();
}

// ***** Методи контенту *****
// Редагування контенту
Content.prototype.editContent = function(newHead, newBody) {
  this._head = newHead;
  this._body = newBody;
  this._editDate = new Date(); // додається дата редагування
}


module.exports = Content;
