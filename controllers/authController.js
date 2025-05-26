// auth controller functions

const register = async (request, response, next) => {
  const { firstName, lastName, username, password } = request.body;
  console.log({ firstName, lastName, username, password });
  const newUser = {
    firstName,
    lastName,
    username,
    password,
  };

  try {
    response.status(201).json({
      success: { message: "New user created successfully" },
      data: { newUser },
      statusCode: 201,
    });
  } catch {
    response.status(500).json({
      error: { message: "Internal Server Error" },
      statusCode: 500,
    });
  }
};

const login = async (request, response, next) => {
  response.status(200).json({
    success: { message: "User logged in" },
    statusCode: 200,
  });
};

const logout = async (request, response, next) => {
  console.log("Initializing logout controller logic.");

  response.clearCookie("connect.sid", { path: "/" });

  response.status(200).json({
    success: { message: "User logging out" },
    statusCode: 200,
  });

  function sessionDestruction(err) {
    //error handling as a final check and a failsafe
    if (err) {
      return next(err);
    }
  }
  sessionDestruction();
  console.log("Logout function activated. Logging out");
};

const localLogin = async (request, response, next) => {
  let result = true;

  function mockPassport(err, user) {
    //error handling as a final check and a failsafe
    if (err) {
      return next(err);
    }
  }
  //call the mockPassport feature
  mockPassport();

  response.json({
    success: { message: "Login successful" },
    result: result,
  });
};

module.exports = { register, login, logout, localLogin };
