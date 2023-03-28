module.exports = async function (context, req) {
  const generateSASToken = require("../utils/generateSASToken");
  sasToken = await generateSASToken();
  context.res = {
    // status: 200, /* Defaults to 200 */
    body: sasToken,
  };
};
