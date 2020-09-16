import { Produto } from './produto';

export class Orcamento{
    id:number;
    nome:String;
    email:String;
    telefone:String;
    assunto:String;
    mensagem:String;
    dtCriacao:Date;
    produto:Produto[];
}