import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: "AKIA47CR2YSPLUEAUXE2",
  secretAccessKey: "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",
});

async function uploadImageToS3(folderName: string, file: { type: string }) {
  const key = `${Date.now()}.${file.type.split("/").pop()}`;
  const params = {
    Bucket: "pubpab-database",
    Key: key,
    Body: folderName + "/" + file,
    ContentType: file.type,
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location; // URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    throw error;
  }
}

export { uploadImageToS3 };
