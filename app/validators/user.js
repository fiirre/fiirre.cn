class UserLoginValidator {
  constructor() {
    super();
  }
  validate(ctx) {
    console.log(ctx.body);
  }
}

module.exports = {
  UserLoginValidator,
};
