import ObjectId from "bson-objectid"

export const generateObjectId = (): string => {
    return ObjectId().toHexString();
  }