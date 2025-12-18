import { Schema, model } from "mongoose";

const boulderSchema = new Schema({
  title: { type: String, required: true },
  description: String,
});
