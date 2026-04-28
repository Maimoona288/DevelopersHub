const bcrypt = require("bcrypt");

bcrypt.hash("mysecurepassword123", 10).then(console.log);
// const bcrypt = require("bcryptjs");node

bcrypt.compare(
  "mysecurepassword123",
  "$2b$10$cweSkW88/l6ASiHWclvaru1.Mk7KUrepQh1Z91hGxnUi/FXPNf9GC"
).then(console.log);