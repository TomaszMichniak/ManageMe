export class ApiService {
	private readonly storageName: string;
	constructor(storageName: string) {
		this.storageName = storageName;
	}
	add<T>(data: T) {
		const database = this.getAll();
		database.push(data);
		this.save(database);
	}
	getAll<T>(): T[] {
		const data = JSON.parse(localStorage.getItem(this.storageName) || '[]');
		return data;
	}
	remove<T>(data: T[]) {
		this.save(data);
	}
	update<T>(data: T[]) {
		this.save(data);
	}
	private save<T>(data: T) {
		localStorage.setItem(this.storageName, JSON.stringify(data));
	}
}
