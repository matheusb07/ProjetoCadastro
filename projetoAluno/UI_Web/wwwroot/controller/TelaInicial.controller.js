sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "../services/Repositorio"
    ],
    function (
        Controller,
        Filter,
        FilterOperator,
        Repositorio
    ) {

        "use strict";

        const caminhoTelaInicial = "ControleDeAlunos.controller.TelaInicial"
        const repositorio = new Repositorio;
        const cadastro = "Cadastro";
        const detalhes = "Detalhes"

        return Controller.extend(caminhoTelaInicial, {
            onInit: function () {
                var rota = this.getOwnerComponent().getRouter();
                rota.getRoute("TelaInicial").attachPatternMatched(this.rotaCorrespondida, this);
            },

            rotaCorrespondida: function () {
                let view = this.getView();
                repositorio.obterTodos(view);
            },

            aoClicarAbreCadastro: function () {
                let rota = this.getOwnerComponent().getRouter();
                rota.navTo(cadastro);
            },

            aoClicarAbreDetalhes: function (evento) {
                let modelo = "alunos"
                let id = "id"
                let item = evento.getSource();
                let lista = item.getBindingContext(modelo);
                let rota = this.getOwnerComponent().getRouter();
                let idObjSelecionado = lista.getProperty(id);
                rota.navTo(detalhes, {
                    id: idObjSelecionado
                });
            },

            Pesquisa: function (oEvent) {
                const parametroConsulta = "query"
                const consulta = oEvent.getParameter(parametroConsulta);
                const idTabela = "tabela";
                const itemVinculado = "items"
                const nome = "nome";
                let filtro = [];

                if (consulta) {
                    filtro.push(new Filter(nome, FilterOperator.Contains, consulta));
                }
                let tabela = this.getView().byId(idTabela);
                let items = tabela.getBinding(itemVinculado);
                items.filter(filtro);
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
        })
    }
)
