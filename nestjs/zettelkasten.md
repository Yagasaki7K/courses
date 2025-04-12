# Dicas do NestJS

- Instalar globalmente - `npm install -g @nestjs/cli`
- Montar um projeto - `nest new PROJECT-NAME && cd PROJECT-NAME && yarn run start`

## Dicas
- Controller = Gerenciador de Solicitações/Requisições/Roteamento | `nest g controller NOMEDOCONTROLLER`
- Module = Gerenciador de Tarefas | `nest g module NOMEDOMODULE`
- Não é necessário nodemon

## Flags
- `--no-spec` - Criação de arquivo sem incluir o arquivo de testes
- `--dry-run` - Amostra da estrutura sem a criação dos arquivos

## Arquitetura
- Decorators / Annotations = @Module, @Controllers, @Get ou @Providers
- Quando você executar, ele criará uma pasta de build chamada dist

## Controller
- @Controller()
- É um gerenciador de classes
- Não é necessário new AppController().getHello() por exemplo
- Não é necessário criar um roteador para chamar o AppController - configuração manual era necessária no Express
- O Controller faz isso por você
- @Get é uma rota - por exemplo

## Module
- @Module
- É responsável por receber informações sobre a classe
- Controllers são gerenciadores de classes
- Providers são serviços injetáveis como o @Injectable no AppService

## Services
- @Injectable()
- É responsável por injetar/atribuir o serviço no controlador | `nest g service NOMEDOSERVICE`