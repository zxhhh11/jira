module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    console.log(req.body, "body");
    if (req.body.username === "admin" && req.body.password === "123456") {
      return res.status(200).json({
        user: {
          token: "123",
          name: req.body.username,
        },
      });
    } else {
      return res.status(400).json({
        messsage: "用户名或密码错误",
      });
    }
  }

  if (req.method === "POST" && req.path === "/register") {
    console.log(req.body, "body");
    if (req.body.username && req.body.password) {
      return res.status(200).json({
        user: {
          token: "123",
          name: req.body.username,
        },
      });
    } else {
      return res.status(400).json({
        messsage: "用户名或密码错误",
      });
    }
  }
  next();
};
