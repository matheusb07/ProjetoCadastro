sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",


], function (
	Controller,
	JSONModel,
) {
	"use strict";

	const endpointBase = "api/Aluno/";
	const modeloAlunos = "alunos";
	const modeloAluno = "aluno";

	return Controller.extend("alunos.services.Repositorio", {

		obterTodos: function (view) {

			return fetch(endpointBase)

				.then((response) => response.json())
				.then((data) => {
					view.setModel(new JSONModel(data), modeloAlunos);
				})
				.catch((error) => {
					console.error(error);
				});
		},
		obterPorId: function (id, view) {

			fetch(`${endpointBase}${id}`)
				.then((response) => response.json())
				.then((data) => {
					data.nascimento = new Date(data.nascimento)
					view.setModel(new JSONModel(data), modeloAluno);
				})
				.catch((error) => {
					console.error(error);
				});
		},

		novoAluno(modeloAlunos) {
			let nome = modeloAlunos.nome;
			let cpfFormatado = Validacao.formatarCampo(modeloAlunos.cpf);
			let telefoneFormatado = Validacao.formatarCampo(modeloAlunos.telefone);
			let dataNascimentoFormatada = new Date(modeloAlunos.nascimento);

			let novoAluno = {
				nome: nome,
				cpf: cpfFormatado,
				telefone: telefoneFormatado,
				nascimento: dataNascimentoFormatada,
			};
			return novoAluno;
		},
		alunoEditado(modeloAluno) {

			let sId = modeloAluno.id;
			let nome = modeloAluno.nome;
			let cpfFormatado = formatarCampo(modeloAluno.cpf);
			let telefoneFormatado = formatarCampo(modeloAluno.telefone);
			let dataNascimento = modeloAluno.nascimento;

			let aluno = {
				id: sId,
				nome: nome,
				cpf: cpfFormatado,
				telefone: telefoneFormatado,
				nascimento: dataNascimento
			}
			return aluno;
		},

		criar: function (novoAluno) {

			return fetch(endpointBase, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(novoAluno),
			})
				.then((resposta) => {
					return resposta.json();
				})
		},

		editar: function (alunoEditado) {

			const id = alunoEditado.id;
			const endpoint = `api/Aluno/${id}`
			return fetch(endpoint, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},

				body: JSON.stringify(alunoEditado),
			})
				.then(resposta => resposta.json())
				.catch(erro => {
					throw erro;
				});
		},
		excluir: function (id) {

			return fetch(`${endpointBase}${id}`, {
				method: "DELETE"
			})
				.then(resposta => resposta.json()
				)
				.catch(erro => {
					throw erro;
				});
		},
	});
});