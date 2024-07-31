import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - Create', () => {
  it('Criar uma cidade', async () => {
    const res = await testServer.post('/cidades').send({
      nome: 'cidade'
    });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(res.body).toHaveProperty("nome");
    expect(res.body).toHaveProperty("id");
    expect(typeof res.body.id).toEqual("number");

  });

  it('Tentar criar uma cidade com nome inválido', async () => {
    const res = await testServer.post('/cidades').send({
      nome: 'ci'
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.nome");
  });
});