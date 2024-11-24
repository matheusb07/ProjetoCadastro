sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../services/Validacao",
    "../services/Repositorio",
    "../services/Mensagem",
    "sap/ui/model/resource/ResourceModel",

], function (
    Controller,
    JSONModel,
    Validacao,
    Repositorio,
    Mensagem,
    ResourceModel
) {

    "use strict";

    const sAluno = 'aluno';
    const repositorio = new Repositorio;
    const caminhoCadastro = "ControleDeAlunos.controller.Cadastro";
    const cadastro = "Cadastro";
    const detalhes = "Detalhes";

    return Controller.extend(caminhoCadastro, {

        onInit: function () {
            var rota = this.getOwnerComponent().getRouter();
            rota.getRoute(cadastro).attachPatternMatched(this._aoCoincidirRotaCadastrar, this);
            rota.getRoute(detalhes).attachPatternMatched(this._aoCoincidirRotaEditar, this);
        },

        _aoCoincidirRotaCadastrar: function () {
            var dadosAluno = new JSONModel({});
            this.getView().setModel(dadosAluno, sAluno);
        },
        _aoCoincidirRotaEditar: function (Evento) {
            let parametro = "arguments"
            let view = this.getView();
            let id = Evento.getParameter(parametro).id;
            let campos = [
                "campoNome",
                "campoCPF",
                "campoTelefone",
                "campoNascimento"];
            campos.forEach(campo => {
                let inputs = this.getView().byId(campo);
                inputs.setValue(campo);
            });
            repositorio.obterPorId(id, view);
        },

        aoClicarBotaoCancelar: function () {
            this.navegarParaPaginaInicial()
        },

        aoClicarBotaoVoltar: function () {
            this.navegarParaPaginaInicial()
        },
        aoClicarBotaoSalvar: function () {
            let modeloAluno = this.getView().getModel(sAluno).getData();
            let id = modeloAluno.id;

            if (id) {
                this.editarAluno();
            }
            else {
                this.cadastrarAluno();
            };
        },

        navegarPaginaDetalhes: function (id) {

            this.getOwnerComponent().getRouter().navTo(detalhes, {
                id: id
            });
        },

        navegarParaPaginaInicial: function () {
            const rotaTelaInicial = "TelaInicial"
            this.getOwnerComponent().getRouter().navTo(rotaTelaInicial);
        },

        cadastrarAluno: function () {
            const view = this.getView();
            const modeloAlunos = this.getView().getModel(sAluno).getData();

            if (!Validacao.validarCamposFormulario(view)) {
            } else {
                const alunoFormatado = Validacao.formatarCamposFormulario(modeloAlunos);
                this.criarAluno(alunoFormatado);
            }
        },

        criarAluno: function (alunoFormatado) {
            const sucesso = "sucessoAoCadastrar"
            this._processarEvento(() => {
                repositorio.criar(alunoFormatado)
                    .then(dados => {
                        this.navegarPaginaDetalhes(dados.id)
                        Mensagem.aviso(this._mensagensI18n(sucesso))
                    })
            })
        },

        editarAluno: function () {
            const view = this.getView();
            const modeloAluno = this.getView().getModel(sAluno).getData();
            let falha = "falhaValidacao"
            let mensagemConfirmacao = "desejaEditar"

            if (!Validacao.validarCamposFormulario(view)) {
                Mensagem.erro(this._mensagensI18n(falha));
            }
            else {
                const alunoFormatado = Validacao.formatarCamposFormulario(modeloAluno)
                Mensagem.confirmacao(this._mensagensI18n(mensagemConfirmacao), this.editar.bind(this), [alunoFormatado]);
            }
        },

        editar: function (alunoFormatado) {
            let sucesso = "sucessoAoEditar"

            this._processarEvento(() => {
                repositorio.editar(alunoFormatado)
                this.navegarPaginaDetalhes(alunoFormatado.id)
                Mensagem.aviso(this._mensagensI18n(sucesso))
            })
        },

        _processarEvento: function (action) {
            const tipoDaPromessa = "catch",
                tipoBuscado = "function";
            try {
                var promessa = action();
                if (promessa && typeof (promessa[tipoDaPromessa]) == tipoBuscado) {
                    promessa.catch(error => Mensagem.erro(error));
                }
            } catch (error) {
                Mensagem.erro(error);
            }
        },
        _mensagensI18n: function (texto) {
            const i18n = new ResourceModel({
                bundleName: "ControleDeAlunos.i18n.i18n",
                bundleUrl: "../i18n/i18n.properties"
            }).getResourceBundle();

            return i18n.getText(texto);
        }
    });
});