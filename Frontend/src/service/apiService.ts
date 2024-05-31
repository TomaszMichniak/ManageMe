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
	remove(id: number) {
		let data = this.getAll<any>();
		data = data.filter((item: any) => item.id !== id);
		this.save(data);
	}
	update<T extends { id: number }>(updatedItem: T) {
		let data = this.getAll<any>();
		data = data.map((item: any) =>
			item.id === updatedItem.id ? updatedItem : item
		);
		this.save(data);
	}
	getById<T>(id: number): T | undefined {
		const data = this.getAll<T>();
		return data.find((item: any) => item.id === id);
	}
	clear() {
		localStorage.removeItem(this.storageName);
	}
	private save<T>(data: T) {
		localStorage.setItem(this.storageName, JSON.stringify(data));
	}
}
