import {Entity, model, property} from '@loopback/repository';

@model()
export class MyForm extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  image?: string;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  description?: string;


  constructor(data?: Partial<MyForm>) {
    super(data);
  }
}

export interface MyFormRelations {
  // describe navigational properties here
}

export type MyFormWithRelations = MyForm & MyFormRelations;
