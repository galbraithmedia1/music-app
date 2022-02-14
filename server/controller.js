const songs = require('./db.json')

module.export =  {

    getSongs: (req, res) => {
        res(200).send(songs);
      },

}