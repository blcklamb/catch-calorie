import { UserModel } from "../schemas/user";

class User {
    static create({ newUser }) {
        return UserModel.create(newUser);
    }

    static findOne({ email }) {
        return UserModel.findOne({ email });
    }

    static findById({ id }) {
        // return UserModel.findById(id); req.parms에서 받는 id는 string으로 findById에서 사용하는 ObjectId와 다름.
        return UserModel.find({ _id: id })
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
