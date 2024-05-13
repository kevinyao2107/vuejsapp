import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Entrez votre nom svp!'],
    },
    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: [true, 'Entrez votre mot de passe svp!'],
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
