import { UserModel } from "../schemas/user";

class User {
    static async create({ newUser }) {
        return UserModel.create(newUser);
    }

    static async findOne({ email }) {
        return UserModel.findOne({ email });
    }

    static async findById({ id }) {
        return UserModel.findOne({ _id: id });
    }

    static async findAll() {
        return UserModel.find({})
    }

    static async delete({ id }) {
        return UserModel.remove({ id });
    }

    static async update({ user_id, fieldToUpdate, newValue}) {
        const filter = { id: user_id };
        const update = { [fieldToUpdate]: newValue};
        const option = { returnOriginal: false }

        const updatedUser = await UserModel.findOneAndUpdate(
            filter,
            update,
            option
        );
    
        return updatedUser
    }
}

export { User };
