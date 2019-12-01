import mongoose from 'mongoose';

const { Schema } = mongoose;

const listSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'List name is mandatory'],
    },
    description: {
      type: String,
      default: '',
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Lists = mongoose.model('Lists', listSchema);

export default Lists;
