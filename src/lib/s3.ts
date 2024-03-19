import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
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

//export { uploadImageToS3, getImageUrlFromS3 };
