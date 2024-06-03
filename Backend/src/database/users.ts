import mongoose from 'mongoose';
import { RoleEnum } from './roleEnum';

const UserSchema = new mongoose.Schema({
	login: { type: String, required: true },
	password: { type: String, select: false },
	role: { type: String, enum: Object.values(RoleEnum), required: true },
	firstName: { type: String },
	lastName: { type: String },
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByUsername = (username: string) =>
	UserModel.findOne({ username });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) =>
	new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) =>
	UserModel.findByIdAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
	UserModel.findByIdAndUpdate(id, values);
export const isUserExist = (login: string, password: string) =>
	UserModel.findOne({ login: login, password: password });
