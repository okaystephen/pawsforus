const sampleController = {
  index: (req, res) => {
    res.send("get all samples");
  },
  show: (req, res) => {
    res.send(`get sample ${req.params.id}`);
  },
  create: (req, res) => {
    res.send("send the view for creating a sample");
  },
  store: (req, res) => {
    res.send(`store sample ${req.params.id} from db`);
  },
  edit: (req, res) => {
    res.send(`send the view for editing sample ${req.params.id}`);
  },
  update: (req, res) => {
    res.send(`update sample ${req.params.id} in db`);
  },
  delete: (req, res) => {
    res.send(`"delete sample ${req.params.id} from db"`);
  },
};

module.exports = sampleController;
