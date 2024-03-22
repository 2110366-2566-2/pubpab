import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY as string,
  },
});

console.log(s3Client);

export async function uploadImageToS3(
  folderName: string,
  file: { type: string },
) {
  const key = `${Date.now()}.${file.type.split("/").pop()}`;
  const params = {
    Bucket: "pubpub-database",
    Key: key,
    Body: folderName + "/" + file,
    ContentType: "image/png",
  };
  return null;
}

export async function getImageUrlFromS3(imageKey: string) {
  const params = new GetObjectCommand({
    Bucket: "pubpub-database",
    Key: imageKey,
  });

  const url = await getSignedUrl(s3Client, params);
  return url;
}

export async function uploadImageToS3Tmp(imageFile: object) {
  const params = {
    Bucket: "pubpub-database",
    Key: "temp/" + imageFile.name, // Define the key for the uploaded file
    Body: imageFile, // Set the body of the request as the image file
    ContentType: imageFile.type, // Set the content type of the file
  };
  try {
    await s3Client.send(new PutObjectCommand(params));
    return true;
  } catch (err) {
    return false;
  }
}

export async function moveObjectInS3(sourceKey, destinationKey) {
  try {
    // Copy object from source to destination
    const copyParams = {
      Bucket: "pubpub-database",
      CopySource: encodeURI("pubpub-database/" + sourceKey), // Format: "bucket-name/source-key"
      Key: destinationKey, // Destination key (folder + file name)
    };

    const copyResponse = await s3Client.send(new CopyObjectCommand(copyParams));

    // If copy is successful, delete the original object
    if (copyResponse.$metadata.httpStatusCode === 200) {
      deleteObjectInS3(sourceKey);
    } else {
      console.error("Failed to copy object:", copyResponse);
      return false;
    }
  } catch (error) {
    console.error("Error moving object in S3:", error);
    return false;
  }
}

export async function deleteObjectInS3(sourceKey) {
  const deleteParams = {
    Bucket: "pubpub-database",
    Key: sourceKey, // Source key (folder + file name)
  };

  const deleteResponse = await s3Client.send(
    new DeleteObjectCommand(deleteParams),
  );

  // Check if deletion was successful
  if (deleteResponse.$metadata.httpStatusCode === 204) {
    console.log("Object moved successfully.");
    return true;
  } else {
    console.error(
      "Failed to delete original object after copy:",
      deleteResponse,
    );
    return false;
  }
}

//export { uploadImageToS3, getImageUrlFromS3 };
