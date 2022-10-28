const PostingSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please provide name"],
      maxlength: 50,
    },
    postMessage: {
      type: String,
      required: [true, "Please provide a posting"],
      maxlength: 200,
    },
    status: {
      type: String,
      enum: ["current", "fulfilled"],
      default: "current",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posting", PostingSchema);
