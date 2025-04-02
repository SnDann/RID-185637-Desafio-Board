# RID-185637_Desafio-Board

*Board de Gerenciamento de Tarefas Dinâmico*
Este projeto é um Board de Gerenciamento de Tarefas Dinâmico, desenvolvido para criar, editar, excluir e concluir tarefas de forma eficiente. Ele foi projetado para ser responsivo e funcional em diferentes dispositivos, proporcionando uma experiência de usuário agradável.

Passos Realizados
1. Tela Inicial (index.html)
Criada uma tela inicial simples e funcional com:
Um título de boas-vindas.
Uma imagem de thumbnail.
Um botão "Entrar" que redireciona para a página principal (board.html).
Estilização:
Layout centralizado.
Botão estilizado com transições para melhorar a experiência do usuário.
Responsividade para diferentes tamanhos de tela.

2. Página Principal (board.html)
Criada a estrutura do board de tarefas com:
Campos de entrada para o nome da tarefa e etiqueta.
Botão "+" para adicionar novas tarefas.
Lista dinâmica de tarefas.
Rodapé com contador de tarefas concluídas.
Estilização:
Layout limpo e moderno.
Botões estilizados para adicionar e concluir tarefas.
Responsividade para diferentes dispositivos.

3. Funcionalidades Dinâmicas (script.js)
Adicionar Tarefa:
Criação de novas tarefas com nome, etiqueta e data de criação.
Limpeza dos campos de entrada após adicionar uma tarefa.
Concluir Tarefa:
Substituição do botão "Concluir" por um ícone de check.
Nome da tarefa riscado (strikethrough) ao ser concluída.
Atualização dinâmica do contador de tarefas concluídas.
Editar Tarefa:
Preenchimento dos campos de entrada com os dados da tarefa selecionada.
Remoção da tarefa antiga para recriação após edição.
Excluir Tarefa:
Remoção da tarefa selecionada da lista.

4. Responsividade
Adicionados media queries no CSS para ajustar o layout em diferentes tamanhos de tela:
Desktop: Layout espaçoso com inputs e botões alinhados horizontalmente.
Tablets: Inputs e botões empilhados verticalmente para economizar espaço.
Smartphones: Layout compacto com textos legíveis e botões grandes.

*Thumbnail*

![Thumbnail](https://github.com/user-attachments/assets/e399ee7c-ee20-4ddc-8d2a-c5904ace2fbd)



*Melhorias Futuras*
Adicionar persistência de dados usando LocalStorage ou uma API.
Implementar notificações para tarefas com prazos.
Adicionar filtros para organizar tarefas por etiquetas ou status.
Melhorar a experiência de edição de tarefas.

Contribuições são bem-vindas! 

*Licença*
Este projeto está licenciado sob a MIT License.
