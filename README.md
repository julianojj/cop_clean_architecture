# cop_clean_architecture

Projeto desenvolvido durante a cop na Brave.ag

Objetivo do projeto foi demonstrar o funcionamento da Clean Architecture e os benefícios de ter um código desacoplado

Referências:

https://handsome-quality-6ae.notion.site/COP-Clean-Architecture-19-08-2022-50e5596a01dc4685a91c7963fafc0aa0

Como rodar?

Após fazer o clone, basta rodar os seguintes comandos:

yarn (para instalar todas as dependências)

yarn test (rodar os testes de unidade e de integração)

![coverage](https://github.com/julianojj/cop_clean_architecture/blob/main/coverage.png)

Configurações:

.env

```
DB_HOST=localhost
DB_USER=myuser
DB_PASS=mypassword
DB_NAME=cop
```

Deve ser os mesmos parâmetros descritos no docker-compose.yml
