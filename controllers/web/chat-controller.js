const chatController = {
  index: (req, res) => {
    res.render("chat", {
      layout: false,
    });
  },
}

module.exports = chatController