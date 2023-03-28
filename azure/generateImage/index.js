module.exports = async function (context, req) {
  const openai = require("../utils/apenai");
  const generateSASToken = require("../utils/generateSASToken");
  const axios = require("axios");
  const { BlobServiceClient } = require("@azure/storage-blob");
  const accountName = process.env.accountName;
  const containerName = "images";

  console.log(`Request Body: ${JSON.stringify(req.body)}`);

  const { prompt } = req.body;

  console.log(`Prompt is ${prompt}`);

  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });

  image_url = response.data.data[0].url;

  //download the image as arraybuffer
  const res = await axios.get(image_url, { responseType: "arraybuffer" });

  const arrayBuffer = res.data;

  sasToken = await generateSASToken();

  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net?${sasToken}`
  );

  const containerClient = blobServiceClient.getContainerClient(containerName);

  // generate current timestamp
  const timestamp = new Date().getTime();
  const file_name = `${prompt}_${timestamp}.png`;

  const blockBlobClient = containerClient.getBlockBlobClient(file_name);

  try {
    await blockBlobClient.uploadData(arrayBuffer);
    console.log("File uploaded successfully!");
  } catch (error) {
    console.error("Error uploading file:", error.message);
  }

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: "Successfully Uploaded Image",
  };
};
