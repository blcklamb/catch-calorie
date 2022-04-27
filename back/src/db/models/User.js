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

    static async update({ user_id, fieldToUpdate, newValue }) {
        const filter = { id: user_id };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedUser = await UserModel.findOneAndUpdate(filter, update, option);
        return updatedUser;
    }

    static delete({ id }) {
        return UserModel.remove({ id });
    }
}

export { User };
