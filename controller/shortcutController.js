const db = require('../database/config');

  
  const createMessage = (req, res) => {
    const { shortcut, message } = req.body;
  
    const query = 'INSERT INTO shortcut (shortcut, message) VALUES (?, ?)';
    db.query(query, [shortcut, message], (err, result) => {
      if (err) throw err;
      res.send('Shortcut message created successfully!');
    });
  };
  //------------------------------------------------------------Get Message----------------------------------------------------------//
  const getMessage = (req, res) => {
    const query = 'SELECT * FROM shortcut';
    db.query(query, (err, rows) => {
      if (err) throw err;
      res.json(rows);
    });
  };
  //------------------------------------------------------------update Message----------------------------------------------------------//
  const updateMessage = (req, res) => {
    const { id } = req.params;
    const { shortcut, message } = req.body;
  
    const query = 'UPDATE shortcut SET shortcut = ?, message = ? WHERE id = ?';
    db.query(query, [shortcut, message, id], (err, result) => {
      if (err) throw err;
      if (result.affectedRows === 0) {
        res.status(404).send('Shortcut message not found!');
      } else {
        res.send('Shortcut message updated successfully!');
      }
    });
  };

  const deleteMessage = (req, res) => {
    const { id } = req.params;
  
    const query = 'DELETE FROM shortcut WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) throw err;
      if (result.affectedRows === 0) {
        res.status(404).send('Shortcut message not found!');
      } else {
        res.send('Shortcut message deleted successfully!');
      }
    });
  };
  module.exports = {
    createMessage,
    getMessage,
    updateMessage,
    deleteMessage
  };