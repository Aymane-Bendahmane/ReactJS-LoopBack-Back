import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {MyForm} from '../models';
import {MyFormRepository} from '../repositories';

export class MyFormControllerController {
  constructor(
    @repository(MyFormRepository)
    public myFormRepository : MyFormRepository,
  ) {}

  @post('/myform')
  @response(200, {
    description: 'MyForm model instance',
    content: {'application/json': {schema: getModelSchemaRef(MyForm)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MyForm, {
            title: 'NewMyForm',
            exclude: ['id'],
          }),
        },
      },
    })
    myForm: Omit<MyForm, 'id'>,
  ): Promise<MyForm> {
    return this.myFormRepository.create(myForm);
  }

  @get('/myform/count')
  @response(200, {
    description: 'MyForm model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MyForm) where?: Where<MyForm>,
  ): Promise<Count> {
    return this.myFormRepository.count(where);
  }

  @get('/myform')
  @response(200, {
    description: 'Array of MyForm model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MyForm, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MyForm) filter?: Filter<MyForm>,
  ): Promise<MyForm[]> {
    return this.myFormRepository.find(filter);
  }

  @patch('/myform')
  @response(200, {
    description: 'MyForm PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MyForm, {partial: true}),
        },
      },
    })
    myForm: MyForm,
    @param.where(MyForm) where?: Where<MyForm>,
  ): Promise<Count> {
    return this.myFormRepository.updateAll(myForm, where);
  }

  @get('/myform/{id}')
  @response(200, {
    description: 'MyForm model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MyForm, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MyForm, {exclude: 'where'}) filter?: FilterExcludingWhere<MyForm>
  ): Promise<MyForm> {
    return this.myFormRepository.findById(id, filter);
  }

  @patch('/myform/{id}')
  @response(204, {
    description: 'MyForm PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MyForm, {partial: true}),
        },
      },
    })
    myForm: MyForm,
  ): Promise<void> {
    await this.myFormRepository.updateById(id, myForm);
  }

  @put('/myform/{id}')
  @response(204, {
    description: 'MyForm PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() myForm: MyForm,
  ): Promise<void> {
    await this.myFormRepository.replaceById(id, myForm);
  }

  @del('/myform/{id}')
  @response(204, {
    description: 'MyForm DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.myFormRepository.deleteById(id);
  }
}
