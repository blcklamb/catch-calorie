import { UserModel } from "../schemas/user";

class User {
    static create({ newUser }) {
        return UserModel.create(newUser);
    }

    static findOne({ email }) {
        return UserModel.findOne({ email });
    }

    static findById({ id }) {
        return UserModel.findById(id);
    }

    static findAll() {
        return UserModel.find();
    }

    static update({ id, toUpdate }) {
        return UserModel.findByIdAndUpdate(id, toUpdate, { new: true });
    }

    static delete({ id }) {
        return UserModel.findByIdAndDelete(id);
    }
}

export { User };
