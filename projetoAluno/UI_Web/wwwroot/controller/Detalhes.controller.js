sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../services/Repositorio",
    "../services/Mensagem",
    "sap/ui/model/resource/ResourceModel"

], function (
    Controller,
    Repositorio,
    Mensagem,
    ResourceModel

) {
    "use strict";

    const repositorio = new Repositorio;
    const caminhoDetalhes = "ControleDeAlunos.controller.Detalhes";
    const sRotaTelaInicial = "TelaInicial";
    const editar = "Editar";
    const detalhes = "Detalhes";
    const sAluno = "aluno"

    return Controller.extend(caminhoDetalhes, {

        onInit: function () {
            const rota = this.getOwnerComponent().getRouter();
            rota.getRoute(detalhes).attachPatternMatched(this._aoCoincidirRota, this);
        },

        _aoCoincidirRota: function (evento) {
            const parametro = "arguments";
            const id = evento.getParameter(parametro).id;
            const view = this.getView();
            repositorio.obterPorId(id, view);
        },
        aoClicarBotaoVoltar: function () {
            this.getOwnerComponent().getRouter().navTo(sRotaTelaInicial);
        },

        aoClicarBotaoEditar: function () {
            const aluno = this.getView().getModel(sAluno).getData();
            const id = aluno.id;
            this.getOwnerComponent().getRouter().navTo(editar, {
                id: id
            });
        },
        aoClicarBotaoExcluir: function () {
            const aluno = this.getView().getModel(sAluno).getData();
            const confirmacao = "confirmacaoExcluir"
            let id = aluno.id;

            Mensagem.confirmacao(this._mensagensI18n(confirmacao), this._excluir.bind(this), [id]);
        },

        _excluir: function (id) {
            let sucesso = "sucessoAoExcluir"
            this._processarEvento(() => {
                repositorio.excluir(id)
                this._navegarParaListagem();
                Mensagem.aviso(this._mensagensI18n(sucesso))
            })
        },

        _navegarParaListagem: function () {
            this.getOwnerComponent().getRouter().navTo(sRotaTelaInicial);
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