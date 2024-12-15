import { Document, model, Schema } from "mongoose";

// 1. Interface - describing model properties:
export interface INameModel__ extends Document {
    // We do not define the _id
    propsName__: string
}

// 2. Schema - describing model rules:
export const NameSchema__ = new Schema<INameModel__>({
    propsName__: {
        type: String,
    }
}, { 
    versionKey: false, // Don't add a __v property to a new document.
    // toJSON: { virtuals: true }, // Return virtual fields.
    // id: false // Don't duplicate the _id into id property.
});

// // connecting virtual model:
// NameSchema__.virtual("connected-field__", {
//     ref: ConnectedModel__, // The model we're connecting to.
//     localField: "collectionId__", // In our model (NameModel) which is the related property.
//     foreignField: "_id", // In the other model (ConnectedModel) which is the related property.
//     justOne: true //return only the wanted property and not the all array with props. connected field is an object and not array.
// });

// Model name, model schema, collection name
export const NameModel__ = model<INameModel__>("NameModel__", NameSchema__, "collectionName__") 
