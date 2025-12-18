import { Schema, model, Document } from "mongoose";

export interface IBoulder extends Document {
  title: string;
  description: string;
  grade: {
    value: string;
    system: "font" | "v-scale";
  };
  displayGrade?: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  imageUrl: string;
  annotations: Array<{
    x: number;
    y: number;
    type: "hand" | "foot";
  }>;
  creator: Schema.Types.ObjectId;
}

const boulderSchema = new Schema<IBoulder>(
  {
    title: { type: String, required: true },
    description: String,
    grade: {
      value: { type: String, required: true },
      system: {
        type: String,
        enum: ["font", "v-scale"],
        required: true,
      },
    },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true },
    },
    imageUrl: { type: String, required: true }, // Lagt till imageUrl som saknades i schemat
    annotations: [
      {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        type: { type: String, enum: ["hand", "foot"], default: "hand" },
      },
    ],
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

boulderSchema.index({ location: "2dsphere" });

export const Boulder = model<IBoulder>("Boulder", boulderSchema);
