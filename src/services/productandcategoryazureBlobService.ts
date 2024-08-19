import { BlobServiceClient } from "@azure/storage-blob";
import dotenv from "dotenv";
dotenv.config();

const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME as string;

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING as string,
);

export async function uploadImageToBlob(
  file: Express.Multer.File,
): Promise<string> {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobName = new Date().getTime() + "-" + file.originalname;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  await blockBlobClient.uploadData(file.buffer, {
    blobHTTPHeaders: {
      blobContentType: file.mimetype,
    },
  });

  return blockBlobClient.url;
}
