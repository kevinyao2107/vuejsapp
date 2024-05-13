import mongoose from 'mongoose';

// Création du schéma pour les opérations de journal
const OperationLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  operation: String,
  todoId: mongoose.Types.ObjectId,
  timestamp: { type: Date, default: Date.now },
});

const OperationLog = mongoose.model('OperationLog', OperationLogSchema);

const TodoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Entrez votre nom svp!'],
    },
    date: {
      type: Date,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

TodoSchema.post('save', async function (doc) {
  await OperationLog.create({
    operation: `creation de tâche:${doc.title}`,
    todoId: doc._id,
    user: doc.user,
  });
});

TodoSchema.post('findOneAndUpdate', async function (doc) {
  await OperationLog.create({
    operation: `Mise à jour de tâche :${doc.title}`,
    todoId: doc._id,
    user: doc.user,
  });
});

TodoSchema.post('findOneAndDelete', async function (doc) {
  await OperationLog.create({
    operation: `Suppression de tâche:${doc.title}`,
    todoId: doc._id,
    user: doc.user,
  });
});

const Todo = mongoose.models.Todo || mongoose.model('Todo', TodoSchema);

export { Todo, OperationLog };
