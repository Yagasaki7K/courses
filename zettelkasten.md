# Dicas do NestJS
- Instalar globalmente - `npm install -g @nestjs/cli`
- Montar um projeto - `nest new PROJECT-NAME && cd PROJECT-NAME && yarn run start`

O ideal é que sempre crie um Module e dentro dele faça a importação de seu Controller e de seu Service.

Dessa maneira a aplicação fica mais performática do que forçar o AppModule, por exemplo, ser responsável
por carregar o UserModule toda vez, sendo que nem sempre tem necessidade.

Annotations, Decorators = @Controller()
_Um @ antes de uma classe_

## How to fix write EPROTO 1C3B0000:error:0A00010B:SSL routines:ssl3_get_record:wrong version

Change `https` request to `http`