### CRUD Windows Forms e SAPUI5 com SQL Server, Singleton, Clean Architecture e SOLID

O objetivo deste projeto é desenvolver um sistema CRUD, utilizando Windows Forms em C# para a interface desktop e SAPUI5 para a interface web, ambos conectados a um banco de dados SQL Server. Adicionalmente, aplicando conceitos de design e arquitetura de software, como Singleton, Clean Architecture e SOLID, para garantir que o código seja organizado, reutilizável e sustentável ao longo do tempo.
 


Modelo de Dados
O modelo de dados foi projetado para gerenciar o cadastro de alunos em uma instituição de ensino. Ele contém as seguintes tabelas:

1. Tabela Aluno
Armazena informações básicas dos alunos.

Atributos:
```
id (INT, PRIMARY KEY, AUTO_INCREMENT): Identificador único.
nome (VARCHAR(100), NOT NULL): Nome completo do aluno.
email (VARCHAR(150), UNIQUE, NOT NULL): Endereço de e-mail do aluno.
data_nascimento (DATE, NOT NULL): Data de nascimento.
telefone (VARCHAR(15), NULL): Número de telefone (opcional).
criado_em (DATETIME, DEFAULT CURRENT_TIMESTAMP): Data de criação do registro.
atualizado_em (DATETIME, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP): Última atualização.
2. Tabela Curso
Registra os cursos disponíveis.

Atributos:
id (INT, PRIMARY KEY, AUTO_INCREMENT): Identificador único.
nome (VARCHAR(100), NOT NULL): Nome do curso.
descricao (TEXT, NULL): Descrição do curso.
duracao_meses (INT, NOT NULL): Duração do curso em meses.
criado_em (DATETIME, DEFAULT CURRENT_TIMESTAMP): Data de criação do registro.
3. Tabela Matricula
Relaciona os alunos com os cursos.

Atributos:
id (INT, PRIMARY KEY, AUTO_INCREMENT): Identificador único.
aluno_id (INT, FOREIGN KEY): Referência ao aluno.
curso_id (INT, FOREIGN KEY): Referência ao curso.
data_matricula (DATE, DEFAULT CURRENT_DATE): Data da matrícula.
status (VARCHAR(20), DEFAULT 'Ativo'): Status da matrícula (Ativo, Cancelado, etc.).

```

![image](https://github.com/user-attachments/assets/9d1935ad-93c3-49af-a555-43f9334bbde4)


Funcionalidades da Aplicação
A aplicação foi desenvolvida em Windows Forms com C#, oferecendo as seguintes funcionalidades para cada tabela:

CRUD Completo
Criar: Formulário para adicionar novos alunos, cursos e matrículas.
Ler: Dados exibidos em um DataGridView, permitindo fácil visualização.
Atualizar: Botões para editar registros existentes.
Excluir: Função de remoção com confirmação para evitar exclusões acidentais.
Validações:
Verificação de campos obrigatórios (ex.: nome, email, curso).
Validação de formato para campos como email e telefone.



Padrão Singleton
Uma classe Singleton foi implementada para gerenciar a conexão com o banco de dados. Esta abordagem garante que apenas uma instância da conexão seja criada e compartilhada durante toda a execução da aplicação.

### Implementação:

```csharp
public class DatabaseConnection {
    private static DatabaseConnection _instance;
    private SqlConnection _connection;

    private DatabaseConnection() {
        _connection = new SqlConnection("your_connection_string_here");
    }

    public static DatabaseConnection Instance {
        get {
            if (_instance == null) {
                _instance = new DatabaseConnection();
            }
            return _instance;
        }
    }

    public SqlConnection GetConnection() {
        return _connection;
    }
}

```

A instância DatabaseConnection.Instance é usada em todas as operações CRUD, garantindo eficiência e controle.


Qualidade do Código: 

Código organizado em classes separadas para Modelo, Repositório e Controladores.
Nomes claros e autoexplicativos para variáveis, métodos e componentes.
Comentários documentando funções e lógicas importantes.


### Relatório
O projeto demonstra:

Um modelo de dados bem estruturado com relacionamentos um-para-muitos.
Uso de Windows Forms para criar uma interface amigável e funcional.
Implementação eficiente do padrão Singleton para conexão ao banco de dados.
Código limpo e aderente às boas práticas de programação.
