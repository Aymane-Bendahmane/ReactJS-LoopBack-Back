import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Lb4DbDataSource} from '../datasources';
import {MyForm, MyFormRelations} from '../models';

export class MyFormRepository extends DefaultCrudRepository<
  MyForm,
  typeof MyForm.prototype.id,
  MyFormRelations
> {
  constructor(
    @inject('datasources.lb4_db') dataSource: Lb4DbDataSource,
  ) {
    super(MyForm, dataSource);
  }
}
