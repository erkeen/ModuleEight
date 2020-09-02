const express = require("express");
const multer = require("multer");
require("dotenv").config();
const {
  BlobServiceClient,
  StorageSharedKeyCredential,
  BlobLeaseClient,
} = require("@azure/storage-blob");
var MulterAzureStorage = require("multer-azure-storage");

console.log(process.env.STORAGE_KEY);
const credentials = new StorageSharedKeyCredential(
  "homeworkd8",
  process.env.STORAGE_KEY
);
const blobClient = new BlobServiceClient(
  "https://homeworkd8.blob.core.windows.net/",
  credentials
);

const router = express.Router();

router.get("/", async (req, res) => {
  const containers = await blobClient.listContainers();
  const toReturn = [];
  for await (const container of containers) toReturn.push(container.name);

  res.send(toReturn);
});

const multerOptions = multer({
  storage: new MulterAzureStorage({
    azureStorageConnectionString: process.env.STORAGE_CS,
    containerName: "images",
    containerSecurity: "container",
  }),
});

router.post(
  "/uploadWithMulter",
  multerOptions.single("file"),
  async (req, res) => {
    res.send(req.file.url);
  }
);

router.post("/:containerName", async (req, res) => {
  const container = await blobClient.createContainer(req.params.containerName, {
    access: "container",
  });

  res.send(container);
});

const options = new multer({});
router.post(
  "/:containerName/upload",
  options.single("file"),
  async (req, res) => {
    try {
      const container = await blobClient.getContainerClient(
        req.params.containerName
      );
      const file = await container.uploadBlockBlob(
        req.file.originalname,
        req.file.buffer,
        req.file.size
      );

      res.send(file);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  }
);

router.get("/:containerName", async (req, res) => {
  const container = await blobClient.getContainerClient(
    req.params.containerName
  );
  const files = await container.listBlobsFlat();
  const toReturn = [];
  for await (const file of files) toReturn.push(file.name);

  res.send(toReturn);
});

router.delete("/:containerName/:fileName", async (req, res) => {
  const container = await blobClient.getContainerClient(
    req.params.containerName
  );
  await container.deleteBlob(req.params.fileName);

  res.send("DELETED");
});

module.exports = router;
