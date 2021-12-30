/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async create(req, res) {
    const { email, name, image, googleId } = req.body;
    // Cleaning parameters
    if (!email || !name) {
      return res.badRequest({ err: "Please specify name or email correctly." });
    }

    const userAlreadyExists = await User.findOne({ googleId });

    //  Creating User
    try {
      if (userAlreadyExists) {
        return res.ok(userAlreadyExists);
      } else {
        const user = await User.create({
          email,
          name,
          image,
          googleId,
        }).fetch();
        return res.ok(user);
      }
    } catch (err) {
      return res.serverError(err);
    }
  },

  find(req, res) {},

  findOne(req, res) {},

  update(req, res) {},

  delete(req, res) {},
};
