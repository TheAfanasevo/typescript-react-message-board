interface ICrudRepository {
    getOne(id: number): any;
    getAll(): any[];
    save(data: any): any;
    update(id: number, data: any): any; 
    delete(id: number): any;
}