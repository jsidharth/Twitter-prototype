import mongoose from 'mongoose';

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    user_1: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
    user_2: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
    messages: [
      {
        _id: false,
        sender: {
          type: Schema.Types.ObjectId,
          ref: 'Users',
        },
        body: {
          type: String,
        },
        createdAt: {
          type: Date,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Messages = mongoose.model('Messages', messageSchema);

export default Messages;
